// utils/openJobs.js — the open roles, read straight from the shared DB.
//
// /api/jobs/list serves the same rows to the browser; this is the same query
// for a page that wants them at build time instead, so /career can print the
// cards in the server's markup rather than filling them in after mount.
//
// A DB hiccup must never break the build or the page: it returns an empty
// list, and <Openings /> then renders nothing rather than an error.
import dbConnect from "./dbConnect";
import JobPost from "../models/JobPost";

export async function getOpenJobs() {
  try {
    await dbConnect();
    const posts = await JobPost.find({ status: "open" })
      .sort({ order: 1, createdAt: 1 })
      .select("title slug category jobType experience image")
      .lean();
    return JSON.parse(JSON.stringify(posts));
  } catch {
    return [];
  }
}
