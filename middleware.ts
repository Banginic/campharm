import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './libs/jwt-edge';


export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value
  const validToken = await verifyToken(token || 'none')



  const isAdminRoute = pathname.startsWith('/admin');
  const isPharmacyRoute = pathname.startsWith('/pharmacy')

  if (isPharmacyRoute) {
  
  }
  if( pathname.startsWith('/pharmacy') && !validToken){
     return NextResponse.redirect(new URL('/pharmacy/login', request.url));
  }

  if (isAdminRoute) {
  
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/pharmacy/:path*'], // protect pharmacy and admin
};
