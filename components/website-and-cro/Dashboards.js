// components/website-and-cro/Dashboards.js — the orange statement band on
// /website-and-cro.
//
// The /paid-ads orange band with this page's claim: one statement set as large
// as the band allows, one line under it turning the statement into the
// argument, nothing else. Same classes (.pa-dash / .pad-), same #FE4601
// ground; .wcro-dash is an empty handle.
import React from "react";

export default function Dashboards() {
  return (
    <section className="pa-dash wcro-dash">
      <div className="container">
        <h2 className="pad-heading">
          Doubling your conversion<br/> rate halves what a<br/> customer costs you.<br/>
          Without spending another<br/> dollar on traffic.
        </h2>

        <p className="pad-note">
          This is the only lever in marketing that works that way.
        </p>
      </div>
    </section>
  );
}
