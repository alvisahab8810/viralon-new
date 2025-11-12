// pages/api/admin/getLeads.js
import dbConnect from "@/utils/dbConnect";
import LandingLeads from "@/models/LandingLeads";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
    await dbConnect();

    // optional filter by form name
    const { form } = req.query;
    const filter = form ? { formIdentifier: form } : {};

    const leads = await LandingLeads.find(filter).sort({ createdAt: -1 });

    res.status(200).json({ success: true, leads });
  } catch (err) {
    console.error("Error fetching leads:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
