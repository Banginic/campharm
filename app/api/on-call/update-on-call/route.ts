import { NextResponse } from "next/server";
import { db } from '@/drizzle/index'
import { dailySchedule } from "@/drizzle/schema";
import { eq, not, and, inArray } from "drizzle-orm";

export async function PUT(req: Request) {
    const body = await req.json()
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
      // Get onCall days
const onCallDays = Object.entries(body).filter(([_, isOnCall ]) => isOnCall).map(([day]) => day);

//Set isOnCall  = true for these days
    if (onCallDays.length > 0) {
      await db
        .update(dailySchedule)
        .set({ isOnCall: true })
        .where(
          and(
            eq(dailySchedule.pharmacyId, Number(pharmacyId)),
            inArray(dailySchedule.day, onCallDays)
          )
        );
    }


// Set isOnCall = false for other days
    await db
      .update(dailySchedule)
      .set({ isOnCall: false })
      .where(
        and(
          eq(dailySchedule.pharmacyId, Number(pharmacyId)),
          not(inArray(dailySchedule.day, onCallDays))
        )
      );


   
    return NextResponse.json(
      {
        message: "On call updated successfully",
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