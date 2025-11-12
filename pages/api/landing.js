import dbConnect from "@/utils/dbConnect";
import LandingLeads from "@/models/LandingLeads";

function getFormName(formIdentifier) {
  switch (formIdentifier) {
    case "form1":
      return "Query Form";
    case "form2":
      return "Contact Form";
    case "form3":
      return "Popup Form";
    default:
      return "Unknown Form";
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await dbConnect();

      const data = req.body || {};
      const formIdentifier = data.formIdentifier || "unknown";
      const formName = getFormName(formIdentifier);

      const lead = new LandingLeads({
        ...data,
        formIdentifier,
        formName,
        raw: data,
      });

      await lead.save();

      return res
        .status(200)
        .json({ success: true, message: `${formName} submitted successfully!` });
    } catch (error) {
      console.error("Error saving form:", error);
      return res
        .status(500)
        .json({ success: false, message: "Server error, please try again later." });
    }
  } else {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
