import { NextResponse } from 'next/server';
import { VerifyToken } from './services/providers';
// import { authenticate } from "./app/auth.js";

export default function middleware(request) {
  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: '/',
};



