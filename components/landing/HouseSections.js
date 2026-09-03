// components/landing/HouseSections.js — four landing-page sections rendered in
// the site's OWN markup and classes, lifted straight from the live
// /our-services/* pages so a landing page is visually continuous with them:
//
//   Strap     → components/our-services/digital-marketing/Strap.js
//   Benefits  → .../paid-media-marketing/Significance.js
//   WhyChoose → .../paid-media-marketing/SolidReasons.js
//   BlogCards → .../seo/Blogs.js
//
// All classes below live in public/assets/css/custome.css + responsive.css,
// which _document.js loads on every marketing page — nothing extra to ship.
// Every skin (Curve/Nexa/Studio/Boom/Bold/Service) renders these same four,
// so switching a page's template never changes how they look.
import React from "react";

// The marquee animation translates by -50%, so the word list has to be
// duplicated for the loop to be seamless.
export function Strap({ d }) {
  const words = (d.items || []).filter(Boolean);
  if (!words.length) return null;
  return (
    <section
      className="strap-section scroller mt-100"
      data-direction="left"
      data-speed="slow"
      data-lag="0"
      data-animated="true"
    >
      <div className="scroller__inner text-container d-flex align-items-center">
        {[...words, ...words].map((w, i) => (
          <React.Fragment key={i}>
            <span>{w}</span>
            <span className="dot mx-3">•</span>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export function Benefits({ d }) {
  const items = d.items || [];
  if (!items.length) return null;
  return (
    <section className="significance-section ptb-100">
      <div className="container">
        {(d.heading || d.text) && (
          <div className="significance-content">
            {d.heading && <h1>{d.heading}</h1>}
            {d.text && <p>{d.text}</p>}
          </div>
        )}
        <div className="significance-row pt-50">
          {items.map((b, i) => (
            <div className="signifinace-col5" key={i}>
              <h2>{b.title}</h2>
              <p>{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyChoose({ d }) {
  const items = d.items || [];
  if (!items.length) return null;
  const [img1, img2, img3] = d.images || [];
  return (
    <section className="solid-reasons-section ptb-100">
      <div className="container solid_reason-bx">
        <div className="row">
          <div className="col-lg-6 mb-4">
            <div className="row g-3">
              {img1 && (
                <div className="col-12 col-sm-6 desktop-none super-img">
                  <img alt="" className="img-fluid rounded shadow" src={img1} />
                </div>
              )}
              <div className="col-12 col-sm-6">
                <div className="about--bx bg-white">
                  <h2 className="text-first">LET&apos;S TALK</h2>
                  <h1 className="text-second">About Your Next Project</h1>
                  <a href="/contact-us" className="process-btn">LET&apos;S TALK</a>
                </div>
              </div>
              {img1 && (
                <div className="col-12 col-sm-6 mt-150 p-relative z-in mobile-none">
                  <div className="pattern-img">
                    <img src="/assets/img/seo/pattern.png" alt="" />
                  </div>
                  <img alt="" className="img-fluid rounded shadow" src={img1} />
                </div>
              )}
            </div>
            {(img2 || img3) && (
              <div className="row g-3 mobile-none">
                {img2 && (
                  <div className="col-12 col-sm-6 mt-45">
                    <img alt="" className="img-fluid rounded shadow" src={img2} />
                  </div>
                )}
                {img3 && (
                  <div className="col-12 col-sm-6 mt-5">
                    <img alt="" className="img-fluid rounded shadow" src={img3} />
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="col-lg-6 pl-70">
            {d.kicker && <h2 className="process-heading">{d.kicker}</h2>}
            <h1 className="why-c-heading mb-4">
              {d.heading}{" "}
              {d.brand && (
                <span className="text-white">
                  <b>{d.brand}</b>
                </span>
              )}
            </h1>
            <ul className="check-img-bx list-unstyled">
              {items.map((r, i) => (
                <li className={`d-flex ${i === items.length - 1 ? "" : "mb-4"}`} key={i}>
                  <img src="/assets/img/seo/icons/arrow.png" alt="" />
                  <div className="reasons-bxx">
                    <h3 className="reasons-points">{r.title}</h3>
                    <p>{r.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function BlogCards({ d }) {
  const items = d.items || [];
  if (!items.length) return null;
  return (
    <section className="blog-lists-section">
      <div className="blog-area pt-100 bottom-less">
        {(d.heading || d.text) && (
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="site-heading text-center">
                  {d.heading && <h2>{d.heading}</h2>}
                  <div className="devider"></div>
                  {d.text && <p>{d.text}</p>}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="container">
          <div className="row">
            {items.map((b, i) => {
              // "18 Apr" → big day + small month, matching the template's badge.
              const [day, ...rest] = String(b.date || "").trim().split(/\s+/);
              const href = b.link || "/blogs";
              return (
                <div className="single-item col-lg-4 col-md-6" key={i}>
                  <div className="item">
                    <div className="thumb">
                      <a href={href}>
                        {b.image ? <img src={b.image} alt={b.title} /> : null}
                      </a>
                      {b.date && (
                        <div className="date">
                          <strong>{day}</strong> <span>{rest.join(" ")}</span>
                        </div>
                      )}
                    </div>
                    <div className="info">
                      <h4>
                        <a href={href}>{b.title}</a>
                      </h4>
                      <p>{b.text}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// `signifinace-col5` (the typo'd class the live pages use) has no rule of its
// own — custome.css styles `.significance-row > div`. Kept as-is so the markup
// matches the service pages exactly; these few rules only fill gaps the
// original pages get from their own page-level CSS.
export function HouseSectionStyles() {
  return (
    <style jsx global>{`
      .blog-lists-section .site-heading h2 { color: #fff; }
      .blog-lists-section .site-heading p { color: #a8a8a8; }
      .solid-reasons-section .about--bx .process-btn {
        display: inline-block; text-decoration: none;
      }
      @media (max-width: 991px) {
        .significance-row { flex-wrap: wrap; }
        .significance-row > div { width: calc(50% - 10px); margin-bottom: 15px; }
      }
      @media (max-width: 575px) {
        .significance-row > div { width: 100%; }
      }
    `}</style>
  );
}

// One entry point the skins delegate to for these four types.
export function HouseSection({ sec }) {
  const d = sec.data || {};
  switch (sec.type) {
    case "strap":     return <Strap d={d} />;
    case "benefits":  return <Benefits d={d} />;
    case "whychoose": return <WhyChoose d={d} />;
    case "blogs":     return <BlogCards d={d} />;
    default:          return null;
  }
}
