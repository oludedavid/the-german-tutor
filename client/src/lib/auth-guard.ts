import { NextRequest, NextResponse } from "next/server";

// Middleware to check for authentication cookie
export function authenticationMiddleware(request: NextRequest) {
  // Check if the cookie contains the accessToken
  const cookie = request.headers.get("cookie");

  if (!cookie || !cookie.includes("accessToken=")) {
    // If no token is found in the cookies, redirect to login
    return NextResponse.redirect("/login");
  }

  // If token is found, proceed to the next step
  return NextResponse.next();
}
