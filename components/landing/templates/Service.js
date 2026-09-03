// Landing template "Service" — the house skin. Unlike the five reference-based
// skins (Curve/Nexa/Studio/Boom/Bold) this one writes NO design of its own: it
// reuses the exact markup and CSS classes of our live /our-services/* pages
// (seo-hero, core-task-bg, process-section, significance-section,
// solid-reasons-section, faq-section, lets-cta-section, blog-area, …), all of
// which ship in public/assets/css/custome.css + responsive.css and are loaded
// on every marketing page by _document.js.
//
// So a page built on this template is indistinguishable from a hand-built
// service page — same type scale, same spacing, same brand gradient — while
// still being fully editable section-by-section from the payroll admin.
import React from "react";
import LeadForm from "../LeadForm";
import { HouseSection, HouseSectionStyles } from "../HouseSections";

const Stars = ({ n }) => (
  <span className="lpsv-stars">{"★".repeat(Math.min(5, Math.max(1, n || 5)))}</span>
);

function Section({ sec, idx }) {
  const d = sec.data || {};
  switch (sec.type) {
    case "intro":
      return (
        <section className="ptb-100 lpsv-sec">
          <div className="container">
            <div className="core-content pb-50">
              {d.heading && <h1>{d.heading}</h1>}
              <div className="devider"></div>
            </div>
            {d.html && (
              <div className="lpsv-rich manrope" dangerouslySetInnerHTML={{ __html: d.html }} />
            )}
          </div>
        </section>
      );

    case "split":
      return (
        <section className="ptb-100 lpsv-sec">
          <div className="container">
            <div className={`row align-center ${d.reverse ? "flex-row-reverse" : ""}`}>
              {d.image && (
                <div className="col-lg-6 mb-4 mb-lg-0">
                  <img className="img-fluid rounded shadow" src={d.image} alt={d.heading || ""} />
                </div>
              )}
              <div className={d.image ? "col-lg-6" : "col-lg-10 offset-lg-1"}>
                {d.heading && <h1 className="why-c-heading mb-4">{d.heading}</h1>}
                {d.html && (
                  <div className="lpsv-rich manrope" dangerouslySetInnerHTML={{ __html: d.html }} />
                )}
              </div>
            </div>
          </div>
        </section>
      );

    // The "Core Tasks" block from every service page — a bordered card grid.
    case "features":
      return (
        <div className="core-task-bg ptb-100">
          <div className="container">
            <div className="core-content pb-50">
              {d.heading && <h1>{d.heading}</h1>}
              <div className="devider"></div>
              {d.subheading && <p>{d.subheading}</p>}
            </div>
            <div className="lpsv-core-grid">
              {(d.items || []).map((f, i) => (
                <div className="core-bx" key={i}>
                  {f.image && <img className="lpsv-core-img" src={f.image} alt={f.title} />}
                  <h2>{f.title}</h2>
                  <p>{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    // The numbered step rows with icons — first step highlighted, as on the
    // service pages (step-box-orange).
    case "process":
      return (
        <section className="process-section">
          <div className="container">
            <div className="row pt-100">
              <div className="col-lg-12">
                {d.heading && <h1 className="process-heading mb-5">{d.heading}</h1>}
              </div>
              <div className="col-lg-12 lpsv-steps">
                {(d.steps || []).map((s, i) => (
                  <div className="d-flex main-d-flex mb-4 overflow-hidden" key={i}>
                    <div className="step-number">
                      <ul className="nubmer-lists">
                        <li>{i + 1}</li>
                      </ul>
                    </div>
                    <div className={`ml-4 step-box ${i === 0 ? "step-box-orange" : ""}`}>
                      <div className="steps-bxx">
                        {s.icon && (
                          <div className="width-20">
                            <img className="mr-2" src={s.icon} alt={s.title} />
                          </div>
                        )}
                        <div className={s.icon ? "width-80" : ""}>
                          <h2>{s.title}</h2>
                          <p>{s.text}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );

    case "stats":
      return (
        <section className="ptb-100 lpsv-sec">
          <div className="container">
            {d.heading && <h1 className="process-heading mb-5">{d.heading}</h1>}
            <div className="lpsv-stats">
              {(d.items || []).map((s, i) => (
                <div className="lpsv-stat" key={i}>
                  <span className="lpsv-stat-v">{s.value}</span>
                  <span className="lpsv-stat-l manrope">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    case "gallery":
      return (
        <section className="our-work-section pb-100 lpsv-sec">
          <div className="container">
            {d.heading && <h1 className="process-heading mb-5">{d.heading}</h1>}
            <div className="lpsv-gallery">
              {(d.images || []).map((g, i) => (
                <div className="lpsv-g-item" key={i}>
                  <img src={g} alt="" />
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    // Reuses the site's own .scroller marquee (see HouseSections).
    case "logos":
      return (
        <section
          className="lpsv-sec scroller pb-50"
          data-direction="left"
          data-speed="slow"
          data-animated="true"
        >
          {d.heading && <p className="lpsv-logos-head manrope">{d.heading}</p>}
          <div className="scroller__inner">
            {[...(d.images || []), ...(d.images || [])].map((g, i) => (
              <img src={g} alt="" key={i} />
            ))}
          </div>
        </section>
      );

    // The home-page testimonial card, laid out as a grid instead of a slider so
    // the whole section is crawlable and needs no JS.
    case "reviews":
      return (
        <section className="testimonials lpsv-sec">
          <div className="container bg-linear pt-80 pb-80">
            {d.heading && (
              <h1 className="text-white text-center lpsv-rev-head">{d.heading}</h1>
            )}
            <div className="lpsv-rev-grid pt-50">
              {(d.items || []).map((r, i) => (
                <div className="testimonial-card" key={i}>
                  {r.image && (
                    <div className="review-left-bx">
                      <img src={r.image} alt={r.name || ""} className="review-main-img" />
                    </div>
                  )}
                  <div className="review-right-bx">
                    <div className="rating d-flex align-items-center">
                      <img src="/assets/img/icon/star.png" alt="Star Review" />
                      <span>{(r.rating || 5).toFixed(1)} rating</span>
                    </div>
                    <Stars n={r.rating} />
                    <p className="text-secondary mt-2">{r.text}</p>
                    <p className="company mt-4">{r.name}</p>
                    <p className="position">{r.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );

    // The service pages use a Bootstrap accordion here; <details> gives the
    // same look with zero JS and stays open for crawlers.
    case "faqs":
      return (
        <section className="faq-section pt-100">
          <div className="container">
            <div className="text-center">
              <p className="text-orange">Still Having Queries ?</p>
              {d.heading && <h2 className="display-4 fw-bold mt-2">{d.heading}</h2>}
            </div>
            <div className="mt-5 lpsv-faqs">
              {(d.items || []).map((f, i) => (
                <details className="lpsv-faq" key={i} open={i === 0}>
                  <summary>
                    <span className="fs-3 fw-bold me-3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {f.q}
                    <span className="lpsv-faq-x">+</span>
                  </summary>
                  <div className="lpsv-faq-body manrope">{f.a}</div>
                </details>
              ))}
            </div>
            <div className="text-end mt-5">
              <p className="text-orange fs-24">Ask Your Queries...</p>
            </div>
          </div>
        </section>
      );

    // The site's "LET'S TALK / About Your Next Project" band.
    case "cta":
      return (
        <section className="lets-cta-section ptb-100">
          <div className="container">
            <div className="row align-center">
              <div className="col-lg-8 banner-one-item">
                {d.text && <h4 className="manrope">{d.text}</h4>}
                <h2>
                  <strong>{d.headline}</strong>
                </h2>
              </div>
              <div className="col-lg-3 offset-lg-1 banner-one-item text-center">
                <div className="choose-us-style-one-thumb">
                  <a href={d.ctaLink || "/contact-us"} title={d.ctaText || "Get in touch"}>
                    <div className="up-arrow">
                      <img src="/assets/img/icon/up-arrow.png" alt={d.ctaText || "Up Arrow"} />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      );

    case "strap":
    case "benefits":
    case "whychoose":
    case "blogs":
      return <HouseSection sec={sec} />;

    default:
      return null;
  }
}

export default function Service({ page }) {
  const c = page.content || {};
  const hero = c.hero || {};
  const sections = Array.isArray(c.sections) ? c.sections : [];
  return (
    <div className="lpsv">
      {/* The service-page hero: round accent image behind, copy left, art right. */}
      <div className="seo-hero about-section1">
        <div className="seo-hero-img">
          <img src="/assets/img/seo/hero-img.png" alt="" />
        </div>
        <div className="container">
          <div className="seo-hero-content">
            {hero.kicker && <p className="text-orange lpsv-kicker">{hero.kicker}</p>}
            <h1>
              <b>{hero.headline || page.title}</b>
              {hero.headlineAccent && (
                <>
                  <br />
                  <span>{hero.headlineAccent}</span>
                </>
              )}
            </h1>
            {hero.subheadline && <p>{hero.subheadline}</p>}
            {hero.ctaText && (
              <a href={hero.ctaLink || "/contact-us"} className="process-btn lpsv-hero-btn">
                {hero.ctaText}
              </a>
            )}
          </div>

          {hero.heroImage && (
            <div className="image-column col-xl-7 col-lg-5 col-md-12 col-sm-12">
              <div className="inner-column">
                <figure className="image-1">
                  <img src={hero.heroImage} alt="" />
                </figure>
              </div>
            </div>
          )}
        </div>
      </div>

      {sections.map((sec, i) => (
        <Section sec={sec} idx={i} key={i} />
      ))}

      {c.showLeadForm !== false && <LeadForm slug={page.slug} />}

      <HouseSectionStyles />
      <style jsx global>{`
        .lpsv { background: #1a1a1a; }
        .lpsv-kicker { letter-spacing: 2px; text-transform: uppercase; font-size: 13px; margin-bottom: 12px; }
        .lpsv-hero-btn { display: inline-block; margin-top: 26px; text-decoration: none; }
        .lpsv-rich, .lpsv-rich p { color: #bfbfbf; font-size: 17px; line-height: 1.8; }
        .lpsv-rich { max-width: 860px; margin: 0 auto; }

        /* "Core Tasks" cards — the slider on the service pages laid out as a
           static grid so nothing depends on Swiper being present. */
        .lpsv-core-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .lpsv-core-grid .core-bx { height: 100%; }
        .lpsv-core-img { width: 100%; height: 150px; object-fit: cover; border-radius: 12px; margin-bottom: 16px; }

        .lpsv-steps { max-width: 860px; }
        .lpsv-steps .step-box { flex: 1; }

        .lpsv-stats { display: flex; flex-wrap: wrap; justify-content: space-around; gap: 26px; border-top: 1px solid #403e44; border-bottom: 1px solid #403e44; padding: 40px 0; }
        .lpsv-stat { text-align: center; }
        .lpsv-stat-v {
          display: block; font-size: 56px; line-height: 1;
          font-family: just-sans, sans-serif;
          background: linear-gradient(90deg, #ff6f61 29%, #fba065 95%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .lpsv-stat-l { color: #a8a8a8; font-size: 14px; letter-spacing: 0.5px; }

        .lpsv-gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
        .lpsv-g-item { border-radius: 18px; overflow: hidden; }
        .lpsv-g-item img { width: 100%; height: 260px; object-fit: cover; display: block; transition: transform 0.35s ease; }
        .lpsv-g-item:hover img { transform: scale(1.05); }

        .lpsv-logos-head { color: #a8a8a8; letter-spacing: 2px; text-transform: uppercase; font-size: 13px; text-align: center; margin-bottom: 18px; }

        .lpsv-rev-head { font-size: 40px; }
        .lpsv-rev-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
        .lpsv-rev-grid .testimonial-card { height: 100%; }
        .lpsv-stars { color: #ffc107; font-size: 15px; letter-spacing: 2px; display: block; margin-top: 6px; }

        /* Same look as the Bootstrap accordion on the service pages, without
           needing bootstrap.bundle.js to have loaded. */
        .lpsv-faqs { max-width: 900px; margin: 0 auto; }
        .lpsv-faq { border-bottom: 1px solid #403e44; padding: 4px 0; }
        .lpsv-faq summary {
          list-style: none; cursor: pointer; display: flex; align-items: center;
          color: #fff; font-size: 18px; font-weight: 600; padding: 22px 4px;
        }
        .lpsv-faq summary::-webkit-details-marker { display: none; }
        .lpsv-faq summary .fs-3 { color: #ff6f61; }
        .lpsv-faq-x { margin-left: auto; color: #ff6f61; font-size: 24px; font-weight: 400; transition: transform 0.25s ease; }
        .lpsv-faq[open] .lpsv-faq-x { transform: rotate(45deg); }
        .lpsv-faq-body { color: #a8a8a8; font-size: 15.5px; line-height: 1.8; padding: 0 4px 22px; }

        @media (max-width: 991px) {
          .lpsv-core-grid, .lpsv-rev-grid, .lpsv-gallery { grid-template-columns: 1fr 1fr; }
          .lpsv-rev-head { font-size: 30px; }
        }
        @media (max-width: 767px) {
          .lpsv-core-grid, .lpsv-rev-grid, .lpsv-gallery { grid-template-columns: 1fr; }
          .lpsv-stat-v { font-size: 42px; }
          .lpsv-faq summary { font-size: 16px; }
        }
      `}</style>
    </div>
  );
}
