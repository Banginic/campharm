import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { drugTable, pharmacyTable } from "@/drizzle/schema";
import { eq, and, ilike, or } from "drizzle-orm";


export async function POST(request: Request) {
    const query = await request.json()
  const { searchParams } = new URL(request.url);
  const region = searchParams.get("region");
  const town = searchParams.get("city");
  const limit = searchParams.get("limit");
console.log(query)

  if (!region || !town ) {
    return NextResponse.json(
      { error: "Location is required", success: false, data: [] },
      { status: 400 }
    );
  }
  if (!query ) {
    return NextResponse.json(
      { error: "Search query is required", success: false, data: [] },
      { status: 400 }
    );
  }


  try {
    const drugs = await db
      .select(
        { id: drugTable.id,
          tradeName: drugTable.tradeName,
          genericName: drugTable.genericName,
          dosageForm: drugTable.dosageForm,
          dosageStrength: drugTable.dosageStrength,
          price: drugTable.price,
          description: drugTable.description,
          pharmacyName: pharmacyTable.pharmacyName,
          pharmacyId: pharmacyTable.id,
          town: pharmacyTable.town
        }
      ).from(drugTable)
      .innerJoin(pharmacyTable, eq(drugTable.pharmacyId, pharmacyTable.id))
      .where(
         and(
             or(
              ilike(drugTable.tradeName, `%${query}%`),
              ilike(drugTable.genericName, `%${query}%`)
            ),
            eq(pharmacyTable.region, region),
            eq(pharmacyTable.town, town),
            eq(pharmacyTable.isFrozen, false),
            eq(drugTable.inStock, true),
         )
      )
      .limit(Number(limit))
      

    if (drugs.length === 0) {
      return NextResponse.json(
        { message: "No drugs found in the selected location", success: true, data: [] },
        { status: 200 }
      );
    }
    return NextResponse.json({ data: drugs, success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
