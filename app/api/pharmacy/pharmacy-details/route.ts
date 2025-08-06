import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { pharmacyTable, dailySchedule } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pharmacyId = searchParams.get("pharmacyId");
  const region = searchParams.get("region");
  const city = searchParams.get("city");

  const today = new Date()
    .toLocaleString('en-GB', { weekday: 'long' })
    .toLowerCase();

  try {
    if (!pharmacyId) {
      return NextResponse.json(
        { message: "Pharmacy ID is required", success: false, data: [] },
        { status: 400 }
      );
    }

    // Build dynamic conditions
    const conditions = [
      eq(pharmacyTable.id, Number(pharmacyId)),
      eq(dailySchedule.day, today)
    ];
    if (region) conditions.push(eq(pharmacyTable.region, region));
    if (city) conditions.push(eq(pharmacyTable.town, city));

    // Fetch pharmacy and today's schedule
    const pharmacy = await db
      .select({
        id: pharmacyTable.id,
        pharmacyName: pharmacyTable.pharmacyName,
        pharmacistName: pharmacyTable.pharmacistName,
        email: pharmacyTable.email,
        phone: pharmacyTable.phoneNumber,
        region: pharmacyTable.region,
        town: pharmacyTable.town,
        address: pharmacyTable.address,
        location: pharmacyTable.location,
        isVerified: pharmacyTable.isVerified,
        isFrozen: pharmacyTable.isFrozen,
        // Today's program
        day: dailySchedule.day,
        isOpen: dailySchedule.isOpen,
        isOnCall: dailySchedule.isOnCall,
        openingTime: dailySchedule.openingTime,
        closingTime: dailySchedule.closingTime,
      })
      .from(pharmacyTable)
       .leftJoin(dailySchedule, and(
    eq(dailySchedule.pharmacyId, pharmacyTable.id),
    eq(dailySchedule.day, today)
  ))
      .where(and(...conditions))
      .limit(1);

    if (pharmacy.length === 0) {
      return NextResponse.json(
        { message: "No pharmacies found", success: true, data: [] },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Pharmacy fetched successfully", data: pharmacy, success: true },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, success: false, data: [] },
        { status: 500 }
      );
    }
    console.error("Error fetching pharmacy:", error);
    return NextResponse.error();
  }
}
