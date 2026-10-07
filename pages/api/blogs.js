import dbConnect from "@/utils/dbConnect";
import Blog from "@/models/Blog";

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).end();
  await dbConnect();

  const { search = "", category = "", tag = "", page = 1, limit = 9 } = req.query;
  const query = { status: "published" };

  if (search) {
    query.$or = [
      { title:   { $regex: search, $options: "i" } },
      { summary: { $regex: search, $options: "i" } },
    ];
  }
  if (category) query.categories = category;
  if (tag)      query.tags = tag;

  // The card shows a reading time, which nothing stores — it is counted from
  // the post's own words here and the body is dropped again before the
  // response is sent, so the payload stays the size it always was.
  const readMins = (html) => {
    const words = String(html || "")
      .replace(/<[^>]+>/g, " ")
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
  };

  const skip  = (Number(page) - 1) * Number(limit);
  const [blogs, total] = await Promise.all([
    Blog.find(query)
      .select("-schema")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit))
      .lean(),
    Blog.countDocuments(query),
  ]);

  return res.status(200).json({
    blogs: blogs.map(({ content, ...b }) => ({
      ...b,
      id: b._id,
      readMins: readMins(content),
    })),
    total,
    page:  Number(page),
    pages: Math.ceil(total / Number(limit)),
  });
}
