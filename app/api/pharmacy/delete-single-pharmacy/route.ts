import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { pharmacyTable } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const language = searchParams.get("lang");
  const pharmacyId = searchParams.get("pharmacyId");
  const region = searchParams.get("region");
  const city = searchParams.get("city");

  try {
    if (!language || !pharmacyId || !region || !city) {
      return NextResponse.json(
        {
          message: "Language and Pharmacy ID are required",
          success: false,
          data: [],
        },
        { status: 400 }
      );
    }
    const pharmacy = await db
      .select()
      .from(pharmacyTable)
      .where(
        and(
          eq(pharmacyTable.town, city),
          eq(pharmacyTable.region, region),
          eq(pharmacyTable.id, Number(pharmacyId))
        )
      )
      .limit(1);

    if (pharmacy.length === 0) {
      return NextResponse.json(
        { message: "No pharmacies found", success: true, data: [] },
        { status: 200 }
      );
    }
    const deletedPharmacy = await db
      .delete(pharmacyTable)
      .where(
        and(
          eq(pharmacyTable.town, city),
          eq(pharmacyTable.region, region),
          eq(pharmacyTable.id, Number(pharmacyId))
        )
      )
      .returning();
    if (!deletedPharmacy.length) {
      throw new Error("Pharmacy not found");
    }
    return NextResponse.json(
      {
        message: "Pharmacy deleted successfully",
        data: deletedPharmacy,
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
    console.error("Error fetching pharmacies:", error);
    return NextResponse.error();
  }
}
