import fs   from "fs";
import path from "path";

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads", "blogs");

function findOnFilesystem(id) {
  const safeName = id.replace(/[^a-z0-9._-]/gi, "_").slice(0, 200);
  if (!fs.existsSync(UPLOADS_DIR)) return null;

  // Try: safeName already contains the extension
  const direct = path.join(UPLOADS_DIR, safeName);
  if (fs.existsSync(direct)) {
    const ext = path.extname(safeName).slice(1).toLowerCase();
    const contentType = ext === "svg" ? "image/svg+xml"
      : ext === "jpg" || ext === "jpeg" ? "image/jpeg"
      : `image/${ext || "jpeg"}`;
    return { buf: fs.readFileSync(direct), contentType };
  }

  // Try: append common extensions
  for (const ext of ["jpg", "jpeg", "png", "webp", "gif", "svg"]) {
    const fp = path.join(UPLOADS_DIR, `${safeName}.${ext}`);
    if (fs.existsSync(fp)) {
      const contentType = ext === "svg" ? "image/svg+xml"
        : ext === "jpg" || ext === "jpeg" ? "image/jpeg"
        : `image/${ext}`;
      return { buf: fs.readFileSync(fp), contentType };
    }
  }
  return null;
}

export default function handler(req, res) {
  const { id } = req.query;
  if (!id) return res.status(400).end();

  const found = findOnFilesystem(id);
  if (found) {
    res.setHeader("Content-Type", found.contentType);
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    return res.end(found.buf);
  }

  return res.status(404).end();
}
