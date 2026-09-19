// utils/mailer.js — the one mail transport for the whole site.
//
// Same mailbox and the same env names as hq.viralon.in (viralon-payroll's
// utils/mailer.js), so both apps are configured identically and the mailbox is
// changed in one place per project.
//
// The site used to send through smtp.hostinger.com on info@viralon.in. That
// mailbox still accepts the login but refuses every send with
//   554 5.7.1 Outbound sending is disabled for this account
// which is a flag on the Hostinger account, not something code can lift. The
// domain's mail already lives at Google Workspace (viralon.in's MX points at
// ASPMX.L.GOOGLE.com), which is what payroll has been sending through all
// along -- so the site now uses it too.
//
//   EMAIL_HOST=smtp.gmail.com
//   EMAIL_PORT=465
//   EMAIL_SECURE=true
//   EMAIL_USER=sales@viralon.in
//   EMAIL_FROM_NAME=Viralon
//   EMAIL_PASS=<16-character Google App Password>
import nodemailer from "nodemailer";

export const MAIL_USER = process.env.EMAIL_USER || "info@viralon.in";
export const MAIL_NAME = process.env.EMAIL_FROM_NAME || "Viralon";
export const MAIL_FROM = `"${MAIL_NAME}" <${MAIL_USER}>`;

// Senders check this first, so a missing password is a quiet skip rather than
// a crash in the middle of a form submission.
export const mailConfigured = Boolean(process.env.EMAIL_PASS);

export function mailTransport() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || "smtp.gmail.com",
    port: Number(process.env.EMAIL_PORT || 465),
    secure: String(process.env.EMAIL_SECURE || "true") === "true",
    auth: { user: MAIL_USER, pass: process.env.EMAIL_PASS },
  });
}

export default mailTransport;
