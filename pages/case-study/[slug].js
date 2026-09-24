// pages/case-study/[slug].js — one case study, drawn entirely from the
// "casestudies" collection the payroll admin writes (Website → Case Studies).
//
// The page is a fixed stack of sections; which of them appear, what they are
// numbered and what they say all come from the record. A section that is
// switched off is skipped here and drops out of the "On this page" rail.
//
// The chrome at the foot -- Inside Viralon, the FAQ, the form, the blogs --
// is the site's shared furniture and is deliberately NOT part of the case
// study record: those blocks have to stay identical across every page.
import React from "react";
import { useRouter } from "next/router";

import Topbar from "../../components/header/Header";
import Offcanvas from "../../components/header/Offcanvas";
import Footer from "../../components/footer/Footer";
import PageSeo from "../../components/PageSeo";
import PageFaq from "../../components/PageFaq";
import SooSocial from "../../components/home/SooSocial";
import Form from "../../components/home/Form";
import LatestBlogs from "../../components/common/LatestBlogs";

import Hero from "../../components/case-study/Hero";
import OnThisPage from "../../components/case-study/OnThisPage";
import InMotion from "../../components/case-study/InMotion";
import WorkItself from "../../components/case-study/WorkItself";
import Problem from "../../components/case-study/Problem";
import Approach from "../../components/case-study/Approach";
import Teams from "../../components/case-study/Teams";
import HowItRan from "../../components/case-study/HowItRan";
import Stack from "../../components/case-study/Stack";
import Landed from "../../components/case-study/Landed";

import { getCaseStudy, getCaseStudySlugs } from "../../utils/caseStudy";
import { getPageFaq } from "../../utils/pageFaq";

// Every section the page can draw, in the order it draws them. `id` is both
// the anchor and what the rail links to; `label` is the fallback the rail
// shows when the admin left navLabel empty.
const SECTIONS = [
  { key: null, id: "cs-intro", label: "Hero" },
  { key: "inMotion", id: "cs-in-motion", label: "In Motion" },
  { key: "workItself", id: "cs-work", label: "The Work Itself" },
  { key: "problem", id: "cs-problem", label: "The Challenge" },
  { key: "approach", id: "cs-approach", label: "Our Approach" },
  { key: "teams", id: "cs-teams", label: "The Team" },
  { key: "howItRan", id: "cs-how-it-ran", label: "How It Ran" },
  { key: "stack", id: "cs-stack", label: "Stack" },
  { key: "landed", id: "cs-landed", label: "Where It Landed" },
];

// A section is drawn only when it is switched on in the admin.
const on = (section) => Boolean(section) && section.enabled !== false;

// The rail's lines: the intro always, then whichever sections are switched on
// and actually carry something.
function navSections(study) {
  return SECTIONS.filter((s) => {
    if (!s.key) return true;
    const section = study?.[s.key];
    return section && section.enabled !== false;
  }).map((s) => {
    const section = s.key ? study[s.key] : null;
    return {
      id: s.id,
      // Every line carries the number the section prints above its own
      // heading; the intro has none of its own, so it carries nothing.
      number: s.key ? section?.number || "" : "",
      label: section?.navLabel || section?.label || s.label,
    };
  });
}

export default function CaseStudyPage({ study, faq }) {
  const router = useRouter();

  // A slug published after the last build arrives here before its props do.
  if (router.isFallback) {
    return <div className="cs-page bg-dark" />;
  }

  if (!study) return null;

  const seo = study.seo || {};

  return (
    <div className="cs-page bg-dark">
      <PageSeo
        seo={seo.title || seo.metaDescription ? seo : null}
        path={`/case-study/${study.slug}`}
        fallback={{
          title: `${study.brandName} case study | Viralon`,
          description: study.hero?.intro || "",
        }}
      />

      <Topbar />
      <Offcanvas />

      <div className="container">
        <div className="cs-body">
          <div className="cs-main">
            <Hero study={study} />
            {on(study.inMotion) ? <InMotion section={study.inMotion} /> : null}
            {on(study.workItself) ? <WorkItself section={study.workItself} /> : null}
            {on(study.problem) ? <Problem section={study.problem} /> : null}
            {on(study.approach) ? <Approach section={study.approach} /> : null}
            {on(study.teams) ? <Teams section={study.teams} /> : null}
            {on(study.howItRan) ? <HowItRan section={study.howItRan} /> : null}
            {on(study.stack) ? <Stack section={study.stack} /> : null}
            {on(study.landed) ? <Landed section={study.landed} /> : null}
          </div>

          {study.onThisPage?.enabled !== false ? (
            <OnThisPage sections={navSections(study)} cta={study.onThisPage} />
          ) : null}
        </div>
      </div>

      <SooSocial />
      <PageFaq faq={faq} variant="light" />
      <Form variant="light" />
      <LatestBlogs />
      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  const slugs = await getCaseStudySlugs();
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    // A study published in the admin should appear without a redeploy.
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  const study = await getCaseStudy(params.slug);
  if (!study) return { notFound: true, revalidate: 60 };

  return {
    props: {
      study,
      // One FAQ set shared by every case study, edited under the "case-study"
      // page key like any other page's set.
      faq: await getPageFaq("case-study"),
    },
    revalidate: 60,
  };
}
