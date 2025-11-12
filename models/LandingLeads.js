import mongoose from "mongoose";

const { Schema } = mongoose;

const LandingLeadSchema = new Schema(
  {
    // Identify which form the submission came from
    formIdentifier: {
      type: String,
      required: true,
      enum: ["form1", "form2", "form3"],
      index: true,
    },

    formName: {
      type: String,
      required: true,
      enum: ["Query Form", "Contact Form", "Popup Form"],
    },

    // ---------- Query Form Fields ----------
    fullName: { type: String, trim: true },          // name="fullName"
    country_code: { type: String, trim: true },      // name="country_code" (shared)
    mobileNumber: { type: String, trim: true },      // name="mobileNumber"
    email: { type: String, trim: true, lowercase: true }, // name="email"
    businessName: { type: String, trim: true },      // name="businessName"

    // ---------- Contact Form Fields ----------
    full_name: { type: String, trim: true },         // name="full_name"
    phone_number: { type: String, trim: true },      // name="phone_number"
    email_address: { type: String, trim: true, lowercase: true }, // name="email_address"
    your_message: { type: String, trim: true },      // name="your_message" (used for Business Name)

    // ---------- Popup Form Fields ----------
    fname: { type: String, trim: true },             // name="fname"
    fphone: { type: String, trim: true },            // name="fphone"
    femail: { type: String, trim: true, lowercase: true }, // name="femail"
    fbusinessName: { type: String, trim: true },     // name="fbusinessName"

    // ---------- Shared / generic ----------
    raw: { type: Schema.Types.Mixed, default: {} },  // stores the raw body
    ip: { type: String },
    userAgent: { type: String },
    status: {
      type: String,
      enum: ["new", "reviewed", "contacted", "closed"],
      default: "new",
    },
    notes: { type: String },
  },
  { timestamps: true }
);

LandingLeadSchema.index({ formIdentifier: 1, status: 1, createdAt: -1 });

export default mongoose.models.LandingLead ||
  mongoose.model("LandingLead", LandingLeadSchema);
