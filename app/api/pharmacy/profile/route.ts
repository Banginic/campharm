import { NextResponse } from "next/server";
import { db } from '@/drizzle/index'
import { pharmacyTable, dailySchedule } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";

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
    const pharmacy = await db
      .select({
        pharmacyId: pharmacyTable.id,
        pharmacyName: pharmacyTable.pharmacyName,
        isFrozen: pharmacyTable.isFrozen,
        phoneNumber: pharmacyTable.phoneNumber,
        email: pharmacyTable.email,
        address: pharmacyTable.address,
        town: pharmacyTable.town,
        region: pharmacyTable.region,
        createdAt : pharmacyTable.createdAt,
        location: pharmacyTable.location,
        licenceNumber: pharmacyTable.licenceNumber,
        isOpen: dailySchedule.isOpen,
        isOnCall: dailySchedule.isOnCall,
        day: dailySchedule.day
      })
      .from(pharmacyTable)
      .leftJoin(dailySchedule, eq(dailySchedule.pharmacyId, pharmacyTable.id))
      .where(and(
        eq(pharmacyTable.town, city),
        eq(pharmacyTable.region, region),
        eq(pharmacyTable.id, Number(pharmacyId))
      ))
      .limit(1)


    if (pharmacy.length === 0) {
      return NextResponse.json(
        { message: "No pharmacies found", success: true, data: [] },
        { status: 200 }
      );
    }
    return NextResponse.json(
      {
        message: "Pharmacy fetched successfully",
        data: pharmacy,
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