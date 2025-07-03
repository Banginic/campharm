import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { drugTable } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const pharmacyId = searchParams.get("pharmacyId");
  const drugId = searchParams.get("drugId");

  if (!pharmacyId || !drugId) {
    return NextResponse.json(
      { error: "Pharmacy ID and Drug ID are required", success: false },
      { status: 403 }
    );
  }

  try {
    const drug = await db
      .select()
      .from(drugTable)
      .where(
        and(
          eq(drugTable.pharmacyId, Number(pharmacyId)),
          eq(drugTable.id, Number(drugId))
        )
      );

    if (drug.length === 0) {
      return NextResponse.json(
        { message: "No drug found for this pharmacy", success: true },
        { status: 404 }
      );
    }
    return NextResponse.json({ data: drug, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
