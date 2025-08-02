import { NextResponse } from "next/server";
import { DrugType } from "@/models/types";
import { drugTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index"; // Make sure this path is correct for your project
import { and, eq } from "drizzle-orm";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const pharmacyId = searchParams.get("pharmacyId");
  try {
    const body = await request.json();
    const {
      genericName,
      tradeName,
      dosageForm,
      dosageStrength,
      price,
      description,
    } = body;

    if (!genericName || !dosageForm || !dosageStrength || !description) {
      return NextResponse.json(
        { error: "All fields are required", success: false },
        { status: 400 }
      );
    }
    if (!pharmacyId) {
      return NextResponse.json(
        { error: "Please login again", success: false },
        { status: 403 }
      );
    }

    const existingDrug = await db
      .select()
      .from(drugTable)
      .where(
        and(
          eq(drugTable.genericName, genericName),
          eq(drugTable.dosageForm, dosageForm),
          eq(drugTable.dosageStrength, dosageStrength),
          eq(drugTable.pharmacyId, Number(pharmacyId))
        )
      )
      .limit(1);

    if (existingDrug.length === 1) {
      return NextResponse.json(
        { error: "Drug item already exist.", success: false },
        { status: 400 }
      );
    }

    // Insert the drug into the database
    const result = await db
      .insert(drugTable)
      .values({
        genericName,
        tradeName,
        dosageForm,
        dosageStrength,
        price,
        description,
        pharmacyId: Number(pharmacyId),
      })
      .returning();

    return NextResponse.json(
      { message: "Drug added successfully", drug: result[0], success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding drug:", error);
    return NextResponse.json(
      { error: "Failed to add drug", success: false },
      { status: 500 }
    );
  }
}
