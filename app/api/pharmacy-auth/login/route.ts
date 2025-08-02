import { NextResponse } from "next/server";
import { db } from "@/drizzle/index";
import { pharmacyTable } from "@/drizzle/schema";
import { comparePassword } from "@/libs/bcrypt";
import { signToken } from "@/libs/jwt";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const { email, password } = body;
    if (!email || !password) {
      return NextResponse.json(
        { error: "All field are required", success: false },
        { status: 400 }
      );
    }

    const user = await db
      .select()
      .from(pharmacyTable)
      .where(eq(pharmacyTable.email, email))
      .limit(1);

    if (user.length === 0) {
      return NextResponse.json(
        { error: "Invalid email or password", success: false },
        { status: 401 }
      );
    }
    if (!user) {
      return NextResponse.json(
        { error: "Pharmacy not found. Please register.", success: false },
        { status: 404 }
      );
    }

    const isPasswordValid = await comparePassword(password, user[0].password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password", success: false },
        { status: 401 }
      );
    }
    const token = signToken(user[0].email);

 (await cookies()).set('token', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production'? 'lax': 'strict',
  maxAge: 1 * 24 * 60 * 60,
  path: '/'
 })

    return NextResponse.json(
      { success: true, message: "Login successful", token, data: user[0] },
      { status: 200 }
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
