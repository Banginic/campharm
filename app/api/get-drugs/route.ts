import { NextResponse } from "next/server";
import { db } from '@/drizzle/index'
import { drugTable } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pharmacyId = searchParams.get("pharmacyId");

  if (!pharmacyId) {
    return NextResponse.json({ error: "Pharmacy ID is required", success: false }, { status: 403 });
  }

  const pharmacyIdNumber = Number(pharmacyId);
  if (isNaN(pharmacyIdNumber)) {
    return NextResponse.json({ error: "Pharmacy ID must be a number", success: false }, { status: 400 });
  }

  try {
    const drugs = await db.select().from(drugTable).where(eq(drugTable.pharmacyId, pharmacyIdNumber));
   
    if(drugs.length === 0) {
      return NextResponse.json({ message: "No drugs found for this pharmacy", success: true }, { status: 404 });
    }
    return NextResponse.json({ data: drugs, success: true }, { status: 200 });

  } catch (error) {
    return NextResponse.error();
  }
}
   
