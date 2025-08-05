import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { pharmacyTable } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const pharmacyId = searchParams.get("pharmacyId");
  const region = searchParams.get("region");
  const city = searchParams.get("city");

  try {
    if (!pharmacyId) {
      return NextResponse.json(
        {
          message: "Pharmacy ID is required",
          success: false,
          data: [],
        },
        { status: 400 }
      );
    }

    // Build the condition dynamically
    const conditions = [eq(pharmacyTable.id, Number(pharmacyId))];
    if (region) conditions.push(eq(pharmacyTable.region, region));
    if (city) conditions.push(eq(pharmacyTable.town, city));

    // Check if pharmacy exists
    const pharmacy = await db
      .select()
      .from(pharmacyTable)
      .where(and(...conditions))
      .limit(1);

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
      return NextResponse.json(
        { message: error.message, success: false, data: [] },
        { status: 500 }
      );
    }
    console.error("Error deleting pharmacy:", error);
    return NextResponse.error();
  }
}
