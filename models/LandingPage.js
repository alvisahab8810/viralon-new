// models/LandingPage.js — SEO landing pages. Managed (create/edit/publish)
// from the payroll admin's Website → SEO Pages section; this app only READS
// them to render /<slug> through the root-level catch-all pages/[slug].js.
// Static site pages always win over the catch-all, so these can never shadow
// an existing page.
// IMPORTANT: keep this schema identical to viralon-payroll/models/LandingPage.js —
// both apps share the same Mongo "landingpages" collection.

import mongoose from "mongoose";

const LandingPageSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },              // internal name + H1 fallback
    slug: { type: String, required: true, unique: true }, // URL path: viralon.in/<slug>
    template: { type: String, required: true, default: "spotlight" }, // key from components/landing registry

    // SEO meta
    seoTitle: { type: String, default: "" },
    seoDescription: { type: String, default: "" },
    seoKeywords: { type: String, default: "" },

    // Per-template content object (hero, intro, features, stats, gallery,
    // faqs, quote, closing, showLeadForm…). Rendered by components/landing.
    content: { type: mongoose.Schema.Types.Mixed, default: {} },

    status: { type: String, enum: ["draft", "published"], default: "draft" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// In dev, hot reloads can leave a stale compiled model (old schema) cached on
// the mongoose global — drop it so schema edits always take effect without a
// server restart.
if (process.env.NODE_ENV !== "production" && mongoose.models.LandingPage) {
  delete mongoose.models.LandingPage;
}

export default mongoose.models.LandingPage || mongoose.model("LandingPage", LandingPageSchema);
