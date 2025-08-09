import { NextResponse, NextRequest } from "next/server";
import { db } from '@/drizzle/index'
import { pharmacyTable, dailySchedule } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("town");
  const region = searchParams.get("region");
  const limit = searchParams.get("limit");
  

  try {
    if (!city || !region) {
      return NextResponse.json(
        { error: "City and Region are required", success: false, data: [] },
        { status: 400 }
      );
    }

    const decodedRegion = decodeURIComponent(region)
    const decodedtown = decodeURIComponent(city)

     const today = new Date()
    .toLocaleString('en-GB', { weekday: 'long' })
    .toLowerCase();

    const pharmacies = await db
      .select({
        pharmacyId: pharmacyTable.id,
        pharmacyName: pharmacyTable.pharmacyName,
        isOpen: dailySchedule.isOpen,
        closingTime: dailySchedule.closingTime,
        openingTime: dailySchedule.openingTime,
        isOnCall: dailySchedule.isOnCall,
        day: dailySchedule.day
      })
      .from(pharmacyTable)
      .leftJoin(dailySchedule, eq(dailySchedule.pharmacyId, pharmacyTable.id))
      .where(and(
        eq(pharmacyTable.town, decodedtown),
        eq(pharmacyTable.region, decodedRegion),
        eq(dailySchedule.pharmacyId, pharmacyTable.id),
        eq(dailySchedule.day, today),
      ))
      .limit(Number(limit))


    if (pharmacies.length === 0) {
      return NextResponse.json(
        { message: "No pharmacies found", success: true, data: [] },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        message: "Pharmacies fetched successfully",
        data: pharmacies,
        success: true,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    console.error("Error fetching pharmacies:", error);
    return NextResponse.error();
  }
}