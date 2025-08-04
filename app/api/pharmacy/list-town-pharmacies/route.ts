import { NextResponse, NextRequest } from "next/server";
import { db } from '@/drizzle/index'
import { pharmacyTable } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");
  const region = searchParams.get("region");
  const limit = searchParams.get("limit");

  try {
    if (!city || !region) {
      return NextResponse.json(
        { error: "City and Region are required", success: false },
        { status: 400 }
      );
    }
    const pharmacies = await db
      .select()
      .from(pharmacyTable)
      .where(and(
        eq(pharmacyTable.town, city),
        eq(pharmacyTable.region, region)
      ))
      .limit(Number(limit))


    if (pharmacies.length === 0) {
      return NextResponse.json(
        { error: "No pharmacies found", success: false },
        { status: 404 }
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