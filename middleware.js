

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
  const response = NextResponse.next();

  // 1. Allow public dashboard pages
  const publicRoutes = [
    "/dashboard/login",
    "/dashboard/login-sales",
    "/dashboard/register-sales",
  ];
  if (publicRoutes.includes(pathname)) return response;

  // 2. Read cookies
  const adminCookie = request.cookies.get("admin_auth");
  const salesCookie = request.cookies.get("sales_auth");

  const isAdmin = adminCookie?.value === "true";
  const isSales = salesCookie?.value === "true";

  const isAuthenticated = isAdmin || isSales;

  // 3. Redirect if not authenticated
  if (pathname.startsWith("/dashboard") && !isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }

  // 4. Role-based protection
  if (pathname.startsWith("/dashboard/admin") && isSales) {
    return NextResponse.redirect(new URL("/dashboard/salesperson", request.url));
  }

  if (pathname.startsWith("/dashboard/salesperson") && isAdmin) {
    return NextResponse.redirect(new URL("/dashboard/admin", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
