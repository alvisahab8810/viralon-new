// models/PageSeo.js — read side of the per-page SEO record.
// IMPORTANT: keep this schema identical to viralon-payroll/models/PageSeo.js —
// both apps share the same Mongo "pageseos" collection (payroll writes, this
// site reads it in getStaticProps via utils/pageSeo.js).
import mongoose from "mongoose";

// Explicit subdocument schema: a field named "type" would otherwise be read as
// a discriminator key (the same trick models/Blog.js uses).
const SchemaBlockSchema = new mongoose.Schema(
  {
    type: { type: String, default: "WebPage" },
    content: { type: String, default: "" },
  },
  { _id: false }
);

export const DEFAULT_ROBOTS =
  "index, follow, max-image-preview:large, max-snippet:-1";

const PageSeoSchema = new mongoose.Schema(
  {
    pageKey: { type: String, required: true, unique: true, index: true },
    pageLabel: { type: String, default: "" },
    path: { type: String, default: "" },

    title: { type: String, default: "" },
    metaKeywords: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    canonical: { type: String, default: "" },

    ogTitle: { type: String, default: "" },
    ogDescription: { type: String, default: "" },
    ogImage: { type: String, default: "" },
    twitterCard: { type: String, default: "summary_large_image" },

    metaRobots: { type: String, default: DEFAULT_ROBOTS },
    xRobotsTag: { type: String, default: DEFAULT_ROBOTS },

    schemas: { type: [SchemaBlockSchema], default: [] },

    status: { type: String, enum: ["draft", "published"], default: "published" },
  },
  { timestamps: true }
);

// In dev, hot reloads can leave a stale compiled model cached on the mongoose
// global — drop it so schema edits always take effect.
if (process.env.NODE_ENV !== "production" && mongoose.models.PageSeo) {
  delete mongoose.models.PageSeo;
}

export default mongoose.models.PageSeo || mongoose.model("PageSeo", PageSeoSchema);
