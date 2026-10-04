// components/social-content/SocialBands.js — /social-content's bands, in
// whatever order and with whatever copy the CRM holds for the page.
//
// Each component still carries the copy it shipped with and renders that when
// the record says nothing, so /social-content cannot go blank — Website →
// Pages → Social Content is simply where the live wording lives.
import React from "react";
import SiteBands, { sharedBands } from "../site/SiteBands";
import Hero from "./Hero";
import TheWork from "./TheWork";
import WrongPlatform from "./WrongPlatform";
import Platforms from "./Platforms";
import HowWeWork from "./HowWeWork";
import WhatWeMake from "./WhatWeMake";
import ThreeWays from "./ThreeWays";
import Metrics from "./Metrics";

const BANDS = {
  hero: (d) => <Hero d={d} />,
  thework: (d) => <TheWork d={d} />,
  wrongplatform: (d) => <WrongPlatform d={d} />,
  platforms: (d) => <Platforms d={d} />,
  howwework: (d) => <HowWeWork d={d} />,
  whatwemake: (d) => <WhatWeMake d={d} />,
  threeways: (d) => <ThreeWays d={d} />,
  metrics: (d) => <Metrics d={d} />,
  ...sharedBands("social-content"),
};

export default function SocialBands({ sections = [], faqs = {} }) {
  return <SiteBands sections={sections} bands={BANDS} ctx={{ faqs }} />;
}
