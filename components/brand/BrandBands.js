// components/brand/BrandBands.js — /brand's bands, in whatever order and with
// whatever copy the CRM holds for the page.
//
// Each component still carries the copy it shipped with and renders that when
// the record says nothing, so /brand cannot go blank — Website → Pages →
// Brand is simply where the live wording lives.
import React from "react";
import SiteBands, { sharedBands } from "../site/SiteBands";
import Hero from "./Hero";
import WhyItMatters from "./WhyItMatters";
import BrandsBuilt from "./BrandsBuilt";
import HowWeSee from "./HowWeSee";
import QuoteBand from "./QuoteBand";
import HaveLook from "./HaveLook";
import WhatWeMake from "./WhatWeMake";

const BANDS = {
  hero: (d) => <Hero d={d} />,
  whyitmatters: (d) => <WhyItMatters d={d} />,
  brandsbuilt: (d) => <BrandsBuilt d={d} />,
  howwesee: (d) => <HowWeSee d={d} />,
  quoteband: (d) => <QuoteBand d={d} />,
  havelook: (d) => <HaveLook d={d} />,
  whatwemake: (d) => <WhatWeMake d={d} />,
  ...sharedBands("brand"),
};

export default function BrandBands({ sections = [], faqs = {} }) {
  return <SiteBands sections={sections} bands={BANDS} ctx={{ faqs }} />;
}
