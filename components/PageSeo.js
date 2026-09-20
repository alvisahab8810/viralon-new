// components/PageSeo.js — the <head> of a marketing page.
//
// Everything it prints comes from the record the payroll admin saved
// (Website → Pages SEO). Nothing is required: each field falls back to the
// `fallback` prop the page passes, which is the title and description the
// page used to carry hard-coded, so a page with no record looks exactly as
// it did before.
//
// It replaces <CustomHead /> on the pages that have an SEO record, and is a
// drop-in for it otherwise.
import React from "react";
import Head from "next/head";

const DEFAULT_ROBOTS = "index, follow, max-image-preview:large, max-snippet:-1";
const BASE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://viralon.in").replace(/\/+$/, "");

// An absolute URL for og:image, whichever form the admin typed.
const absolute = (url) => {
  if (!url) return "";
  return /^https?:\/\//i.test(url) ? url : `${BASE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
};

export default function PageSeo({ seo, fallback = {}, path = "" }) {
  const s = seo || {};

  const title = s.title || fallback.title || "Viralon";
  const description = s.metaDescription || fallback.description || "";
  const keywords = s.metaKeywords || fallback.keywords || "";
  const canonical = s.canonical || (path ? `${BASE_URL}${path}` : "");
  const robots = s.metaRobots || DEFAULT_ROBOTS;

  const ogTitle = s.ogTitle || title;
  const ogDescription = s.ogDescription || description;
  const ogImage = absolute(s.ogImage);
  const twitterCard = s.twitterCard || "summary_large_image";

  // Only blocks that actually parse are printed: a broken one would be dead
  // weight in the page and can make a validator reject the rest.
  const schemas = (s.schemas || [])
    .map((block) => {
      try {
        return JSON.stringify(JSON.parse(block.content));
      } catch {
        return null;
      }
    })
    .filter(Boolean);

  return (
    <Head>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content={robots} />
      {canonical && <link rel="canonical" href={canonical} />}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={ogTitle} />
      {ogDescription && <meta property="og:description" content={ogDescription} />}
      {canonical && <meta property="og:url" content={canonical} />}
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:site_name" content="Viralon" />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle} />
      {ogDescription && <meta name="twitter:description" content={ogDescription} />}
      {ogImage && <meta name="twitter:image" content={ogImage} />}

      {/* JSON-LD is written by the admin and validated on save, then again
          above, so what lands here is always parseable structured data. */}
      {schemas.map((json, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: json }}
        />
      ))}
    </Head>
  );
}
