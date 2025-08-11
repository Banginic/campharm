import { NextResponse } from "next/server";
import { db } from '@/drizzle/index'
import { dailySchedule, pharmacyTable } from "@/drizzle/schema";
import { eq,  and,  } from "drizzle-orm";

export async function GET(req: Request) {
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
    const onCallSchedule = await db
    .select({
        id: dailySchedule.id,
        day: dailySchedule.day,
        openingTime: dailySchedule.openingTime,
        closingTime: dailySchedule.closingTime,
        isOpen: dailySchedule.isOpen,
        isOnCall: dailySchedule.isOnCall
    })
    .from(dailySchedule)
    .leftJoin(pharmacyTable, eq(dailySchedule.pharmacyId, pharmacyTable.id))
    .where(
        and(
            eq(dailySchedule.pharmacyId, Number(pharmacyId)),
        eq(pharmacyTable.region , decodeURIComponent(region)),
        eq(pharmacyTable.town, encodeURIComponent(city))
        )
     )
   
    return NextResponse.json(
      {
        message: "On call updated successfully",
        data: onCallSchedule,
        success: true,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message, success: false, data: [] }, { status: 500 });
    }
    console.error("Error fetching pharmacies:", error);
    return NextResponse.error();
  }
}