import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { hashPassword } from "@/libs/bcrypt";
import { pharmacyTable, dailySchedule } from "@/drizzle/schema";
import { signToken } from "@/libs/jwt";
import { cookies } from "next/headers";
import { eq, or, and } from "drizzle-orm";

export async function POST(req: Request) {
  const weeklySchedule = [
    {
      day: "monday",
      openingTime: "08:00",
      closingTime: "18:00",
      isOpen: true,
      isOnCall: false,
    },
    {
      day: "tuesday",
      openingTime: "08:00",
      closingTime: "18:00",
      isOpen: true,
      isOnCall: false,
    },
    {
      day: "wednesday",
      openingTime: "08:00",
      closingTime: "18:00",
      isOpen: true,
      isOnCall: false,
    },
    {
      day: "thursday",
      openingTime: "08:00",
      closingTime: "18:00",
      isOpen: true,
      isOnCall: false,
    },
    {
      day: "friday",
      openingTime: "08:00",
      closingTime: "18:00",
      isOpen: true,
      isOnCall: false,
    },
    {
      day: "saturday",
      openingTime: "08:00",
      closingTime: "18:00",
      isOpen: true,
      isOnCall: false,
    },
    {
      day: "sunday",
      openingTime: "08:00",
      closingTime: "18:00",
      isOpen: false,
      isOnCall: false,
    },
  ];

  const body: {
    pharmacyName: string;
    email: string;
    pharmacistName: string;
    phoneNumber: string;
    region: string;
    town: string;
    password: string;
  } = await req.json();

  const {
    pharmacyName,
    email,
    pharmacistName,
    phoneNumber,
    region,
    town,
    password,
  } = body;

  if (
    !pharmacyName ||
    !email ||
    !pharmacistName ||
    !phoneNumber ||
    !region ||
    !town ||
    !password
  ) {
    return NextResponse.json(
      { error: "All fields are required", success: false },
      { status: 400 }
    );
  }

  const existingPharmacy = await db
    .select()
    .from(pharmacyTable)
    .where(
      or(
        eq(pharmacyTable.pharmacyName, pharmacyName),
        eq(pharmacyTable.email, email)
      )
    );

  if (existingPharmacy.length > 0) {
    return NextResponse.json({
      error: "Pharmacy with this name or email already exists",
      success: false,
    });
  }

  const hashedPassword = await hashPassword(password);

  try {
    // Insert pharmacy
    const newPharmacy = await db
      .insert(pharmacyTable)
      .values({
        pharmacyName,
        email,
        pharmacistName,
        phoneNumber,
        region,
        town,
        password: hashedPassword,
      })
      .returning();

    // ✅ Insert daily schedule rows for this pharmacy
    for (const day of weeklySchedule) {
      await db.insert(dailySchedule).values({
        day: day.day,
        openingTime: day.openingTime,
        closingTime: day.closingTime,
        isOpen: day.isOpen,
        isOnCall: day.isOnCall,
        pharmacyId: newPharmacy[0].id,
      });
    }

    // Generate and set token
    const token = signToken(email);
    (await cookies()).set("token", token, {
      httpOnly: true,
      secure: true,
      path: "/",
    });

    return NextResponse.json(
      {
        data: newPharmacy,
        success: true,
        message: "Pharmacy registered successfully",
        token,
      },
      { status: 201 }
    );
  } catch (ex: unknown) {
    if (ex instanceof Error) {
      return NextResponse.json(
        { error: ex.message, success: false },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
}
