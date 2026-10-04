// components/paid-ads/PaidAdsBands.js — /paid-ads's bands, in whatever order
// and with whatever copy the CRM holds for the page.
//
// Each component still carries the copy it shipped with and renders that when
// the record says nothing, so /paid-ads cannot go blank — Website → Pages →
// Paid Ads is simply where the live wording lives.
import React from "react";
import SiteBands, { sharedBands } from "../site/SiteBands";
import Hero from "./Hero";
import Results from "./Results";
import ReturnOnSpend from "./ReturnOnSpend";
import WhatDecides from "./WhatDecides";
import Dashboards from "./Dashboards";
import SixSteps from "./SixSteps";
import Places from "./Places";
import Measure from "./Measure";

const BANDS = {
  hero: (d) => <Hero d={d} />,
  results: (d) => <Results d={d} />,
  returnonspend: (d) => <ReturnOnSpend d={d} />,
  whatdecides: (d) => <WhatDecides d={d} />,
  dashboards: (d) => <Dashboards d={d} />,
  sixsteps: (d) => <SixSteps d={d} />,
  places: (d) => <Places d={d} />,
  measure: (d) => <Measure d={d} />,
  ...sharedBands("paid-ads"),
};

export default function PaidAdsBands({ sections = [], faqs = {} }) {
  return <SiteBands sections={sections} bands={BANDS} ctx={{ faqs }} />;
}
