// proxy.js
//
// Two jobs, in one file because Next allows only one proxy (formerly
// "middleware") per app:
//
//   1. Dashboard auth gating (unchanged, /dashboard/* only).
//   2. The X-Robots-Tag response header for marketing pages that have one set
//      in the payroll admin (Website → Pages SEO).
//
// The meta robots tag is printed by <PageSeo /> inside the page; the header
// cannot be, because a statically generated page has no response hook. So the
// whole (small) SEO collection is read here once a minute and kept in module
// memory — every request after that is a Map lookup, no database round trip.
//
// It runs on the Node.js runtime because it talks to Mongo through mongoose,
// and every failure path falls through to NextResponse.next(): a database
// hiccup must never take the site down over a response header.
import { NextResponse } from "next/server";
import dbConnect from "./utils/dbConnect";
import PageSeo from "./models/PageSeo";

export const config = {
  // The dashboard (auth) plus every public page (robots header), but none of
  // Next's own assets, the API or files in /public.
  matcher: ["/((?!_next/|api/|assets/|favicon|robots.txt|sitemap.xml).*)"],
};

// The hosts that are allowed to be indexed: the live domain, and localhost so
// the database-driven header can still be tested in development. Every other
// host — admin.viralon.in, an IP, a preview domain — is served noindex.
const PRIMARY_HOSTS = new Set([
  (process.env.NEXT_PUBLIC_SITE_URL || "https://viralon.in")
    .replace(/^https?:\/\//, "")
    .replace(/\/+$/, "")
    .toLowerCase(),
  "viralon.in",
  "www.viralon.in",
  "localhost",
  "127.0.0.1",
]);

function isPrimaryHost(request) {
  const host = (request.headers.get("host") || "")
    .toLowerCase()
    .replace(/:\d+$/, "");
  // An unknown host is treated as primary: a missing Host header must not
  // silently deindex the live site.
  return !host || PRIMARY_HOSTS.has(host);
}

// How long the map is trusted before it is read again. It matches the pages'
// own `revalidate: 60`, so the header and the meta tag change together.
const TTL_MS = 60 * 1000;

let cache = { at: 0, map: new Map() };

async function robotsByPath() {
  if (Date.now() - cache.at < TTL_MS) return cache.map;

  await dbConnect();
  const docs = await PageSeo.find({ status: "published" })
    .select("path pageKey xRobotsTag")
    .lean();

  const map = new Map();
  for (const doc of docs) {
    const value = (doc.xRobotsTag || "").trim();
    if (!value) continue;
    // "home" is stored with path "/", everything else with its own route.
    const path = doc.path || (doc.pageKey === "home" ? "/" : `/${doc.pageKey}`);
    map.set(path.replace(/\/+$/, "") || "/", value);
  }

  cache = { at: Date.now(), map };
  return map;
}

export async function proxy(request) {
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

  const response = NextResponse.next();

  /* ---------- 5. X-Robots-Tag for public pages ---------- */
  if (!pathname.startsWith("/dashboard")) {
    // Anything that is not the primary domain is a staging host (today that is
    // admin.viralon.in, where the site is reviewed before the cutover). Those
    // must never be indexed, or Google ends up holding the same pages twice and
    // the real domain looks like a duplicate of a subdomain. The rule is keyed
    // on the host, so it switches itself off the moment the site answers on
    // viralon.in — nothing to remember on the day.
    if (!isPrimaryHost(request)) {
      response.headers.set("X-Robots-Tag", "noindex, nofollow");
      return response;
    }

    try {
      const path = pathname.replace(/\/+$/, "") || "/";
      const value = (await robotsByPath()).get(path);
      if (value) response.headers.set("X-Robots-Tag", value);
    } catch {
      // No header rather than no page.
    }
  }

  return response;
}
