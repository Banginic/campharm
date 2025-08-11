import { NextResponse } from "next/server";
import { db } from '@/drizzle/index'
import { dailySchedule, drugTable } from "@/drizzle/schema";
import { eq  } from "drizzle-orm";

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const language = searchParams.get("lang");
  const pharmacyId = searchParams.get("pharmacyId");
  const region = searchParams.get("region");
  const city = searchParams.get("city");


  try {

    if (!language || !pharmacyId || !region || !city) {
      return NextResponse.json(
        { message: "Language and Pharmacy ID are required", success: false, data:[] },
        { status: 400 }
      );
    }
const schedule = await db
  .select()
  .from(dailySchedule)
  .where(eq(dailySchedule.pharmacyId, Number(pharmacyId)));

if (schedule.length === 0) {
  return NextResponse.json({ message: "Schedule not found", success: false, data: [] }, { status: 404 });
}
const currentIsOpen = schedule[0].isOpen;

  await db.update(dailySchedule)
  .set({ isOpen: !currentIsOpen })
  .where(eq(dailySchedule.pharmacyId, Number(pharmacyId)));
    return NextResponse.json(
      {
        message: "Pharmacy updated successfully",
        data: [],
        success: true,
      },
      { status: 203 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, success: false, data: [] }, { status: 500 });
    }
    console.error("Error fetching pharmacies:", error);
    return NextResponse.error();
  }
}