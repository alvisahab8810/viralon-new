// Landing template "Boom" — modelled on Optiboom index-2: classic SEO landing.
// Split hero (text left, image right with glow), icon-tick feature cards,
// numbered process, big counters. Viralon coral/gradient accents.
import React from "react";
import LeadForm from "../LeadForm";
import { HouseSection, HouseSectionStyles } from "../HouseSections";

const Stars = ({ n }) => (
  <span className="lpbm-stars">{"★".repeat(Math.min(5, Math.max(1, n || 5)))}</span>
);

function Section({ sec }) {
  const d = sec.data || {};
  switch (sec.type) {
    case "intro":
      return (
        <section className="lpbm-sec">
          <div className="container lpbm-narrow">
            {d.heading && <h2 className="lpbm-display lpbm-h2">{d.heading}</h2>}
            {d.html && <div className="manrope lpbm-rich" dangerouslySetInnerHTML={{ __html: d.html }} />}
          </div>
        </section>
      );
    case "split":
      return (
        <section className="lpbm-sec">
          <div className="container">
            <div className={`lpbm-split ${d.reverse ? "lpbm-split-rev" : ""}`}>
              {d.image && <div className="lpbm-split-img"><img src={d.image} alt={d.heading || ""} /></div>}
              <div className="lpbm-split-body">
                {d.heading && <h2 className="lpbm-display lpbm-h2">{d.heading}</h2>}
                {d.html && <div className="manrope lpbm-rich" dangerouslySetInnerHTML={{ __html: d.html }} />}
              </div>
            </div>
          </div>
        </section>
      );
    case "features":
      return (
        <section className="lpbm-sec">
          <div className="container">
            {d.heading && <h2 className="lpbm-display lpbm-h2 lpbm-center">{d.heading}</h2>}
            {d.subheading && <p className="manrope lpbm-subhead">{d.subheading}</p>}
            <div className="lpbm-f-grid">
              {(d.items || []).map((f, i) => (
                <div className="lpbm-f-card" key={i}>
                  <span className="lpbm-tick">✓</span>
                  <div>
                    {f.image && <img className="lpbm-f-img" src={f.image} alt={f.title} />}
                    <h3 className="manrope">{f.title}</h3>
                    <p className="manrope">{f.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "process":
      return (
        <section className="lpbm-sec">
          <div className="container">
            {d.heading && <h2 className="lpbm-display lpbm-h2 lpbm-center">{d.heading}</h2>}
            <div className="lpbm-p-row">
              {(d.steps || []).map((s, i) => (
                <div className="lpbm-p-step" key={i}>
                  <span className="lpbm-display lpbm-p-num">{i + 1}</span>
                  {s.icon && <img className="lpbm-p-ico" src={s.icon} alt="" />}
                  <h3 className="manrope">{s.title}</h3>
                  <p className="manrope">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "stats":
      return (
        <section className="lpbm-sec">
          <div className="container">
            {d.heading && <h2 className="lpbm-display lpbm-h2 lpbm-center">{d.heading}</h2>}
            <div className="lpbm-stats">
              {(d.items || []).map((s, i) => (
                <div className="lpbm-stat" key={i}>
                  <span className="lpbm-display lpbm-stat-v">{s.value}</span>
                  <span className="manrope lpbm-stat-l">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "gallery":
      return (
        <section className="lpbm-sec">
          <div className="container">
            {d.heading && <h2 className="lpbm-display lpbm-h2 lpbm-center">{d.heading}</h2>}
            <div className="lpbm-gallery">
              {(d.images || []).map((g, i) => (
                <div className="lpbm-g-item" key={i}><img src={g} alt="" /></div>
              ))}
            </div>
          </div>
        </section>
      );
    case "logos":
      return (
        <section className="lpbm-sec lpbm-logos-sec">
          {d.heading && <p className="manrope lpbm-logos-head">{d.heading}</p>}
          <div className="lpbm-logos">
            <div className="lpbm-logos-track">
              {[...(d.images || []), ...(d.images || [])].map((g, i) => (
                <img src={g} alt="" key={i} />
              ))}
            </div>
          </div>
        </section>
      );
    case "reviews":
      return (
        <section className="lpbm-sec">
          <div className="container">
            {d.heading && <h2 className="lpbm-display lpbm-h2 lpbm-center">{d.heading}</h2>}
            <div className="lpbm-r-grid">
              {(d.items || []).map((r, i) => (
                <div className="lpbm-r-card" key={i}>
                  {r.image && <img className="lpbm-r-ava" src={r.image} alt={r.name || ""} />}
                  <Stars n={r.rating} />
                  <p className="manrope lpbm-r-text">“{r.text}”</p>
                  <p className="manrope lpbm-r-by"><b>{r.name}</b>{r.role ? ` — ${r.role}` : ""}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "faqs":
      return (
        <section className="lpbm-sec">
          <div className="container lpbm-narrow">
            {d.heading && <h2 className="lpbm-display lpbm-h2 lpbm-center">{d.heading}</h2>}
            {(d.items || []).map((f, i) => (
              <details className="lpbm-faq" key={i} open={i === 0}>
                <summary className="manrope">{f.q}<span className="lpbm-faq-x">+</span></summary>
                <p className="manrope">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      );
    case "cta":
      return (
        <section className="lpbm-sec">
          <div className="container">
            <div className="lpbm-cta">
              {d.headline && <h2 className="lpbm-display">{d.headline}</h2>}
              {d.text && <p className="manrope">{d.text}</p>}
              {d.ctaText && <a href={d.ctaLink || "#"} className="lpbm-cta-btn manrope">{d.ctaText}</a>}
            </div>
          </div>
        </section>
      );
    // Strap / Benefits / Why-choose / Blogs reuse the live our-services
    // markup + classes, so they look identical across every skin.
    case "strap":
    case "benefits":
    case "whychoose":
    case "blogs":
      return <HouseSection sec={sec} />;
    default:
      return null;
  }
}

export default function Boom({ page }) {
  const c = page.content || {};
  const hero = c.hero || {};
  const sections = Array.isArray(c.sections) ? c.sections : [];
  return (
    <div className="lpbm">
      <section className="lpbm-hero">
        <div className="container">
          <div className="lpbm-hero-row">
            <div className="lpbm-hero-body">
              {hero.kicker && <p className="manrope lpbm-kicker">{hero.kicker}</p>}
              <h1 className="lpbm-display">
                {hero.headline || page.title}
                {hero.headlineAccent && <> <span className="lpbm-accent">{hero.headlineAccent}</span></>}
              </h1>
              {hero.subheadline && <p className="manrope lpbm-sub">{hero.subheadline}</p>}
              {hero.ctaText && <a href={hero.ctaLink || "#"} className="lpbm-hero-btn manrope">{hero.ctaText}</a>}
            </div>
            {hero.heroImage && (
              <div className="lpbm-hero-img"><img src={hero.heroImage} alt="" /></div>
            )}
          </div>
        </div>
      </section>

      {sections.map((sec, i) => <Section sec={sec} key={i} />)}

      {c.showLeadForm !== false && <LeadForm slug={page.slug} />}

      <HouseSectionStyles />

      <style jsx global>{`
        .lpbm { background: #1a1a1a; }
        .lpbm-display { font-family: just-sans, sans-serif !important; }
        .lpbm-sec { padding: 45px 0; }
        .lpbm-center { text-align: center; }
        .lpbm-narrow { max-width: 900px; }
        .lpbm-h2 { color: #fff; font-size: 44px; text-transform: uppercase; line-height: 1.1; margin-bottom: 22px; }
        .lpbm-accent { color: #ff6f61; }
        .lpbm-hero { padding: 100px 0 40px; }
        .lpbm-hero-row { display: flex; align-items: center; gap: 54px; }
        .lpbm-hero-body { flex: 1; }
        .lpbm-kicker { color: #ff6f61; letter-spacing: 3px; text-transform: uppercase; font-size: 13.5px; font-weight: 700; margin-bottom: 18px; }
        .lpbm-hero h1 { color: #fff; font-size: 62px; text-transform: uppercase; line-height: 1.05; margin-bottom: 20px; }
        .lpbm-sub { color: #a8a8a8; font-size: 17.5px; line-height: 1.75; margin-bottom: 30px; max-width: 540px; }
        .lpbm-hero-btn {
          display: inline-block; background: linear-gradient(90deg, #FF6F61 29%, #FBA065 95%);
          color: #1d1d1d; padding: 15px 40px;
          border-radius: 999px; font-weight: 800; font-size: 15px; transition: transform 0.2s ease;
        }
        .lpbm-hero-btn:hover { color: #1d1d1d; transform: translateY(-2px); }
        .lpbm-hero-img { flex: 0 0 42%; position: relative; }
        .lpbm-hero-img::before {
          content: ""; position: absolute; inset: 12% -6% -6% 12%;
          background: radial-gradient(ellipse, rgba(255,111,97,0.22), transparent 70%);
          z-index: 0;
        }
        .lpbm-hero-img img { width: 100%; border-radius: 20px; position: relative; z-index: 1; }
        .lpbm-rich, .lpbm-rich p { color: #bfbfbf; font-size: 16.5px; line-height: 1.8; }
        .lpbm-subhead { color: #a8a8a8; font-size: 16px; margin: -8px 0 28px; text-align: center; }
        .lpbm-split { display: flex; gap: 50px; align-items: center; }
        .lpbm-split-rev { flex-direction: row-reverse; }
        .lpbm-split-img { flex: 0 0 44%; }
        .lpbm-split-img img { width: 100%; border-radius: 20px; }
        .lpbm-split-body { flex: 1; }
        .lpbm-f-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; margin-top: 28px; }
        .lpbm-f-card {
          background: #212121; border-radius: 16px; padding: 28px 26px;
          display: flex; gap: 18px; align-items: flex-start;
          transition: transform 0.25s ease;
        }
        .lpbm-f-card:hover { transform: translateY(-4px); }
        .lpbm-tick {
          width: 38px; height: 38px; border-radius: 10px; background: rgba(255,111,97,0.14);
          color: #ff6f61; font-weight: 800; font-size: 17px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
        }
        .lpbm-f-img { width: 100%; height: 140px; object-fit: cover; border-radius: 10px; margin-bottom: 14px; }
        .lpbm-f-card h3 { color: #fff; font-size: 19px; font-weight: 700; margin-bottom: 8px; }
        .lpbm-f-card p { color: #a8a8a8; font-size: 14.5px; line-height: 1.7; margin: 0; }
        .lpbm-p-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 28px; }
        .lpbm-p-step { border: 1px solid #403e44; border-radius: 16px; padding: 30px 26px; }
        .lpbm-p-num { color: #ff6f61; font-size: 44px; display: block; margin-bottom: 12px; }
        .lpbm-p-step h3 { color: #fff; font-size: 19px; font-weight: 700; margin-bottom: 8px; }
        .lpbm-p-step p { color: #a8a8a8; font-size: 14.5px; line-height: 1.7; margin: 0; }
        .lpbm-stats { display: grid; grid-template-columns: repeat(4, 1fr); border: 1px solid #403e44; border-radius: 20px; overflow: hidden; }
        .lpbm-stat { padding: 34px 20px; text-align: center; border-left: 1px solid #403e44; }
        .lpbm-stat:first-child { border-left: none; }
        .lpbm-stat-v { color: #ff6f61; font-size: 52px; display: block; }
        .lpbm-stat-l { color: #a8a8a8; font-size: 13.5px; letter-spacing: 0.4px; }
        .lpbm-gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 26px; }
        .lpbm-g-item { border-radius: 16px; overflow: hidden; }
        .lpbm-g-item img { width: 100%; height: 250px; object-fit: cover; display: block; transition: transform 0.35s ease; }
        .lpbm-g-item:hover img { transform: scale(1.05); }
        .lpbm-logos-sec { text-align: center; }
        .lpbm-logos-head { color: #a8a8a8; letter-spacing: 2px; text-transform: uppercase; font-size: 13px; margin-bottom: 24px; }
        .lpbm-logos { overflow: hidden; }
        .lpbm-logos-track { display: flex; align-items: center; gap: 70px; width: max-content; animation: lpbm-scroll 28s linear infinite; }
        .lpbm-logos-track img { height: 42px; opacity: 0.75; }
        @keyframes lpbm-scroll { to { transform: translateX(-50%); } }
        .lpbm-r-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 28px; }
        .lpbm-r-card { background: #212121; border-radius: 16px; padding: 28px 26px; border-bottom: 3px solid #ff6f61; }
        .lpbm-stars { color: #ffc107; font-size: 17px; letter-spacing: 3px; display: block; margin-bottom: 14px; }
        .lpbm-r-text { color: #e8e8e8; font-size: 15px; line-height: 1.75; margin-bottom: 16px; }
        .lpbm-r-by { color: #a8a8a8; font-size: 13.5px; margin: 0; }
        .lpbm-r-by b { color: #fff; }
        .lpbm-faq { border: 1px solid #403e44; border-radius: 14px; margin-top: 14px; overflow: hidden; }
        .lpbm-faq[open] { border-color: #ff6f61; }
        .lpbm-faq summary {
          list-style: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center;
          color: #fff; font-size: 17px; font-weight: 700; padding: 20px 24px;
        }
        .lpbm-faq summary::-webkit-details-marker { display: none; }
        .lpbm-faq-x { color: #ff6f61; font-size: 22px; transition: transform 0.25s ease; }
        .lpbm-faq[open] .lpbm-faq-x { transform: rotate(45deg); }
        .lpbm-faq p { color: #a8a8a8; font-size: 15px; line-height: 1.75; padding: 0 24px 20px; margin: 0; }
        .lpbm-cta {
          background: #212121; border: 1px solid rgba(255,111,97,0.35); border-radius: 24px;
          padding: 56px 40px; text-align: center;
        }
        .lpbm-cta h2 { color: #fff; font-size: 42px; text-transform: uppercase; margin-bottom: 12px; }
        .lpbm-cta p { color: #bfbfbf; font-size: 16.5px; max-width: 620px; margin: 0 auto 26px; line-height: 1.7; }
        .lpbm-cta-btn {
          display: inline-block; background: linear-gradient(90deg, #FF6F61 29%, #FBA065 95%);
          color: #1d1d1d; padding: 15px 40px;
          border-radius: 999px; font-weight: 800; font-size: 15px; transition: transform 0.2s ease;
        }
        .lpbm-cta-btn:hover { color: #1d1d1d; transform: translateY(-2px); }
        @media (max-width: 991px) {
          .lpbm-hero-row { flex-direction: column; }
          .lpbm-hero-img { flex: none; width: 100%; }
          .lpbm-hero h1 { font-size: 44px; }
          .lpbm-h2 { font-size: 32px; }
          .lpbm-f-grid { grid-template-columns: 1fr; }
          .lpbm-r-grid, .lpbm-p-row, .lpbm-gallery { grid-template-columns: 1fr 1fr; }
          .lpbm-stats { grid-template-columns: 1fr 1fr; }
          .lpbm-stat:nth-child(3) { border-left: none; }
          .lpbm-stat { border-top: 1px solid #403e44; }
          .lpbm-stat:nth-child(-n+2) { border-top: none; }
          .lpbm-split, .lpbm-split-rev { flex-direction: column; }
          .lpbm-split-img { flex: none; width: 100%; }
        }
        @media (max-width: 767px) {
          .lpbm-hero { padding: 70px 0 30px; }
          .lpbm-hero h1 { font-size: 34px; }
          .lpbm-h2 { font-size: 26px; }
          .lpbm-r-grid, .lpbm-p-row, .lpbm-gallery { grid-template-columns: 1fr; }
          .lpbm-stat-v { font-size: 38px; }
          .lpbm-cta h2 { font-size: 27px; }
          .lpbm-cta { padding: 40px 22px; }
        }
        .lpbm-p-ico { width: 46px; height: 46px; object-fit: contain; display: block; margin-bottom: 12px; }
        .lpbm-r-ava { width: 54px; height: 54px; border-radius: 50%; object-fit: cover; margin-bottom: 14px; }
      `}</style>
    </div>
  );
}
