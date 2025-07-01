import { NextResponse, NextRequest } from "next/server";
import { db } from '@/drizzle/index'
import { pharmacyTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("city");

  try {
    if (!city) {
      return NextResponse.json(
        { error: "City parameter is required", success: false },
        { status: 400 }
      );
    }
    const pharmacies = await db
      .select()
      .from(pharmacyTable)
      .where(eq(pharmacyTable.town, city));
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