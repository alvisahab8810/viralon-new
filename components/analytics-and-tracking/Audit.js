// components/analytics-and-tracking/Audit.js — the closing band on
// /analytics-and-tracking.
//
// The ask, set as large as the band allows, with the artwork running off the
// right edge behind it: the image is decorative and deliberately cropped by
// the section, which is why it is an empty alt and sits under the copy in the
// stacking order rather than beside it in the flow.
//
// The button opens the enquiry popup like every other call on the site, and
// keeps /contact-us as its href so it still works with JavaScript off.
//
// Styles live at the end of custome.css, responsive steps at the end of
// responsive.css.
import React from "react";
import Link from "next/link";
import { openEnquiry } from "../common/EnquiryPopup";

export default function Audit() {
  return (
    <section className="ant-audit">
      <img
        className="ana-art"
        src="/assets/others/start-abt.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
      />

      <div className="container">
        <div className="ana-text">
          <h2 className="ana-heading">
            Start with one question you cannot answer.
          </h2>

          <p className="ana-note">
            Tell us the decision you are stuck on. We will tell you whether it
            is a tracking problem, a modelling problem, or a question only a
            holdout test can settle.
          </p>

          <Link
            href="/contact-us"
            className="ana-cta"
            onClick={(e) => {
              e.preventDefault();
              openEnquiry();
            }}
          >
            Request an audit
          </Link>
        </div>
      </div>
    </section>
  );
}
