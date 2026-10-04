// utils/sitePageContent.js — one menu page's band list, for its page file.
//
// The record is written by the CRM (Website → Pages → the page's own screen)
// into the shared "sitepages" collection. Nothing stored, or a DB hiccup,
// falls back to the shipped order with no data, so every component renders
// the copy written in its own file and the page can never go blank.
import dbConnect from "./dbConnect";
import SitePage from "../models/SitePage";
import { schemaFor } from "./pageSchemas";

export async function getSiteSections(pageKey) {
  const schema = schemaFor(pageKey);
  if (!schema) return [];
  try {
    await dbConnect();
    const doc = await SitePage.findOne({ key: pageKey }).lean();
    if (!doc?.sections?.length) return schema.fallbackSections();
    // Cleaned on the way out as well as on the way in: a record saved before
    // a band gained a field still renders, and a key nobody declares cannot
    // reach a component.
    return JSON.parse(JSON.stringify(schema.cleanSections(doc.sections)));
  } catch {
    return schema.fallbackSections();
  }
}
