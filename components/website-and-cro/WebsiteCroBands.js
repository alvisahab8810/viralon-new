// components/website-and-cro/WebsiteCroBands.js — /website-and-cro's bands, in
// whatever order and with whatever copy the CRM holds for the page.
//
// Each component still carries the copy it shipped with and renders that when
// the record says nothing, so /website-and-cro cannot go blank — Website →
// Pages → Website & CRO is simply where the live wording lives.
//
// Measure is /paid-ads' band, reused rather than copied: it is the same row
// with the same numbers on both pages, so there is one component for it.
import React from "react";
import SiteBands, { sharedBands } from "../site/SiteBands";
import Hero from "./Hero";
import Results from "./Results";
import ReturnOnSpend from "./ReturnOnSpend";
import WhatDecides from "./WhatDecides";
import Dashboards from "./Dashboards";
import TwoJobs from "./TwoJobs";
import FiveSteps from "./FiveSteps";
import Tech from "./Tech";
import Measure from "../paid-ads/Measure";

const BANDS = {
  hero: (d) => <Hero d={d} />,
  results: (d) => <Results d={d} />,
  returnonspend: (d) => <ReturnOnSpend d={d} />,
  whatdecides: (d) => <WhatDecides d={d} />,
  dashboards: (d) => <Dashboards d={d} />,
  twojobs: (d) => <TwoJobs d={d} />,
  fivesteps: (d) => <FiveSteps d={d} />,
  tech: (d) => <Tech d={d} />,
  measure: (d) => <Measure d={d} />,
  ...sharedBands("website-and-cro"),
};

export default function WebsiteCroBands({ sections = [], faqs = {} }) {
  return <SiteBands sections={sections} bands={BANDS} ctx={{ faqs }} />;
}
