




import { getToken } from "next-auth/jwt";
import mongoose from "mongoose";
import dbConnect from "../../../utils/dbConnect";
import Query from "../../../models/Query";
import { mailTransport, mailConfigured, MAIL_FROM } from "../../../utils/mailer";

const secret = process.env.NEXTAUTH_SECRET;

const escapeRe = (v) => String(v).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/* The visitor's copy of what they just sent.
   Fired but never awaited, so the thank-you shows instantly instead of waiting
   on the SMTP handshake. It reads back every answer the form took, so the
   person has a record of it and can correct anything by replying -- the reply
   lands on info@viralon.in, where the team already works.
   Plain text goes with the HTML for clients that refuse it. */
// Mail can only load an image over a public URL, so the header points at the
// wordmark already live on the site -- the same file hq.viralon.in puts on
// its lead mails.
const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://viralon.in";
const LOGO = `${SITE}/assets/images/brand-logo.png`;

const esc = (v) =>
  String(v == null ? "" : v)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function sendThankYou(lead) {
  const { name, email, phone, businessName, runningAds, formType } = lead || {};
  if (!email || !mailConfigured) return;

  const first = String(name || "").trim().split(/\s+/)[0] || "there";

  // Only the answers that exist, in the order the form asks them.
  const rows = [
    ["Name", name],
    ["Business name", businessName],
    ["Email", email],
    ["Phone", phone ? `+91 ${phone}` : ""],
    ["Running ads at the moment", runningAds],
    ["Enquired from", formType],
  ].filter(([, v]) => String(v || "").trim());

  const rowsHtml = rows
    .map(
      ([k, v]) => `
        <tr>
          <td style="padding:9px 0;color:#6B6B76;font-size:13px;width:190px;vertical-align:top;">${esc(k)}</td>
          <td style="padding:9px 0;color:#14121F;font-size:14px;font-weight:600;">${esc(v)}</td>
        </tr>`
    )
    .join("");

  const html = `
<div style="background:#F4F4F6;padding:28px 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #E7E7EC;">
    <tr>
      <td style="background:#19132F;padding:26px 32px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr>
          <td valign="middle" width="76" style="width:76px;">
            <img src="${LOGO}" width="76" alt="Viralon" style="display:block;border:0;outline:none;width:76px;max-width:76px;height:auto;" />
          </td>
          <td valign="middle" align="right" style="color:#ffffff;font-size:22px;font-weight:700;line-height:28px;padding-left:16px;">We have your enquiry</td>
        </tr></table>
      </td>
    </tr>

    <tr>
      <td style="padding:28px 32px 6px;">
        <p style="margin:0 0 14px;color:#14121F;font-size:15px;line-height:24px;">Hi ${esc(first)},</p>
        <p style="margin:0 0 14px;color:#3F3D4A;font-size:15px;line-height:24px;">
          Thank you for getting in touch with Viralon. Your enquiry has reached our team
          and someone will call you on the number below within one working day to
          understand what you need and tell you honestly where we would start.
        </p>
        <p style="margin:0 0 22px;color:#3F3D4A;font-size:15px;line-height:24px;">
          Here is what you sent us, so you have it on record:
        </p>
      </td>
    </tr>

    <tr>
      <td style="padding:0 32px;">
        <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#FAFAFB;border:1px solid #EDEDF1;border-radius:10px;padding:6px 18px;">
          ${rowsHtml}
        </table>
      </td>
    </tr>

    <tr>
      <td style="padding:22px 32px 4px;">
        <p style="margin:0 0 14px;color:#3F3D4A;font-size:15px;line-height:24px;">
          If anything above is wrong, simply reply to this email and we will correct it.
          Anything you would like us to look at before the call &mdash; your website, your ad
          account, a deck &mdash; is welcome in the same reply.
        </p>
        <p style="margin:0 0 4px;color:#14121F;font-size:15px;line-height:24px;">Regards,</p>
        <p style="margin:0 0 24px;color:#14121F;font-size:15px;line-height:24px;font-weight:700;">Team Viralon</p>
      </td>
    </tr>
  </table>
</div>`;

  const text = [
    `Hi ${first},`,
    "",
    "Thank you for getting in touch with Viralon. Your enquiry has reached our team",
    "and someone will call you within one working day.",
    "",
    "What you sent us:",
    ...rows.map(([k, v]) => `  ${k}: ${v}`),
    "",
    "If anything above is wrong, simply reply to this email and we will correct it.",
    "",
    "Regards,",
    "Team Viralon",
  ].join("\n");

  try {
    mailTransport()
      .sendMail({
        from: MAIL_FROM,
        to: email,
        replyTo: "info@viralon.in",
        subject: `We have your enquiry, ${first} — Viralon`,
        text,
        html,
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
    const { name, email, phone, businessName, formType, runningAds, source } = req.body || {};

    /* ── bot guards ──────────────────────────────────────────────────────
       1. honeypot: a field hidden from people, so only scripts fill it in
       2. speed: nobody types five fields in under 2.5 seconds
       3. throttle: same IP, more than 10 leads saved in an hour             */
    /* Chrome autofill and password managers used to drop the visitor's own
       email into the honeypot, and a real lead was answered with a 400. The
       field is hidden properly now (see .vl-hp in custome.css), and a value
       that merely repeats something the visitor typed here is treated as that
       same autofill, not as a bot. Anything else — a link, a pitch — is a
       script filling in a field no person can see. */
    const trap = String(req.body?.website || "").trim();
    const typedHere = [name, email, phone, businessName]
      .map((v) => String(v || "").trim().toLowerCase())
      .filter(Boolean);
    if (trap && !typedHere.includes(trap.toLowerCase())) {
      console.warn("[query] rejected: honeypot filled =", JSON.stringify(trap));
      return res.status(400).json({ success: false, message: "Something went wrong. Please try again." });
    }
    /* The clock starts when the form mounts. Under a second and a half nobody
       typed five fields. Above that it goes through, because a remount — dev
       Fast Refresh, a re-opened popup, a back/forward restore — restarts the
       clock on somebody who was already typing, and that was costing real
       leads. The wording is its own so a person knows what to do, and so the
       terminal says which guard fired. */
    const elapsed = Number(req.body?.elapsed);
    if (elapsed < 1500) {
      console.warn("[query] rejected: too fast, elapsed =", req.body?.elapsed);
      return res.status(400).json({
        success: false,
        message: "That went through a little too quickly. Please send it once more.",
      });
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
        runningAds: runningAds || "",
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
      sendThankYou({
        name,
        email: cleanEmail,
        phone: cleanPhone,
        businessName,
        runningAds: runningAds || "",
        formType: formType || "Query Form",
      });

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
