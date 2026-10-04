// utils/homePage.js — the home page's band list, for pages/index.js.
//
// The record is written by the CRM (Website → Pages → Home page) into the
// shared "homepages" collection. Nothing stored, or a DB hiccup, falls back to
// the shipped order with no data, so every component renders the copy written
// in its own file and the home page can never go blank.
import dbConnect from "./dbConnect";
import HomePage from "../models/HomePage";
import { cleanSections, fallbackSections } from "./homeSchema";

export async function getHomeSections() {
  try {
    await dbConnect();
    const doc = await HomePage.findOne({ key: "home" }).lean();
    if (!doc?.sections?.length) return fallbackSections();
    // Cleaned on the way out as well as on the way in: a record saved before
    // a band gained a field still renders, and a key nobody declares cannot
    // reach a component.
    return JSON.parse(JSON.stringify(cleanSections(doc.sections)));
  } catch {
    return fallbackSections();
  }
}
