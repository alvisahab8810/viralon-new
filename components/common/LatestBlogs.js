// components/common/LatestBlogs.js — the "Latest Blogs" strip that closes the
// service pages.
//
// It replaces components/our-services/seo/Blogs.js, which was three hard-coded
// lorem-ipsum cards pointing at /assets/img/seo/blogs/*.jpg. This one reads the
// real posts from /api/blogs (same endpoint the /blogs listing uses) and reuses
// that page's card markup and stylesheet, so a post looks the same wherever it
// is shown.
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { MdArrowForward } from "react-icons/md";

const LIMIT = 3;

function formatDate(d) {
  if (!d) return "";
  const dt = new Date(d);
  if (isNaN(dt)) return d;
  return dt.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function LatestBlogs({
  title = "Latest Blogs",
  subtitle = "Insights, ideas and updates from the Viralon studio.",
}) {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const r = await fetch(`/api/blogs?page=1&limit=${LIMIT}`);
        const data = await r.json();
        if (alive) setBlogs(data.blogs || []);
      } catch {
        if (alive) setBlogs([]);
      }
      if (alive) setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, []);

  // Nothing published yet: drop the section rather than leave an empty band.
  if (!loading && blogs.length === 0) return null;

  return (
    <section className="blogs-list-section latest-blogs-section">
      {/* blogs.css is page-scoped (pages/blogs.js loads it the same way) --
          it carries the .bl-* card styles this section reuses. */}
      <Head>
        <link rel="stylesheet" href="/assets/css/blogs.css" />
      </Head>

      <div className="container">
        <div className="bl-section-header">
          <h2 className="bl-section-title">{title}</h2>
          <p className="bl-section-sub">{subtitle}</p>
        </div>

        <div className="bl-grid">
          {loading
            ? Array.from({ length: LIMIT }).map((_, i) => (
                <div className="bl-card latest-blogs-skeleton" key={i} />
              ))
            : blogs.map((blog) => {
                const img = blog.cardImage?.src || blog.coverImage?.src;
                const badge = blog.categories?.[0];
                const date = formatDate(blog.publishDate || blog.createdAt);

                return (
                  <Link
                    href={`/blogs/${blog.slug}`}
                    key={blog.id || blog.slug}
                    style={{ textDecoration: "none", display: "block" }}
                  >
                    <div className="bl-card">
                      <div className="bl-card-img">
                        {img ? (
                          <img
                            src={img}
                            alt={blog.cardImage?.alt || blog.title}
                          />
                        ) : (
                          <div className="bl-card-img-placeholder">📰</div>
                        )}
                        {badge && <span className="bl-badge">{badge}</span>}
                      </div>
                      <div className="bl-card-body">
                        <h3 className="bl-card-title">{blog.title}</h3>
                        {blog.summary && (
                          <p className="bl-card-summary">{blog.summary}</p>
                        )}
                        <div className="bl-card-footer">
                          <div className="bl-card-meta">
                            {blog.authorName && (
                              <span className="bl-card-author">
                                {blog.authorName}
                              </span>
                            )}
                            <span className="bl-card-date">{date}</span>
                          </div>
                          <span className="bl-read-more">
                            Read more <MdArrowForward size={15} />
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
        </div>

        <div className="latest-blogs-more">
          <Link href="/blogs" className="latest-blogs-all">
            View all blogs <MdArrowForward size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
