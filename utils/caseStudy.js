// utils/caseStudy.js — read side of the shared "casestudies" collection
// (written by the payroll admin, Website → Case Studies).
//
// Same shape as utils/pageSeo.js: a DB hiccup returns null rather than
// breaking the build, and the page decides what to render without one.
import dbConnect from "./dbConnect";
import CaseStudy from "../models/CaseStudy";

// Everything /case-study/[slug] needs, or null when nothing is published under
// that slug -- the page then answers 404.
export async function getCaseStudy(slug) {
  try {
    await dbConnect();
    const doc = await CaseStudy.findOne({ slug, status: "published" }).lean();
    if (!doc) return null;
    return JSON.parse(JSON.stringify(doc));
  } catch {
    return null;
  }
}

// Every published slug, for getStaticPaths.
export async function getCaseStudySlugs() {
  try {
    await dbConnect();
    const docs = await CaseStudy.find({ status: "published" })
      .select("slug")
      .lean();
    return docs.map((d) => d.slug).filter(Boolean);
  } catch {
    return [];
  }
}

// The cards behind the home page's Case Studies rail, in the order the admin
// set. Only the handful of fields that rail draws, so the home page does not
// carry every section's copy in its payload.
export async function getHomeCaseStudies() {
  try {
    await dbConnect();
    const docs = await CaseStudy.find({
      status: "published",
      "home.enabled": true,
    })
      .select("slug brandName brandLogo home")
      .sort({ "home.order": 1, updatedAt: -1 })
      .lean();
    return JSON.parse(JSON.stringify(docs));
  } catch {
    return [];
  }
}
