// pages/[slug].js — root-level catch-all that renders published pages built in
// the payroll admin (Website → Pages, shared Mongo "landingpages"
// collection). Next always resolves static routes first, so every existing
// page (/jobs, /career, /contact-us, …) is untouched — this only fires for
// URLs no static page owns, and 404s when no published page matches.
//
// Two shapes arrive here. A page on the "sample" template is a list of the
// /sample bands, rendered by components/sample/SamplePage; anything else is
// one of the older landing templates, which own their own dark wrapper. They
// are kept apart at the top rather than inside one wrapper because the sample
// page is a light page and `.bg-dark` would take the ink off every heading on
// it.
//
// The <head> is the full set the blog gets: meta tags, canonical, Open Graph,
// Twitter card, robots, and the JSON-LD blocks. Every fallback lives in
// utils/landingSeo.js so the CRM's preview shows exactly what ships here.
import React from "react";
import Head from "next/head";
import Script from "next/script";
import Topbar from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Offcanvas from "../components/header/Offcanvas";
import dbConnect from "../utils/dbConnect";
import LandingPage from "../models/LandingPage";
import { getLandingTemplate } from "../components/landing";
import SamplePage from "../components/sample/SamplePage";
import { getPageFaq } from "../utils/pageFaq";
import { allFaqs } from "../utils/sampleSchema";
import { resolveSeo, pageSchemas } from "../utils/landingSeo";

function SeoHead({ page, schemas }) {
  const seo = resolveSeo(page);
  return (
    <>
      <Head>
        <title>{seo.title}</title>
        {seo.description && <meta name="description" content={seo.description} />}
        {seo.keywords && <meta name="keywords" content={seo.keywords} />}
        <meta name="robots" content={seo.metaRobots} />
        <link rel="canonical" href={seo.url} />

        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Viralon" />
        <meta property="og:url" content={seo.url} />
        <meta property="og:title" content={seo.ogTitle} />
        {seo.ogDescription && <meta property="og:description" content={seo.ogDescription} />}
        {seo.image && <meta property="og:image" content={seo.image} />}

        <meta name="twitter:card" content={seo.twitterCard} />
        <meta name="twitter:title" content={seo.ogTitle} />
        {seo.ogDescription && <meta name="twitter:description" content={seo.ogDescription} />}
        {seo.image && <meta name="twitter:image" content={seo.image} />}
      </Head>

      {/* Structured data. Printed through next/script the same way the blog
          does it, one tag per block. */}
      {schemas.map((json, i) => (
        <Script
          key={i}
          id={`landing-schema-${i}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: json }}
        />
      ))}
    </>
  );
}

export default function SeoLandingPage({ page, faqs, schemas }) {
  const head = <SeoHead page={page} schemas={schemas || []} />;

  if (page.template === "sample") {
    return (
      <>
        {head}
        <Topbar />
        <Offcanvas />
        <SamplePage
          sections={page.content?.sections || []}
          faqs={faqs || {}}
          pageKey={page.slug}
        />
        <Footer />
      </>
    );
  }

  const Template = getLandingTemplate(page.template);
  return (
    <div className="bg-dark">
      {head}
      <Topbar />
      <Offcanvas />
      <Template page={page} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ params, res }) {
  try {
    await dbConnect();
    const page = await LandingPage.findOne({
      slug: params.slug,
      status: "published",
    }).lean();
    if (!page) return { notFound: true };

    // A sample-shaped page can borrow any published question set, so whichever
    // sets it asks for are fetched here rather than in the band — the band
    // renders on the client too.
    const faqs = {};
    if (page.template === "sample") {
      const keys = [
        ...new Set(
          (page.content?.sections || [])
            .filter((s) => s?.type === "faqform" && s?.data?.faqKey)
            .map((s) => s.data.faqKey)
        ),
      ];
      for (const k of keys) faqs[k] = await getPageFaq(k);
    }

    // The FAQPage block is generated from the questions the page actually
    // shows, its own or borrowed, so the structured data cannot drift from
    // what a visitor reads.
    const schemas = pageSchemas(
      page,
      page.template === "sample" ? allFaqs(page.content?.sections || [], faqs) : []
    );

    // Robots as a response header too, which is the only way to mark a page
    // noindex for crawlers that fetch it without running the page.
    const xRobots = resolveSeo(page).xRobotsTag;
    if (res && xRobots) res.setHeader("X-Robots-Tag", xRobots);

    return {
      props: {
        page: JSON.parse(JSON.stringify(page)),
        faqs: JSON.parse(JSON.stringify(faqs)),
        schemas,
      },
    };
  } catch {
    return { notFound: true };
  }
}
