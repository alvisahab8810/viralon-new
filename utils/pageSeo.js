// utils/pageSeo.js — one-liner for a page's getStaticProps to pull its SEO
// record out of the shared "pageseos" collection (written by the payroll
// admin, Website → Pages SEO).
//
// Usage:
//
//   export const getStaticProps = pageStaticProps("paid-ads");
//
// which hands the page both `seo` and `faq`. Returns null for `seo` when the
// page has no published record — <PageSeo /> then prints the fallback title
// the page itself carries, exactly as before.
import dbConnect from "./dbConnect";
import PageSeoModel from "../models/PageSeo";
import { getPageFaq } from "./pageFaq";

export async function getPageSeo(pageKey) {
  try {
    await dbConnect();
    const doc = await PageSeoModel.findOne({ pageKey, status: "published" }).lean();
    if (!doc) return null;
    return JSON.parse(JSON.stringify(doc));
  } catch {
    // A DB hiccup must never break the build or the page — fall back to the
    // page's own hard-coded head.
    return null;
  }
}

// Both blocks a marketing page needs, in one call.
export function pageStaticProps(pageKey, revalidate = 60) {
  return async () => ({
    props: {
      seo: await getPageSeo(pageKey),
      faq: await getPageFaq(pageKey),
    },
    revalidate,
  });
}
