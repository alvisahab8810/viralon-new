

// // middleware.js
// import { NextResponse } from "next/server";

// export function middleware(request) {
//   const { pathname } = request.nextUrl;

//   /* ---------- 1. Public dashboard routes ---------- */
//   const publicPages = [
//     "/dashboard/login",
//     "/dashboard/login-sales",
//     "/dashboard/register-sales",
//   ];

//   if (publicPages.includes(pathname)) {
//     return NextResponse.next();
//   }

//   /* ---------- 2. Auth check ---------- */
//   const cookies = request.cookies;

//   // simple cookie names
//   const adminCookie     = cookies.get("admin_auth");
//   const salesCookie     = cookies.get("sales_auth");

//   // NextAuth session tokens (dev & prod)
//   const jwtCookie       = cookies.get("next-auth.session-token");
//   const secureJwtCookie = cookies.get("__Secure-next-auth.session-token");

//   const isAuthenticated = adminCookie || salesCookie || jwtCookie || secureJwtCookie;

//   /* ---------- 3. Protect all other /dashboard routes ---------- */
//   if (pathname.startsWith("/dashboard") && !isAuthenticated) {
//     return NextResponse.redirect(new URL("/dashboard/login", request.url));
//   }

//   /* ---------- 4. (Optional) Role‑based gating ---------- */
//   // Example: block salespeople from /dashboard/admin
//   if (pathname.startsWith("/dashboard/admin") && salesCookie) {
//     return NextResponse.redirect(new URL("/dashboard/salesperson", request.url));
//   }

//   // Example: block admins from salesperson area
//   if (pathname.startsWith("/dashboard/salesperson") && adminCookie) {
//     return NextResponse.redirect(new URL("/dashboard/admin", request.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*"], // run only on dashboard routes
// };





// middleware.js
import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const origin = request.nextUrl.origin;

  // 1. Public dashboard routes
  const publicPages = [
    "/dashboard/login",
    "/dashboard/login-sales",
    "/dashboard/register-sales",
  ];

  if (publicPages.includes(pathname)) {
    return NextResponse.next();
  }

  // 2. Auth check
  const cookies = request.cookies;

  const adminCookie     = cookies.get("admin_auth");
  const salesCookie     = cookies.get("sales_auth");
  const jwtCookie       = cookies.get("next-auth.session-token");
  const secureJwtCookie = cookies.get("__Secure-next-auth.session-token");

  const isAuthenticated = adminCookie || salesCookie || jwtCookie || secureJwtCookie;

  // 3. Protect all other /dashboard routes
  if (pathname.startsWith("/dashboard") && !isAuthenticated) {
    return NextResponse.redirect(`${origin}/dashboard/login`);
  }

  // 4. Role‑based gating
  if (pathname.startsWith("/dashboard/admin") && salesCookie) {
    return NextResponse.redirect(`${origin}/dashboard/salesperson`);
  }

  if (pathname.startsWith("/dashboard/salesperson") && adminCookie) {
    return NextResponse.redirect(`${origin}/dashboard/admin`);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"], // run only on dashboard routes
};
