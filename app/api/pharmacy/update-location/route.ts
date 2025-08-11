import { NextResponse } from "next/server";
import { db } from '@/drizzle/index'
import { pharmacyTable } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";

export async function PUT(req: Request) {
  const body = await req.json()
  const { searchParams } = new URL(req.url);
  const language = searchParams.get("lang");
  const pharmacyId = searchParams.get("pharmacyId");
  const region = searchParams.get("region");
  const city = searchParams.get("city");


  try {
    if(!body){
           return NextResponse.json(
        { message: "Lat and Long are required", success: false, data:[] },
        { status: 400 }
      );
    }
    if (!language || !pharmacyId || !region || !city) {
      return NextResponse.json(
        { message: "Language and Pharmacy ID are required", success: false, data:[] },
        { status: 400 }
      );
    }
     await db.update(pharmacyTable)
     .set({location: {lat: body.lat, lng: body.lng}})
     .where(and(
        eq(pharmacyTable.id, Number(pharmacyId)),
        eq(pharmacyTable.region, region),
        eq(pharmacyTable.town, city)
     ))
    return NextResponse.json(
      {
        message: "Location updated successfully",
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