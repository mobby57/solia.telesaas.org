import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes that require authentication
const protectedRoutes = ['/dashboard', '/missions', '/profile', '/admin'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the requested path is protected
  if (protectedRoutes.some((route) => pathname.startsWith(route))) {
    const token = request.cookies.get('token')?.value;

    // If no token, redirect to login
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Specify the paths where the middleware should run
export const config = {
  matcher: ['/dashboard/:path*', '/missions/:path*', '/profile/:path*', '/admin/:path*'],
};
