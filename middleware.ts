import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const url = request.nextUrl;
    const hostname = request.headers.get('host') || '';

    // Extract subdomain
    const subdomain = hostname.split('.')[0];

    // Handle different environments
    const isLocalhost = hostname.includes('localhost');
    const isProduction = hostname.includes('ovd.dev');

    // Skip middleware for API routes, static files, and images
    if (
        url.pathname.startsWith('/api/') ||
        url.pathname.startsWith('/_next/') ||
        url.pathname.startsWith('/favicon.ico') ||
        url.pathname.startsWith('/assets/')
    ) {
        return NextResponse.next();
    }

    // Handle music subdomain
    if (isProduction && subdomain === 'music') {
        // Rewrite to /music route without changing the URL
        url.pathname = `/music${url.pathname === '/' ? '' : url.pathname}`;
        return NextResponse.rewrite(url);
    }

    // Handle localhost subdomain testing (e.g., music.localhost:3000)
    if (isLocalhost && subdomain === 'music') {
        url.pathname = `/music${url.pathname === '/' ? '' : url.pathname}`;
        return NextResponse.rewrite(url);
    }

    // Main domain or www - serve normally
    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!_next/static|_next/image|favicon.ico).*)',
    ],
};
