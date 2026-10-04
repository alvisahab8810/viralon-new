// utils/sitePageProps.js — the getStaticProps every editable menu page uses.
//
// All six of them need the same four things: the page's SEO record, its band
// list, whichever FAQ sets the bands point at, and the JSON-LD finished from
// what the page actually shows. Written once here rather than copied into
// every page file, so a change to how the head is built reaches all of them.
import { pageStaticProps } from "./pageSeo";
import { getPageFaq } from "./pageFaq";
import { getSiteSections } from "./sitePageContent";
import { allFaqs } from "./sampleSchema";
import { fromPageSeo, pageSchemas } from "./landingSeo";
import { PAGE_CONTENT_MAP } from "./pageSchemas";

/**
 * @param pageKey   the page's key, as utils/pageSchemas/index.js lists it
 * @param options.fallbackTitle  title used in the schema when the SEO record
 *                               has none, so the page is never described as
 *                               untitled
 * @param options.fallbackFaq    the questions the page shipped with, shown
 *                               until a set is published under this key
 * @param options.extra          anything else the page needs, as a function
 *                               returning a props object
 */
export function siteStaticProps(pageKey, options = {}) {
  const { fallbackTitle = "", fallbackFaq = null, extra = null } = options;
  const path = PAGE_CONTENT_MAP[pageKey]?.path || "/";
  const base = pageStaticProps(pageKey);

  return async function getStaticProps(ctx) {
    const b = await base(ctx);
    const sections = await getSiteSections(pageKey);

    // The FAQ band can borrow any published set, so whichever ones the bands
    // ask for are fetched here; the page's own set is always loaded.
    const faqs = {};
    const own = b.props.faq || fallbackFaq;
    if (own) faqs[pageKey] = own;
    for (const key of new Set(
      sections
        .filter((s) => s?.type === "faqform" && s?.data?.faqKey)
        .map((s) => s.data.faqKey)
    )) {
      if (!faqs[key]) faqs[key] = (await getPageFaq(key)) || (key === pageKey ? own : null);
    }

    const seo = b.props.seo;
    const schemas = pageSchemas(
      fromPageSeo({ ...(seo || {}), title: seo?.title || fallbackTitle }, path),
      allFaqs(sections, faqs)
    );

    return {
      ...b,
      props: {
        ...b.props,
        sections,
        faqs: JSON.parse(JSON.stringify(faqs)),
        schemas,
        ...(extra ? await extra() : {}),
      },
    };
  };
}
