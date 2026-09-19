// pages/api/newsletter/unsubscribe.js — the link at the bottom of every
// newsletter mail. One click, no login, no form: the address and its signature
// are in the URL, and the row is marked unsubscribed rather than deleted so HQ
// still knows they were once on the list.
//
// GET renders the confirmation page itself. POST is here for mail clients that
// prefer the one-click header (RFC 8058), which sends a POST, not a GET.
import dbConnect from "../../../utils/dbConnect";
import Newsletter from "../../../models/Newsletter";
import { verifyEmail } from "../../../utils/newsletterToken";

function page(title, body) {
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>${title} — Viralon</title>
<style>
  body { margin:0; min-height:100vh; display:grid; place-items:center; padding:24px;
         background:#0d0b10; color:#fff; font-family:Inter,system-ui,-apple-system,sans-serif; }
  .box { max-width:460px; text-align:center; }
  h1 { margin:0 0 12px; font-size:26px; font-weight:800; letter-spacing:-0.4px; }
  p  { margin:0 0 22px; font-size:15px; line-height:1.65; color:rgba(255,255,255,.72); }
  a  { display:inline-block; padding:12px 26px; border-radius:999px; background:#FE4601;
       color:#fff; font-weight:700; font-size:14px; text-decoration:none; }
</style>
</head><body><div class="box">${body}<a href="/">Back to viralon.in</a></div></body></html>`;
}

export default async function handler(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(405).end();
  }

  const email = String(req.query.e || req.body?.e || "").trim().toLowerCase();
  const token = String(req.query.t || req.body?.t || "");

  const html = (code, title, body) => {
    // A one-click client wants a status, not a page.
    if (req.method === "POST") return res.status(code).json({ success: code < 400 });
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return res.status(code).send(page(title, body));
  };

  if (!email || !verifyEmail(email, token)) {
    return html(400, "Link expired",
      `<h1>This link didn't work</h1><p>It looks incomplete or out of date. Write to
       info@viralon.in and we'll take you off the list by hand.</p>`);
  }

  try {
    await dbConnect();
    const row = await Newsletter.findOne({ email });
    if (!row) {
      return html(200, "Not on the list",
        `<h1>You're not on our list</h1><p>Nothing to remove — this address isn't
         subscribed to the Viralon newsletter.</p>`);
    }
    if (row.status !== "unsubscribed") {
      row.status = "unsubscribed";
      row.unsubscribedAt = new Date();
      await row.save();
    }
    return html(200, "Unsubscribed",
      `<h1>You're unsubscribed</h1><p>We've removed <b>${email}</b> from the Viralon
       newsletter. No more mails from us unless you sign up again.</p>`);
  } catch (err) {
    console.error("Newsletter unsubscribe failed:", err);
    return html(500, "Something went wrong",
      `<h1>Something went wrong</h1><p>Please try the link again in a minute, or
       write to info@viralon.in.</p>`);
  }
}
