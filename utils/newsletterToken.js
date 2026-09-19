// utils/newsletterToken.js — the signature on an unsubscribe link.
//
// The link in a newsletter mail carries the address in the open, so it needs a
// signature next to it; without one anybody could unsubscribe anybody by
// editing the URL. Same secret, same address, same token — no extra column and
// nothing to look up.
import crypto from "crypto";

const SECRET =
  process.env.NEWSLETTER_SECRET ||
  process.env.NEXTAUTH_SECRET ||
  "viralon_newsletter_2026";

export function signEmail(email) {
  return crypto
    .createHmac("sha256", SECRET)
    .update(String(email || "").trim().toLowerCase())
    .digest("hex")
    .slice(0, 32);
}

export function verifyEmail(email, token) {
  const expected = signEmail(email);
  const given = String(token || "");
  if (given.length !== expected.length) return false;
  // Constant time, so a wrong token can't be guessed a character at a time.
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(given));
}
