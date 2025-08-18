// app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    console.log(pathname)

    // Allow public routes
    if (pathname === '/pharmacy/login' || pathname === '/pharmacy/sign-up') {
      return NextResponse.next();
    }

    // All other routes require authentication
    return NextResponse.next();
  },
  {
    pages: {
      signIn: '/pharmacy/login', // redirect here if not authenticated
    },
  }
);

// Protect these routes
export const config = {
  matcher: [
    '/admin/:path*',
    '/pharmacy/drugs',
    '/pharmacy/on-call',
    '/pharmacy/verify-account',
    '/pharmacy/working-days',
    '/pharmacy/profile',
    '/pharmacy/update-location',
    '/pharmacy/staff-schedule',
    '/pharmacy/view-orders',
  ],
};
