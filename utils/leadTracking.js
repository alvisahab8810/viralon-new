// utils/leadTracking.js — the two things every lead form does besides saving:
// remember where the visitor came from, and announce the conversion.
//
// components/home/Form.js (the popup / "READY TO COLLABORATE?" form) carries its
// own copy of this logic and is deliberately left alone. This module exists so
// the contact page's form behaves identically without that file being edited.

/* Ad click ids + UTM tags from the landing URL, remembered for the session so
   they still travel with the lead if the visitor browses a few pages first.
   They go to the CRM with the lead and into the dataLayer for GTM. */
export function readSource() {
  if (typeof window === "undefined") return {};
  let stored = {};
  try { stored = JSON.parse(sessionStorage.getItem("vl_src") || "{}"); } catch { }
  const p = new URLSearchParams(window.location.search);
  const get = (k, was) => p.get(k) || was || "";
  const src = {
    gclid:       get("gclid", stored.gclid),
    fbclid:      get("fbclid", stored.fbclid),
    utmSource:   get("utm_source", stored.utmSource),
    utmMedium:   get("utm_medium", stored.utmMedium),
    utmCampaign: get("utm_campaign", stored.utmCampaign),
    utmTerm:     get("utm_term", stored.utmTerm),
    utmContent:  get("utm_content", stored.utmContent),
    landingPage: stored.landingPage || window.location.pathname,
    referrer:    stored.referrer || document.referrer || "",
  };
  try { sessionStorage.setItem("vl_src", JSON.stringify(src)); } catch { }
  return src;
}

/* Conversion signal. GTM (GTM-TFHSH9W4) is already on every page, so the
   Google Ads / Meta tags are configured there against this event; gtag/fbq are
   also called directly in case a pixel is added inline. */
export function fireLead(payload) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "viralon_lead", ...payload });
    if (typeof window.fbq === "function") window.fbq("track", "Lead");
    if (typeof window.gtag === "function") {
      const sendTo = process.env.NEXT_PUBLIC_GADS_LEAD;
      if (sendTo) window.gtag("event", "conversion", { send_to: sendTo });
      window.gtag("event", "generate_lead", payload);
    }
  } catch { }
}

/* The one qualifying question every form asks. Same wording and same order in
   all three (popup, contact page, blog sidebar), so the CRM sees one answer
   set and not three. */
export const RUNNING_ADS_LABEL = "Are you running ads at the moment?";

export const RUNNING_ADS = [
  "Yes, ourselves",
  "Yes, through an agency",
  "Not yet",
];
