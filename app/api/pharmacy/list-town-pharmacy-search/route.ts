import { NextResponse, NextRequest } from "next/server";
import { db } from '@/drizzle/index'
import { pharmacyTable } from "@/drizzle/schema";
import { eq, and, ilike, or } from "drizzle-orm";

export async function POST(req: Request) {
      const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit");
 const body = await req.json()
 
 try {
     if (!body ) {
         return NextResponse.json(
             { error: "search query is requird", success: false, data: [] },
             { status: 400 }
            );
        }
    const query = `%${body.trim()}%`;
const pharmacies = await db
  .select()
  .from(pharmacyTable)
  .where(
    or(
      ilike(pharmacyTable.town, `%${query}%`),
      ilike(pharmacyTable.address, `%${query}%`)
    )
  )
  .limit(Number(limit) || 10);


    if (pharmacies.length === 0) {
      return NextResponse.json(
        { message: "No pharmacy found", success: true, data: [] },
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