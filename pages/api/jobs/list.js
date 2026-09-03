// pages/api/jobs/list.js — public list of OPEN career positions for the
// /jobs page. Posts are created/edited from the payroll admin (shared Mongo).
import dbConnect from "../../../utils/dbConnect";
import JobPost from "../../../models/JobPost";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }
  try {
    await dbConnect();
    const posts = await JobPost.find({ status: "open" })
      .sort({ order: 1, createdAt: 1 })
      .select("title slug category jobType experience highlights image createdAt")
      .lean();
    return res.status(200).json({ success: true, data: posts });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}
