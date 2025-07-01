import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Fake auth from cookies or headers
  const isAuthenticated = request.cookies.get('token')?.value === 'valid';
  const userRole = request.cookies.get('role')?.value; // 'pharmacy' or 'admin'

  const isPharmacyRoute = pathname.startsWith('/dashboard'); // adjust if route is /pharmacy/dashboard
  const isAdminRoute = pathname.startsWith('/admin');

  if (isPharmacyRoute) {
    if (!isAuthenticated || userRole !== 'pharmacy') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (isAdminRoute) {
    if (!isAuthenticated || userRole !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'], // protect pharmacy and admin
};
