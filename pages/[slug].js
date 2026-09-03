// pages/[slug].js — root-level catch-all that renders published SEO landing
// pages built in the payroll admin (Website → SEO Pages, shared Mongo
// "landingpages" collection). Next always resolves static routes first, so
// every existing page (/jobs, /career, /contact-us, …) is untouched — this
// only fires for URLs no static page owns, and 404s when no published
// landing page matches.
import React from "react";
import CustomHead from "../components/CustomHead";
import Topbar from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Offcanvas from "../components/header/Offcanvas";
import dbConnect from "../utils/dbConnect";
import LandingPage from "../models/LandingPage";
import { getLandingTemplate } from "../components/landing";

export default function SeoLandingPage({ page }) {
  const Template = getLandingTemplate(page.template);
  return (
    <div className="bg-dark">
      <CustomHead
        title={page.seoTitle || page.title}
        keywords={page.seoKeywords || ""}
        description={page.seoDescription || ""}
      />
      <Topbar />
      <Offcanvas />
      <Template page={page} />
      <Footer />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  try {
    await dbConnect();
    const page = await LandingPage.findOne({
      slug: params.slug,
      status: "published",
    }).lean();
    if (!page) return { notFound: true };
    return { props: { page: JSON.parse(JSON.stringify(page)) } };
  } catch {
    return { notFound: true };
  }
}
