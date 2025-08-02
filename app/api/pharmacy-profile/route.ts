import { NextResponse } from "next/server";
import { db } from '@/drizzle/index'
import { pharmacyTable } from "@/drizzle/schema";

export async function GET(req: Request){
    // console.log(req.headers)
      const url = new URL('/api/profile', req.url) // ✅ correct
      return new Response(JSON.stringify({ path: url.pathname }))
}