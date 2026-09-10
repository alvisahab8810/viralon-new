// components/home/Form.js — the "READY TO COLLABORATE?" block.
// One step: capture the enquiry and say thanks. Nothing is booked here — the
// lead lands in the CRM (payroll → Website → Leads) and the team rings them,
// then fixes the meeting by hand. Design is unchanged — same bg-linear panel,
// same coral inputs, same white button.
import React, { useState, useEffect, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BUDGETS = [
  "Under ₹25,000",
  "₹25,000 to ₹75,000",
  "₹75,000 to ₹2,00,000",
  "Above ₹2,00,000",
];

/* Ad click ids + UTM tags from the landing URL, remembered for the session so
   they still travel with the lead if the visitor browses a few pages first.
   They go to the CRM with the lead and into the dataLayer for GTM. */
function readSource() {
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
function fireLead(payload) {
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

export default function Form({ variant = "dark" }) {
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    phone: "",
    email: "",
    budget: "",
    formType: "Query Form",
  });

  const [website, setWebsite] = useState("");   // honeypot — people never see it
  const openedAt = useRef(Date.now());
  const source   = useRef({});

  useEffect(() => { source.current = readSource(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Indian mobile — digits only, exactly 10.
    if (name === "phone") {
      setFormData({ ...formData, phone: value.replace(/\D/g, "").slice(0, 10) });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.businessName.trim() || !formData.phone || !formData.email.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (formData.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }
    // The CRM sizes the pipeline off this, so it can't be left blank.
    if (!formData.budget) {
      toast.error("Please pick your monthly marketing budget.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/queries/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          email: formData.email.trim(),
          website,
          elapsed: Date.now() - openedAt.current,
          source: source.current,
        }),
      });
      const data = await res.json();
      if (data.success) {
        fireLead({
          lead_id: data.queryId || "",
          budget: formData.budget || "",
          ...source.current,
        });
        setDone(true);
      } else {
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
    setSaving(false);
  };

  return (
    <div className="parallax-section">
      {/* The section itself is transparent, so it normally shows the page's
          `.bg-dark` wrapper around the coral panel. `variant="light"` paints
          a white ground instead -- opt-in, so the ten service pages that sit
          on dark are untouched. */}
      <section
        className={`form-section ${
          variant === "light" ? "form-section--light" : ""
        }`}
      >
        <div className="container bg-linear parallax-section ptb-80">
          <div className="form-container d-flex flex-column flex-md-row">
            <div className="form-image col-md-6 d-none d-md-block">
              <img src="/assets/img/home/cta.webp"></img>
            </div>
            <div className="form-content col-12 col-md-6 d-flex flex-column justify-content-center">
              {/* Figma's thin sweeping ellipse. It sits behind the copy and
                  runs out past the left edge of this column, over the coral
                  and across the collage. */}
              <img
                src="/assets/images/icons/circle-ellipse.svg"
                className="shape p-absolute"
                alt=""
                aria-hidden="true"
              />
              <h1 className="anton-regular vl-h1">READY TO COLLABORATE?</h1>
              <p className="vl-sub">LET'S TALK YOUR NEEDS</p>

              {!done ? (
                <form onSubmit={handleSubmit} className="vl-form">
                  <input type="hidden" name="formType" value="Query Form" />

                  {/* honeypot — off-screen, hidden from people and screen readers */}
                  <input
                    type="text"
                    name="website"
                    className="vl-hp"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />

                  <div className="form-group">
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                   <div className="form-group">
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                   <div className="form-group">
                    <input
                      type="tel"
                      name="phone"
                      inputMode="numeric"
                      maxLength={10}
                      className="form-control"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      name="businessName"
                      className="form-control"
                      placeholder="Business Name"
                      value={formData.businessName}
                      onChange={handleChange}
                    />
                  </div>
                 
                 
                  <div className="form-group">
                    <select
                      name="budget"
                      className="form-control vl-select"
                      value={formData.budget}
                      onChange={handleChange}
                    >
                      <option value="">Monthly Marketing Budget — Select a range</option>
                      {BUDGETS.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  <div className="vl-actions is-center">
                    <button type="submit" className="btn-submit vl-btn" disabled={saving}>
                      {saving ? "PLEASE WAIT…" : "SUBMIT"}
                    </button>
                  </div>
                  {/* <p className="vl-foot">
                    We'll call you within one working day
                  </p> */}
                </form>
              ) : (
                <div className="vl-thanks">
                  <p className="vl-note">
                    Thanks {formData.name.split(" ")[0]}! We've got your details and one of
                    our team will call you on <b>{formData.phone}</b> within one working day
                    to talk through what you need.
                  </p>
                </div>
              )}
            </div>

            <div className="form-image col-md-6 desktop-none pt-25">
              <img src="/assets/img/home/mobile-form.png"></img>
            </div>
          </div>
        </div>
      </section>

      <ToastContainer position="top-right" autoClose={3000} />

      <style jsx>{`

        /* Honeypot — visually gone, never focusable */
        .vl-hp {
          position: absolute !important;
          left: -9999px !important;
          width: 1px;
          height: 1px;
          opacity: 0;
          pointer-events: none;
        }

        .vl-actions {
          display: flex;
          align-items: stretch;
          gap: 10px;
          margin-top: 16px;
        }
        .vl-actions.is-center { justify-content: center; }

        .vl-foot {
          color: #ffffff !important;
          font-size: 10.5px !important;
          letter-spacing: 0.8px !important;
          opacity: 0.8;
          text-align: center;
          margin: 12px 0 0;
        }

        .vl-thanks { padding: 10px 0; }
        .vl-note {
          color: #ffffff;
          font-size: 15px !important;
          letter-spacing: 0.3px !important;
          line-height: 1.75;
          text-align: center;
          margin-bottom: 0;
        }

        @media (max-width: 991px) {
          .vl-h1 { font-size: 38px; }
        }
        @media (max-width: 575px) {
          .vl-h1 { font-size: 28px; }
          .vl-actions { gap: 8px; }
        }
      `}</style>

      <style jsx global>{`
        .vl-form .form-control { margin-bottom: 11px; }
        /* Native dropdown list stays readable — the closed control keeps the
           coral .form-control look from custome.css. */
        .vl-select { cursor: pointer; height:50px;}
        .vl-select option { color: #1d1d1d; background: #ffffff; }
        /* .btn-submit ships with margin:40px auto; inside .vl-actions the flex
           row does the centring, so the stray margins go. */
        .vl-actions .btn-submit.vl-btn {
          margin: 0;
          height: 44px;
          padding: 0 46px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 575px) {
          .vl-actions .btn-submit.vl-btn { padding: 0 34px; font-size: 13px; }
        }
      `}</style>
    </div>
  );
}
