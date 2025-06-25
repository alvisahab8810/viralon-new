// // middleware.js
// import { NextResponse } from "next/server";

// export function middleware(request) {
//   const { pathname } = request.nextUrl;

//   const isDashboardPage = pathname.startsWith("/dashboard");
//   const isLoginPage = pathname === "/dashboard/login";
//   const isAuthenticated = request.cookies.get("admin_auth");

//   // ✅ Allow access to login page even if not authenticated
//   if (isLoginPage) {
//     return NextResponse.next();
//   }

//   // 🔒 Block all other dashboard pages if not authenticated
//   if (isDashboardPage && !isAuthenticated) {
//     return NextResponse.redirect(new URL("/dashboard/login", request.url));
//   }

//   return NextResponse.next();
// }




// // middleware.js
// import { NextResponse } from "next/server";

// export function middleware(request) {
//   const { pathname } = request.nextUrl;

//   // pages that should be public (no auth required)
//   const publicDashboardPages = [
//     "/dashboard/login",
//     "/dashboard/register-sales",   // ← NEW
//     "/dashboard/login-sales",   // ← NEW

//   ];

//   const isDashboardPage = pathname.startsWith("/dashboard");
//   const isPublic = publicDashboardPages.includes(pathname);
//   const isAuthenticated = request.cookies.get("admin_auth");

//   // ✅ allow public pages
//   if (isPublic) {
//     return NextResponse.next();
//   }

//   // 🔒 protect the rest of /dashboard
//   if (isDashboardPage && !isAuthenticated) {
//     // redirect unauthenticated user to login
//     return NextResponse.redirect(new URL("/dashboard/login", request.url));
//   }

//   // everything else
//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*"],   // run only on dashboard routes
// };





// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  /* ---------- 1. Public dashboard routes ---------- */
  const publicPages = [
    "/dashboard/login",
    "/dashboard/login-sales",
    "/dashboard/register-sales",
  ];

  if (publicPages.includes(pathname)) {
    return NextResponse.next();
  }

  /* ---------- 2. Auth check ---------- */
  const cookies = request.cookies;

  // simple cookie names
  const adminCookie     = cookies.get("admin_auth");
  const salesCookie     = cookies.get("sales_auth");

  // NextAuth session tokens (dev & prod)
  const jwtCookie       = cookies.get("next-auth.session-token");
  const secureJwtCookie = cookies.get("__Secure-next-auth.session-token");

  const isAuthenticated = adminCookie || salesCookie || jwtCookie || secureJwtCookie;

  /* ---------- 3. Protect all other /dashboard routes ---------- */
  if (pathname.startsWith("/dashboard") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }

  /* ---------- 4. (Optional) Role‑based gating ---------- */
  // Example: block salespeople from /dashboard/admin
  if (pathname.startsWith("/dashboard/admin") && salesCookie) {
    return NextResponse.redirect(new URL("/dashboard/salesperson", request.url));
  }

  // Example: block admins from salesperson area
  if (pathname.startsWith("/dashboard/salesperson") && adminCookie) {
    return NextResponse.redirect(new URL("/dashboard/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // run only on dashboard routes
};
