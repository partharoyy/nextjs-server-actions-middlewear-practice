import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  const checkPath = path === '/sign-in' || path === '/sign-up';
  const getCookies = cookies();
  const token = getCookies.get('token')?.value || '';

  if (checkPath && token !== '') {
    return NextResponse.redirect(new URL('/', request.nextUrl));
  }

  if (!checkPath && token === '') {
    return NextResponse.redirect(new URL('/sign-in', request.nextUrl));
  }
}

export const config = {
  matcher: ['/sign-in', '/sign-up'],
};
