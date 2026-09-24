// pages/api/newsletter/subscribe.js — the footer's "Join our subscribers list".
//
// Saves the address into the shared Mongo "newsletters" collection, which HQ
// reads at hq.viralon.in → Website → Newsletter, and sends the person a
// welcome mail. It is deliberately the same shape as
// /api/queries/query (honeypot, speed check, per-IP throttle, friendly
// duplicate message) so the two public forms behave the same way.
import dbConnect from "../../../utils/dbConnect";
import Newsletter from "../../../models/Newsletter";
import { signEmail } from "../../../utils/newsletterToken";
import { mailTransport, mailConfigured, MAIL_FROM } from "../../../utils/mailer";

const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://viralon.in";

/* Welcome mail — fired, never awaited, so the footer says "you're in" straight
   away instead of waiting on the SMTP handshake.
   Same card as the enquiry acknowledgement (pages/api/queries/query.js): one
   purple header with the wordmark on a white chip, then the message. The
   unsubscribe link is no longer written on the page -- it travels in the
   List-Unsubscribe header instead, where Gmail turns it into its own
   "Unsubscribe" button beside the sender name and mailbox providers look for
   it before deciding a bulk mail is not spam. */
// Mail can only load an image over a public URL, so this is the wordmark
// already live on the site.
const LOGO = `${SITE}/assets/images/brand-logo.png`;

function sendWelcome(email) {
  if (!email || !mailConfigured) return;
  const link = `${SITE}/api/newsletter/unsubscribe?e=${encodeURIComponent(email)}&t=${signEmail(email)}`;

  const html = `
<div style="background:#F4F4F6;padding:28px 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:620px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #E7E7EC;">
    <tr>
      <td style="background:#5138EE;background-image:linear-gradient(90deg,#5138EE,#7C5CFF);padding:26px 32px;">
        <img src="${LOGO}" width="76" alt="Viralon" style="display:block;border:0;outline:none;width:76px;max-width:76px;height:auto;" />
        <div style="color:#ffffff;font-size:22px;font-weight:700;margin-top:18px;">You're on the list</div>
      </td>
    </tr>

    <tr>
      <td style="padding:28px 32px 30px;">
        <p style="margin:0 0 14px;color:#14121F;font-size:15px;line-height:24px;">Hi,</p>
        <p style="margin:0 0 14px;color:#3F3D4A;font-size:15px;line-height:24px;">
          Thanks for subscribing. You'll get our latest work, marketing notes and
          offers &mdash; no noise, and never more than we'd want in our own inbox.
        </p>
        <p style="margin:0 0 22px;color:#3F3D4A;font-size:15px;line-height:24px;">
          Anything you'd like us to write about is welcome in a reply.
        </p>
        <p style="margin:0 0 4px;color:#14121F;font-size:15px;line-height:24px;">Regards,</p>
        <p style="margin:0;color:#14121F;font-size:15px;line-height:24px;font-weight:700;">Team Viralon</p>
      </td>
    </tr>
  </table>
</div>`;

  const text = [
    "Hi,",
    "",
    "Thanks for subscribing. You'll get our latest work, marketing notes and",
    "offers - no noise, and never more than we'd want in our own inbox.",
    "",
    "Anything you'd like us to write about is welcome in a reply.",
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
        subject: "You're on the Viralon list",
        text,
        html,
        // A one-click unsubscribe header keeps the mail out of spam folders.
        headers: { "List-Unsubscribe": `<${link}>` },
      })
      .catch((e) => console.error("Newsletter mail failed:", e?.message));
  } catch (e) {
    console.error("Newsletter mail failed:", e?.message);
  }
}

/* Per-IP throttle, in memory, same as the enquiry form: a script can't sign up
   a thousand addresses from one machine. Local/dev traffic is exempt. */
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
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { email, website, elapsed, source } = req.body || {};

  // Bot guards: a field people never see, and a form filled faster than anyone
  // can type. Both answer like an ordinary failure, so a script learns nothing.
  if (website) {
    return res.status(400).json({ success: false, message: "Something went wrong. Please try again." });
  }
  if (elapsed !== undefined && Number(elapsed) < 1200) {
    return res.status(400).json({ success: false, message: "Something went wrong. Please try again." });
  }

  const clean = String(email || "").trim().toLowerCase();
  if (!/^\S+@\S+\.\S+$/.test(clean)) {
    return res.status(400).json({ success: false, message: "Please enter a valid email address." });
  }

  const ip =
    (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
    req.socket?.remoteAddress ||
    "unknown";
  if (!isLocal(ip) && recentCount(ip) >= MAX_PER_HOUR) {
    return res.status(429).json({ success: false, message: "Too many requests. Please try again later." });
  }

  try {
    await dbConnect();

    const existing = await Newsletter.findOne({ email: clean });

    if (existing && existing.status === "subscribed") {
      // Not an error worth a red message — they are already on the list.
      return res.status(200).json({ success: true, already: true, message: "You're already on the list." });
    }

    const doc = {
      email: clean,
      status: "subscribed",
      channel: "website",
      source: {
        page:        String(source?.page || "").slice(0, 300),
        referrer:    String(source?.referrer || "").slice(0, 300),
        utmSource:   String(source?.utmSource || "").slice(0, 120),
        utmMedium:   String(source?.utmMedium || "").slice(0, 120),
        utmCampaign: String(source?.utmCampaign || "").slice(0, 120),
      },
      ip,
      userAgent: String(req.headers["user-agent"] || "").slice(0, 300),
      subscribedAt: new Date(),
      unsubscribedAt: null,
    };

    if (existing) {
      // They left once and have come back — same row, fresh date.
      Object.assign(existing, doc);
      await existing.save();
    } else {
      await Newsletter.create(doc);
    }

    recordHit(ip);
    sendWelcome(clean);

    return res.status(201).json({ success: true, message: "You're subscribed. Thank you!" });
  } catch (err) {
    // A racing double submit trips the unique index rather than the check above.
    if (err?.code === 11000) {
      return res.status(200).json({ success: true, already: true, message: "You're already on the list." });
    }
    console.error("Newsletter subscribe failed:", err);
    return res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
}
