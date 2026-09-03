




import { getToken } from "next-auth/jwt";
import mongoose from "mongoose";
import dbConnect from "../../../utils/dbConnect";
import Query from "../../../models/Query";
import nodemailer from "nodemailer";

const secret = process.env.NEXTAUTH_SECRET;

const escapeRe = (v) => String(v).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/* Thank-you mail — fired but never awaited, so the visitor sees the thank-you
   instantly instead of waiting on the SMTP handshake. */
function sendThankYou(name, email) {
  if (!email) return;
  try {
    nodemailer
      .createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true,
        auth: { user: "info@viralon.in", pass: process.env.EMAIL_PASS },
      })
      .sendMail({
        from: '"Viralon" <info@viralon.in>',
        to: email,
        subject: "Thank you for your query!",
        html: `<p>Hi ${name},</p><p>Thanks for reaching out. We’ll contact you soon.</p><p>Regards,<br/>Team Viralon</p>`,
      })
      .catch((e) => console.error("Query mail failed:", e?.message));
  } catch (e) {
    console.error("Query mail failed:", e?.message);
  }
}

/* Simple in-memory throttle: one IP can't spray the form.
   Only *saved* leads count — a typo, a duplicate or a rejected bot attempt
   must never eat a real visitor's quota. Local/dev traffic is exempt so
   testing the form doesn't lock you out. */
const HITS = new Map();
const HOUR = 60 * 60 * 1000;
const MAX_PER_HOUR = 10;

const isLocal = (ip) =>
  process.env.NODE_ENV !== "production" ||
  ip === "unknown" || ip === "::1" || ip === "127.0.0.1" || ip.startsWith("::ffff:127.");

function recentCount(ip) {
  const now = Date.now();
  const recent = (HITS.get(ip) || []).filter((t) => now - t < HOUR);
  if (recent.length) HITS.set(ip, recent);
  else HITS.delete(ip);
  return recent.length;
}

function recordHit(ip) {
  if (isLocal(ip)) return;
  if (HITS.size > 5000) HITS.clear();
  HITS.set(ip, [...(HITS.get(ip) || []), Date.now()]);
}

export default async function handler(req, res) {
  await dbConnect();

  /* ───────────────────────── POST: save query + email ───────────────────── */
  if (req.method === "POST") {
    const { name, email, phone, businessName, formType, budget, source } = req.body || {};

    /* ── bot guards ──────────────────────────────────────────────────────
       1. honeypot: a field hidden from people, so only scripts fill it in
       2. speed: nobody types five fields in under 2.5 seconds
       3. throttle: same IP, more than 10 leads saved in an hour             */
    if (req.body?.website) {
      return res.status(400).json({ success: false, message: "Something went wrong. Please try again." });
    }
    if (Number(req.body?.elapsed) < 2500) {
      return res.status(400).json({ success: false, message: "Something went wrong. Please try again." });
    }
    const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim() || req.socket?.remoteAddress || "unknown";
    if (!isLocal(ip) && recentCount(ip) >= MAX_PER_HOUR) {
      return res.status(429).json({ success: false, message: "Too many requests. Please try again later." });
    }

    const cleanEmail = String(email || "").trim().toLowerCase();
    const cleanPhone = String(phone || "").replace(/\D/g, "");

    if (!String(name || "").trim() || !String(businessName || "").trim()) {
      return res.status(400).json({ success: false, message: "Please fill in all required fields." });
    }
    if (!/^\S+@\S+\.\S+$/.test(cleanEmail)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email address." });
    }
    if (cleanPhone.length !== 10) {
      return res.status(400).json({ success: false, message: "Phone number must be exactly 10 digits." });
    }

    try {
      /* one enquiry per email / phone — the team already has this lead */
      const existing = await Query.findOne({
        $or: [
          { email: { $regex: `^${escapeRe(cleanEmail)}$`, $options: "i" } },
          { phone: { $in: [cleanPhone, `+91${cleanPhone}`, `91${cleanPhone}`] } },
        ],
      })
        .select("_id email phone")
        .lean();

      if (existing) {
        const sameEmail = String(existing.email || "").toLowerCase() === cleanEmail;
        return res.status(409).json({
          success: false,
          code: "DUPLICATE",
          field: sameEmail ? "email" : "phone",
          message: sameEmail
            ? "This email has already sent us a request — our team will be in touch shortly."
            : "This phone number has already sent us a request — our team will be in touch shortly.",
        });
      }

      const newQuery = await Query.create({
        name,
        email: cleanEmail,
        phone: cleanPhone,
        businessName,
        budget: budget || "",
        formType: formType || "Query Form",
        source: {
          gclid:       source?.gclid       || "",
          fbclid:      source?.fbclid      || "",
          utmSource:   source?.utmSource   || "",
          utmMedium:   source?.utmMedium   || "",
          utmCampaign: source?.utmCampaign || "",
          utmTerm:     source?.utmTerm     || "",
          utmContent:  source?.utmContent  || "",
          landingPage: source?.landingPage || "",
          referrer:    source?.referrer    || "",
        },
      });

      recordHit(ip);
      sendThankYou(name, cleanEmail);

      return res
        .status(201)
        .json({ success: true, message: "Query saved!", queryId: newQuery._id });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  /* ───────────────────────── GET: list queries ──────────────────────────── */
  if (req.method === "GET") {
    try {
      const token  = await getToken({ req, secret });
      const legacy = (req.headers.cookie || "").includes("admin_auth=true");

      if (!token && !legacy) {
        return res.status(401).json({ message: "Unauthorised" });
      }

      const filter = { formType: { $regex: /query/i } };

      /* salesperson → restrict to own leads */
      if (token?.role === "salesperson") {
        filter.salespersonId = new mongoose.Types.ObjectId(token.id || token.sub);
      }

      /* admin (token.role === "admin"  OR legacy cookie) → no extra filter */
      const queries = await Query.find(filter).sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: queries });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ success: false, message: "Failed to fetch" });
    }
  }

  res.status(405).json({ message: "Method Not Allowed" });
}
