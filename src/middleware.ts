import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { notFound } from 'next/navigation';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (token?.role !== 'admin') {
    return NextResponse.redirect(new URL('/not-premission', req.nextUrl));
    // return notFound();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/cat/:path*/submit', '/cat/create'],
};
