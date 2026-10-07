// components/blogs/LatestArticles.js — the /blogs listing.
//
// Two columns of cards on the dark ground. The "Ready to collaborate" band is
// the shared <CTA /> every other page carries, so it sits in the page below
// this section rather than inside the grid. The posts come from /api/blogs
// exactly as they did before; only the markup around them is new.
//
// Styles live at the end of custome.css, responsive steps at the end of
// responsive.css, every rule prefixed .blogs-latest.
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import blogImage from "../../utils/blogImage";

// Shown when a card has no cover, or when its cover URL does not load.
const FALLBACK_THUMB = "/assets/img/seo/blogs/1.jpg";

const LIMIT = 8;

function formatDate(d) {
  if (!d) return "";
  const dt = new Date(d);
  if (isNaN(dt)) return d;
  return dt.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

// Categories first, then tags, because a category is the more useful label of
// the two. Three is as many as the card has room for.
const chipsFor = (blog) =>
  [...new Set([...(blog.categories || []), ...(blog.tags || [])])]
    .filter(Boolean)
    .slice(0, 3);

export default function LatestArticles() {
  const router = useRouter();
  const [blogs, setBlogs] = useState([]);
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [tag, setTag] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async (t, p) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: p, limit: LIMIT });
      if (t) params.set("tag", t);
      const r = await fetch(`/api/blogs?${params}`);
      const data = await r.json();
      setBlogs(data.blogs || []);
      setPages(data.pages || 1);
    } catch {
      setBlogs([]);
    }
    setLoading(false);
  }, []);

  // A ?tag= in the URL filters the list; the rest of the page is unaware.
  useEffect(() => {
    if (!router.isReady) return;
    const urlTag = router.query.tag || "";
    setTag(urlTag);
    setPage(1);
    load(urlTag, 1);
  }, [router.isReady, router.query.tag, load]);

  function handlePage(p) {
    setPage(p);
    load(tag, p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function clearTag() {
    setTag("");
    setPage(1);
    load("", 1);
    router.push("/blogs", undefined, { shallow: true });
  }

  const cards = [];
  blogs.forEach((blog, i) => {
    const img = blogImage(blog.cardImage?.src || blog.coverImage?.src);
    const chips = chipsFor(blog);
    const date = formatDate(blog.publishDate || blog.createdAt);

    cards.push(
      <li className="bll-item" key={blog.id || i}>
        <Link href={`/blogs/${blog.slug}`} className="bll-card">
          <span className="bll-media">
            <img
              src={img || FALLBACK_THUMB}
              alt={blog.cardImage?.alt || blog.title}
              loading="lazy"
              onError={(e) => {
                if (e.currentTarget.src.endsWith(FALLBACK_THUMB)) return;
                e.currentTarget.src = FALLBACK_THUMB;
              }}
            />
          </span>

          <span className="bll-body">
            <span className="bll-title">{blog.title}</span>

            {blog.summary ? (
              <span className="bll-excerpt">{blog.summary}</span>
            ) : null}

            {chips.length ? (
              <span className="bll-chips">
                {chips.map((c, n) => (
                  <span className="bll-chip" key={n}>
                    {c}
                  </span>
                ))}
              </span>
            ) : null}

            <span className="bll-meta">
              {date ? <span>{date}</span> : null}
              {date && blog.readMins ? <span className="bll-dot" /> : null}
              {blog.readMins ? <span>{blog.readMins} min read</span> : null}
            </span>
          </span>
        </Link>
      </li>
    );
  });

  return (
    <section className="blogs-latest">
      <div className="container">
        <div className="bll-head">
          <h1 className="bll-heading">Latest articles</h1>
          {tag ? (
            <p className="bll-filter">
              Tagged <span className="bll-filter-tag">#{tag}</span>
              <button type="button" className="bll-filter-clear" onClick={clearTag}>
                Clear
              </button>
            </p>
          ) : null}
        </div>

        {loading ? (
          <p className="bll-state">Loading articles…</p>
        ) : !blogs.length ? (
          <p className="bll-state">No articles published yet. Check back soon.</p>
        ) : (
          <ul className="bll-grid">{cards}</ul>
        )}

        {pages > 1 ? (
          <div className="bll-pagination">
            <button
              type="button"
              className="bll-pag-btn"
              onClick={() => handlePage(page - 1)}
              disabled={page === 1}
              aria-label="Previous page"
            >
              <MdChevronLeft size={18} />
            </button>
            {Array.from({ length: pages }, (_, i) => i + 1).map((n) => (
              <button
                type="button"
                key={n}
                className={`bll-pag-btn${page === n ? " is-on" : ""}`}
                onClick={() => handlePage(n)}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              className="bll-pag-btn"
              onClick={() => handlePage(page + 1)}
              disabled={page >= pages}
              aria-label="Next page"
            >
              <MdChevronRight size={18} />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
