// components/common/LatestBlogs.js — the "Latest Blogs" strip that closes the
// service pages.
//
// The markup is the site's original blog-area card (the one that used to live in
// components/our-services/seo/Blogs.js), so it picks up the .blog-area styles
// already in custome.css / responsive.css and matches the rest of the site.
// The three lorem-ipsum cards it used to hard-code are gone: the posts come from
// /api/blogs, the same endpoint the /blogs listing uses.
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";

const LIMIT = 3;
const FALLBACK_THUMB = "/assets/img/seo/blogs/1.jpg";

// The badge over the thumb wants the day and the month separately.
function splitDate(d) {
  if (!d) return null;
  const dt = new Date(d);
  if (isNaN(dt)) return null;
  return {
    day: String(dt.getDate()).padStart(2, "0"),
    month: dt.toLocaleDateString("en-IN", { month: "short" }),
  };
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
  if (loading || blogs.length === 0) return null;

  return (
    <section className="blog-lists-section">
      <div id="blog" className="blog-area pt-100 bottom-less">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="site-heading text-center">
                <h2>{title}</h2>
                <div className="devider"></div>
                <p>{subtitle}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <Swiper
            spaceBetween={24}
            // Looping needs more slides than are on screen at once, otherwise
            // Swiper duplicates the few there are and the rail stutters.
            loop={blogs.length > 3}
            slidesPerView={3}
            navigation={{
              nextEl: ".swiper-button-next-1",
              prevEl: ".swiper-button-prev-1",
            }}
            breakpoints={{
              240: { centeredSlides: blogs.length > 1, slidesPerView: 1.15, spaceBetween: 14 },
              768: { slidesPerView: 2.2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            modules={[Autoplay, Navigation]}
            className="swiper mySwiperBlogs"
          >
            {blogs.map((blog) => {
              const href = `/blogs/${blog.slug}`;
              const img = blog.cardImage?.src || blog.coverImage?.src;
              const alt = blog.cardImage?.alt || blog.title;
              const date = splitDate(blog.publishDate || blog.createdAt);
              const category = blog.categories?.[0];

              return (
                <SwiperSlide
                  className="swiper-slide single-item"
                  key={blog.id || blog.slug}
                >
                  <div className="item">
                    <div className="thumb">
                      <Link href={href}>
                        {/* Falls back on two counts: a post saved without a
                            cover, and a cover whose URL does not load -- some
                            older posts stored an absolute http://localhost:3002
                            path. Either way the thumb shows an image instead of
                            a broken-image icon. */}
                        <img
                          src={img || FALLBACK_THUMB}
                          alt={alt}
                          onError={(e) => {
                            if (e.currentTarget.src.endsWith(FALLBACK_THUMB)) return;
                            e.currentTarget.src = FALLBACK_THUMB;
                          }}
                        />
                      </Link>
                      {date && (
                        <div className="date">
                          <strong>{date.day}</strong> <span>{date.month}</span>
                        </div>
                      )}
                    </div>
                    <div className="info">
                      <div className="meta">
                        <ul>
                          <li>
                            <Link href={href}>
                              <i className="fas fa-user-circle"></i>{" "}
                              {blog.authorName || "Viralon"}
                            </Link>
                          </li>
                          {category && (
                            <li>
                              <Link href={href}>
                                <i className="fas fa-folder-open"></i>{" "}
                                {category}
                              </Link>
                            </li>
                          )}
                        </ul>
                      </div>
                      <h4>
                        <Link href={href}>{blog.title}</Link>
                      </h4>
                      {blog.summary && <p>{blog.summary}</p>}
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          {/* Swiper sizes each slide to its own content, so a post with a
              shorter standfirst left a visibly stubby card next to a taller
              one. Stretching the slide and letting .item fill it makes every
              card in the rail the same height. Scoped to this rail so the
              site's other Swipers keep their own sizing. */}
          <style jsx global>{`
            .mySwiperBlogs .swiper-slide {
              height: auto;
              display: flex;
            }
            .mySwiperBlogs .swiper-slide > .item {
              flex: 1 1 auto;
              display: flex;
              flex-direction: column;
            }
            .mySwiperBlogs .swiper-slide > .item .info {
              flex: 1 1 auto;
            }
          `}</style>
        </div>
      </div>
    </section>
  );
}
