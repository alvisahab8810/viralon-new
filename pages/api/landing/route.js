import dbConnect from "@/utils/dbConnect";
import LandingLead from "@/models/LandingLead";

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

export async function POST(req) {
  try {
    await dbConnect();

    // get submitted data
    const data = await req.json();

    // extract form identifier from the hidden input in your form
    const formIdentifier = data.formIdentifier || "unknown";
    const formName = getFormName(formIdentifier);

    // create new document
    const lead = new LandingLead({
      ...data,
      formIdentifier,
      formName,
      raw: data,
    });

    // save to MongoDB
    await lead.save();

    return Response.json({
      success: true,
      message: `${formName} submitted successfully!`,
    });
  } catch (err) {
    console.error("Error saving form submission:", err);
    return Response.json(
      {
        success: false,
        message: "Server error, please try again later.",
      },
      { status: 500 }
    );
  }
}
