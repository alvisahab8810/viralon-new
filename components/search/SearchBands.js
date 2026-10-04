// components/search/SearchBands.js — /search's bands, in whatever order and
// with whatever copy the CRM holds for the page.
//
// Each component still carries the copy it shipped with and renders that when
// the record says nothing, so /search cannot go blank — Website → Pages →
// Search is simply where the live wording lives.
import React from "react";
import SiteBands, { sharedBands } from "../site/SiteBands";
import Hero from "./Hero";
import Results from "./Results";
import WhySearch from "./WhySearch";
import TheShift from "./TheShift";
import Layers from "./Layers";
import HowWeWork from "./HowWeWork";
import WhatWeMeasure from "./WhatWeMeasure";
import ThreeWays from "./ThreeWays";

const BANDS = {
  hero: (d) => <Hero d={d} />,
  results: (d) => <Results d={d} />,
  whysearch: (d) => <WhySearch d={d} />,
  theshift: (d) => <TheShift d={d} />,
  layers: (d) => <Layers d={d} />,
  howwework: (d) => <HowWeWork d={d} />,
  whatwemeasure: (d) => <WhatWeMeasure d={d} />,
  threeways: (d) => <ThreeWays d={d} />,
  ...sharedBands("search"),
};

export default function SearchBands({ sections = [], faqs = {} }) {
  return <SiteBands sections={sections} bands={BANDS} ctx={{ faqs }} />;
}
