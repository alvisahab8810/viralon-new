// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  const isDashboardPage = pathname.startsWith("/dashboard");
  const isLoginPage = pathname === "/dashboard/login";
  const isAuthenticated = request.cookies.get("admin_auth");

  // ✅ Allow access to login page even if not authenticated
  if (isLoginPage) {
    return NextResponse.next();
  }

  // 🔒 Block all other dashboard pages if not authenticated
  if (isDashboardPage && !isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }

  return NextResponse.next();
}
