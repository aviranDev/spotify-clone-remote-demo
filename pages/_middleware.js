import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";


export async function middleware(req) {
  //FIND USER'S LOGED IN JWT TOKEN IF EXSIT
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const { pathname } = req.nextUrl

  //VALIDATE USER'S TOKEN 
  if (pathname.includes('/api/auth') || token) {
    //COUNTINUE TO THE NEXT MIDDLEWARE
    return NextResponse.next();
  }

  //IF USER'S TOKEN IS MISSING..REDIRECT TO LOGIN
  if (!token && pathname !== '/login') {
    return NextResponse.redirect(`${process.env.NEXTAUTH_URL}/login`);
  }
}