import { NextResponse } from "next/server";
import { DrugType } from "@/models/types";
import { drugTable } from "@/drizzle/schema";
import { db } from "@/drizzle/index"; // Make sure this path is correct for your project

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { genericName, tradeName, dosageForm, dosageStrength, price, pharmacyId } = body;

    if (
      !genericName ||
      !tradeName ||
      !dosageForm ||
      !dosageStrength ||
      !price
    ) {
      return NextResponse.json(
        { error: "All fields are required", success: false },
        { status: 400 }
      );
    }
    if (
   !pharmacyId
    ) {
      return NextResponse.json(
        { error: "Please login again", success: false },
        { status: 403 }
      );
    }
    // Insert the drug into the database
    const result = await db.insert(drugTable).values({
      genericName,
      tradeName,
      dosageForm,
      dosageStrength,
      price,
      pharmacyId
    }).returning();
   

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
