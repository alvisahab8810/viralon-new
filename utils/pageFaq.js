// utils/pageFaq.js — one-liner for a page's getStaticProps to pull its FAQ set
// out of the shared "pagefaqs" collection (written by the payroll admin,
// Website → FAQs).
//
// Usage in any page that renders <PageFaq />:
//
//   export async function getStaticProps() {
//     return { props: { faq: await getPageFaq("our-services/seo") }, revalidate: 60 };
//   }
//
// Returns null when the page has no published set — <PageFaq /> then renders
// nothing, exactly as if the section were not on the page.
import dbConnect from "./dbConnect";
import PageFaqModel from "../models/PageFaq";

export async function getPageFaq(pageKey) {
  try {
    await dbConnect();
    const doc = await PageFaqModel.findOne({ pageKey, status: "published" }).lean();
    if (!doc || !doc.items?.length) return null;
    return JSON.parse(JSON.stringify(doc));
  } catch {
    // A DB hiccup must never break the build or the page — just skip the block.
    return null;
  }
}

// Convenience wrapper so a page's whole data function is one line.
export function faqStaticProps(pageKey, revalidate = 60) {
  return async () => ({ props: { faq: await getPageFaq(pageKey) }, revalidate });
}
