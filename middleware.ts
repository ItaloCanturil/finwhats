import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip auth check for public routes and API auth routes
  if (
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/auth') ||
    pathname === '/' ||
    pathname.startsWith('/public') ||
    /\.(jpg|jpeg|png|gif|svg|css|js|ico|webp|ttf|woff2?)$/.test(pathname)
  ) {
    return NextResponse.next();
  }
  
  // Check if user is authenticated for protected routes
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });
    
    if (!session) {
      // Redirect to sign-in page if not authenticated
      return NextResponse.redirect(new URL('/auth/sign-in', request.url));
    }
    
    return NextResponse.next();
  } catch (error) {
    // If there's an error checking the session, redirect to sign-in
    return NextResponse.redirect(new URL('/auth/sign-in', request.url));
  }
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
