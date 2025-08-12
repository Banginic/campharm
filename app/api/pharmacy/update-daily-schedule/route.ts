import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { dailySchedule } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";

export async function PUT(req: Request) {
  const body = await req.json();
  const { searchParams } = new URL(req.url);
  const language = searchParams.get("lang");
  const pharmacyId = searchParams.get("pharmacyId");
  const region = searchParams.get("region");
  const city = searchParams.get("city");

  try {
    if (!language || !pharmacyId || !region || !city) {
      return NextResponse.json(
        {
          message: "Language, Pharmacy ID, Region, and City are required",
          success: false,
          data: [],
        },
        { status: 400 }
      );
    }

    type Schedule = {
      openingTime: string;
      closingTime: string;
      isOpen: boolean | string | number;
    };
    for (const [day, scheduleRaw] of Object.entries(body)) {
      const schedule = scheduleRaw as Schedule;
      await db
        .update(dailySchedule)
        .set({
          openingTime: `${schedule.openingTime}:00`,
          closingTime: `${schedule.closingTime}:00`,
          isOpen: Boolean(schedule.isOpen), // ✅ Correct boolean type
        })
        .where(
          and(
            eq(dailySchedule.pharmacyId, Number(pharmacyId)),
            eq(dailySchedule.day, day)
          )
        );
    }

    return NextResponse.json(
      {
        message: "Schedule updated successfully",
        data: [],
        success: true,
      },
      { status: 203 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, success: false, data: [] },
        { status: 500 }
      );
    }
    console.error("Error updating daily schedule:", error);
    return NextResponse.error();
  }
}
