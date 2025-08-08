import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { pharmacyTable, dailySchedule, drugTable } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pharmacyId = searchParams.get("pharmacyId");
  const drugId = searchParams.get("drugId");
  const region = searchParams.get("region");
  const city = searchParams.get("city");

  const today = new Date()
    .toLocaleString('en-GB', { weekday: 'long' })
    .toLowerCase();

  if (!pharmacyId) {
    console.log('error 1')
    return NextResponse.json(
      { message: "Pharmacy ID is required", success: false, data: [] },
      { status: 400 }
    );
  }

  try {
    const conditions = [
      eq(pharmacyTable.id, Number(pharmacyId)),
      eq(pharmacyTable.isFrozen, false),
    ];

    if (region) conditions.push(eq(pharmacyTable.region, region));
    if (city) conditions.push(eq(pharmacyTable.town, city));
    if (drugId) {
      conditions.push(eq(drugTable.id, Number(drugId)));
      conditions.push(eq(drugTable.inStock, true));
    }

    const pharmacy = await db
      .select({
        //pharmacy
        pharmacyName: pharmacyTable.pharmacyName,
        region: pharmacyTable.region,
        town: pharmacyTable.town,
        address: pharmacyTable.address,
        pharmacyId: pharmacyTable.id,
        phoneNumber: pharmacyTable.phoneNumber,
        //daily schedule
        day: dailySchedule.day,
        isOpen: dailySchedule.isOpen,
        isOnCall: dailySchedule.isOnCall,
        openingTime: dailySchedule.openingTime,
        closingTime: dailySchedule.closingTime,
        //drug
        drugId: drugTable.id,
        genericName: drugTable.genericName,
        tradeName: drugTable.tradeName,
        dosageForm: drugTable.dosageForm,
        dosageStrength: drugTable.dosageStrength,
        price: drugTable.price,
        description: drugTable.description
      })
      .from(pharmacyTable)
      .leftJoin(
        dailySchedule,
        and(eq(dailySchedule.pharmacyId, pharmacyTable.id), eq(dailySchedule.day, today))
      )
      .leftJoin(drugTable, eq(drugTable.pharmacyId, pharmacyTable.id))
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
    console.error("Error fetching pharmacy:", error);
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Internal error", success: false, data: [] },
      { status: 500 }
    );
  }
}



