import { NextResponse } from "next/server";
import { db } from '@/drizzle/index'
import { hashPassword } from "@/libs/bcrypt";
import { pharmacyTable } from "@/drizzle/schema";
import { signToken } from "@/libs/jwt";
import { cookies } from 'next/headers';
import { eq, or } from "drizzle-orm";

export async function POST(req: Request) {
     
     const weeklySchedule = {
        monday:    { open: "08:00", close: "18:00", isOnCall: false },
        tuesday:   { open: "08:00", close: "18:00", isOnCall: false },
        wednesday: { open: "08:00", close: "18:00", isOnCall: false },
        thursday:  { open: "08:00", close: "18:00", isOnCall: false },
        friday:    { open: "08:00", close: "18:00", isOnCall: false },
        saturday:  { open: "09:00", close: "13:00", isOnCall: false },
        sunday:  { open: "09:00", close: "13:00", isOnCall: false },
      }
    
    const body = await req.json();
    const { pharmacyName, email, pharmacistName, phoneNumber, region, town, password } = body;

    if (!pharmacyName || !email || !pharmacistName || !phoneNumber || !region || !town || !password) {
        return NextResponse.json({ error: "All fields are required", success: false }, { status: 400 });
    }


    const existingPharmacy = await db.select().from(pharmacyTable).where(
        or(
            eq(pharmacyTable.pharmacyName, pharmacyName),
            eq(pharmacyTable.email, email)
        )
    );
    if (existingPharmacy.length > 0) {
        return NextResponse.json({ error: "Pharmacy with this name or email already exists", success: false });
    }

    const hashedPassword = await hashPassword(password);
    try{
        const newPharmacy = await db.insert(pharmacyTable).values({
            pharmacyName,
            email,
            pharmacistName,
            phoneNumber,
            region,
            town,
            password: hashedPassword,
            isOnCall: false,
            isVerified: false,
            isOpen: true,
            location: { lat: 0, lng: 0 }, // Default location, can be updated later
            weeklySchedule
        }).returning();
        
        const token = signToken(email);
        (await cookies()).set('token', token, {
            httpOnly: true,
            secure: true,
            path: '/',
        });

        return NextResponse.json({ data: newPharmacy, success: true, message: "Pharmacy registered successfully", token }, { status: 201 });
    }
    catch(ex: unknown){
        if( ex instanceof Error ){
            return NextResponse.json({ error: ex.message, success: false }, { status: 400 });
        }
        return NextResponse.json({ error: "Internal Server Error", success: false }, { status: 500 });
    }
}