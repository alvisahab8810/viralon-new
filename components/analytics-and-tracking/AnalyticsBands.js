// components/analytics-and-tracking/AnalyticsBands.js — /analytics-and-tracking's
// bands, in whatever order and with whatever copy the CRM holds for the page.
//
// Each component still carries the copy it shipped with and renders that when
// the record says nothing, so the page cannot go blank — Website → Pages →
// Analytics & Tracking is simply where the live wording lives.
import React from "react";
import SiteBands, { sharedBands } from "../site/SiteBands";
import Hero from "./Hero";
import ThreeQuestions from "./ThreeQuestions";
import ConversionLoss from "./ConversionLoss";
import Mistake from "./Mistake";
import ThreeReports from "./ThreeReports";
import Audit from "./Audit";

const BANDS = {
  hero: (d) => <Hero d={d} />,
  threequestions: (d) => <ThreeQuestions d={d} />,
  conversionloss: (d) => <ConversionLoss d={d} />,
  mistake: (d) => <Mistake d={d} />,
  threereports: (d) => <ThreeReports d={d} />,
  audit: (d) => <Audit d={d} />,
  ...sharedBands("analytics-and-tracking"),
};

export default function AnalyticsBands({ sections = [], faqs = {} }) {
  return <SiteBands sections={sections} bands={BANDS} ctx={{ faqs }} />;
}
