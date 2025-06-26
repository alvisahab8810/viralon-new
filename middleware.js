

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






import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;
  const cookies = request.cookies;

  const adminCookie = cookies.get("admin_auth");
  const salesCookie = cookies.get("sales_auth");

  console.log("📌 Pathname:", pathname);
  console.log("🔐 admin_auth cookie:", adminCookie?.value);
  console.log("🔐 sales_auth cookie:", salesCookie?.value);

  const isAuthenticated = adminCookie || salesCookie;

  // Allow public pages
  const publicPages = [
    "/dashboard/login",
    "/dashboard/login-sales",
    "/dashboard/register-sales",
  ];

  if (publicPages.includes(pathname)) {
    console.log("✅ Public route allowed");
    return NextResponse.next();
  }

  // Protect dashboard routes
  if (pathname.startsWith("/dashboard") && !isAuthenticated) {
    console.log("🔒 Not authenticated, redirecting to /dashboard/login");
    return NextResponse.redirect(new URL("/dashboard/login", request.url));
  }

  if (pathname.startsWith("/dashboard/admin") && salesCookie) {
    console.log("⛔ Salesperson trying to access admin area");
    return NextResponse.redirect(new URL("/dashboard/salesperson", request.url));
  }

  if (pathname.startsWith("/dashboard/salesperson") && adminCookie) {
    console.log("⛔ Admin trying to access salesperson area");
    return NextResponse.redirect(new URL("/dashboard/admin", request.url));
  }

  console.log("✅ Access allowed to:", pathname);
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
