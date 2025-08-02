import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { drugTable } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url);
  const pharmacyId = searchParams.get("pharmacyId");
  const drugId = searchParams.get("drugId");


  if (!pharmacyId) {
    return NextResponse.json(
      { error: "Pharmacy ID is required", success: false },
      { status: 403 }
    );
  }
  if (!drugId) {
    return NextResponse.json(
      { error: "Drug ID is required", success: false },
      { status: 403 }
    );
  }

  const pharmacyIdNumber = Number(pharmacyId);
  if (isNaN(pharmacyIdNumber)) {
    return NextResponse.json(
      { error: "Pharmacy ID must be a number", success: false },
      { status: 400 }
    );
  }

  try {
    const existingDrugs = await db
      .select()
      .from(drugTable)
      .where(and (
        eq(drugTable.pharmacyId, pharmacyIdNumber),
        eq(drugTable.id, Number(drugId))
    ))
      .limit(1)

    if (existingDrugs.length === 0) {
      return NextResponse.json(
        { message: "No drug with this pharmacy", success: true },
        { status: 404 }
      );
    }
    const drug = await db.update(drugTable)
    .set({inStock: !existingDrugs[0].inStock})
     .where(and (
        eq(drugTable.pharmacyId, pharmacyIdNumber),
        eq(drugTable.id, Number(drugId))
    ))


    return NextResponse.json({ data: drug, success: true }, { status: 202 });
  } catch (error) {
    return NextResponse.error();
  }
}
