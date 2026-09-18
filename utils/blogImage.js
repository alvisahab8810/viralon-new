// utils/blogImage.js — makes a stored blog image URL safe to put in <img src>.
//
// Some blog records were saved while the admin panel was running on a dev
// machine, so their cover URL is an absolute one pointing at the uploader's own
// computer (http://localhost:3002/uploads/...). On a live domain the browser
// treats that as the page reaching into the visitor's own device: Chrome then
// shows the "wants to access other apps and services on this device" permission
// prompt, and the image never loads either way.
//
// So any URL whose host is the local machine or a private LAN address is cut
// down to its path, which the site serves itself (or which simply 404s and
// falls back to the placeholder). Every other URL is returned untouched, so
// real CDN and production URLs are unaffected.
const LOCAL_HOST =
  /^https?:\/\/(localhost|127(?:\.\d+){3}|\[?::1\]?|0\.0\.0\.0|10(?:\.\d+){3}|192\.168(?:\.\d+){2}|172\.(?:1[6-9]|2\d|3[01])(?:\.\d+){2})(?::\d+)?(?=\/|$)/i;

export default function blogImage(src) {
  if (!src || typeof src !== "string") return src;
  if (!LOCAL_HOST.test(src)) return src;
  const path = src.replace(LOCAL_HOST, "");
  return path.startsWith("/") ? path : "/" + path;
}
