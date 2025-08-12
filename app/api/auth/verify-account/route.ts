import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { pharmacyTable } from "@/drizzle/schema";
import { eq, and } from "drizzle-orm";
import { isOtpValid } from "@/libs/isOtpValid";

export const config = {
  api: {
    bodyParser: false, // disable Next.js default parsing to handle FormData
  },
};


export async function POST(req: Request) {
  const formData = await req.formData();
  const { searchParams } = new URL(req.url);
  const pharmacyId = searchParams.get("pharmacyId");
  const region = searchParams.get("region");
  const city = searchParams.get("city");

  if (!formData) {
    return NextResponse.json(
      {
        message: "OTP is required",
        success: false,
        data: [],
      },
      { status: 400 }
    );
  }

const otp = formData.get('otp') as string
const photoId = formData.get('photoId') as File


  try {
    if (!pharmacyId) {
      return NextResponse.json(
        {
          message: "Pharmacy ID is required",
          success: false,
          data: [],
        },
        { status: 400 }
      );
    }

    // Build the condition dynamically
    const conditions = [eq(pharmacyTable.id, Number(pharmacyId))];
    if (region) conditions.push(eq(pharmacyTable.region, region));
    if (city) conditions.push(eq(pharmacyTable.town, city));

    // Check if pharmacy exists
    const pharmacy = await db
      .select()
      .from(pharmacyTable)
      .where(and(...conditions))
      .limit(1);

    if (pharmacy.length === 0) {
      return NextResponse.json(
        { message: "No pharmacies found", success: false, data: [] },
        { status: 404 }
      );
    }

    //Check if otp match
    if (pharmacy[0].verificationOTP !== otp) {
      return NextResponse.json(
        {
          message: "Invalid or Incorect OTP",
          success: false,
          data: [],
        },
        { status: 401 }
      );
    }

// Check if OTP time is still valid
const validOtp = isOtpValid(pharmacy[0].verificationOTPExpired, 10)

if(!validOtp){
     return NextResponse.json(
        {
          message: "OTP Expired.", 
          success: false,
          data: [],
        },
        { status: 403 }
      );
}
    //OTP functionality

    await db
      .update(pharmacyTable)
      .set({ verificationOTP: '', isVerified: true })
      .where(and(...conditions));

    return NextResponse.json(
      {
        message: "Account verified successfully.",
        data: [],
        success: true,
      },
      { status: 200 }
    );


  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message, success: false, data: [] },
        { status: 500 }
      );
    }
    console.error("Error verifying pharmacy", error);
    return NextResponse.error();
  }
}
