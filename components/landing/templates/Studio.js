// Landing template "Studio" — modelled on okmg.com: minimal editorial layout.
// Big quiet headlines, hairline rules, generous whitespace, quiet coral
// accents. Imagery does the talking.
import React from "react";
import LeadForm from "../LeadForm";
import { HouseSection, HouseSectionStyles } from "../HouseSections";

const Stars = ({ n }) => (
  <span className="lpst-stars">{"★".repeat(Math.min(5, Math.max(1, n || 5)))}</span>
);

function Section({ sec }) {
  const d = sec.data || {};
  switch (sec.type) {
    case "intro":
      return (
        <section className="lpst-sec">
          <div className="container lpst-narrow">
            {d.heading && <h2 className="lpst-display lpst-h2">{d.heading}</h2>}
            {d.html && <div className="manrope lpst-rich" dangerouslySetInnerHTML={{ __html: d.html }} />}
          </div>
        </section>
      );
    case "split":
      return (
        <section className="lpst-sec">
          <div className="container">
            <div className={`lpst-split ${d.reverse ? "lpst-split-rev" : ""}`}>
              {d.image && <div className="lpst-split-img"><img src={d.image} alt={d.heading || ""} /></div>}
              <div className="lpst-split-body">
                {d.heading && <h2 className="lpst-display lpst-h2">{d.heading}</h2>}
                {d.html && <div className="manrope lpst-rich" dangerouslySetInnerHTML={{ __html: d.html }} />}
              </div>
            </div>
          </div>
        </section>
      );
    case "features":
      return (
        <section className="lpst-sec">
          <div className="container">
            {d.heading && <h2 className="lpst-display lpst-h2 lpst-center">{d.heading}</h2>}
            {d.subheading && <p className="manrope lpst-subhead">{d.subheading}</p>}
            <div className="lpst-f-grid">
              {(d.items || []).map((f, i) => (
                <div className="lpst-f" key={i}>
                  {f.image && <img className="lpst-f-img" src={f.image} alt={f.title} />}
                  <h3 className="lpst-display">{f.title}</h3>
                  <p className="manrope">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "process":
      return (
        <section className="lpst-sec">
          <div className="container lpst-narrow">
            {d.heading && <h2 className="lpst-display lpst-h2">{d.heading}</h2>}
            {(d.steps || []).map((s, i) => (
              <div className="lpst-p-row" key={i}>
                <span className="lpst-display lpst-p-num">{String(i + 1).padStart(2, "0")}</span>
                  {s.icon && <img className="lpst-p-ico" src={s.icon} alt="" />}
                <div>
                  <h3 className="lpst-display">{s.title}</h3>
                  <p className="manrope">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      );
    case "stats":
      return (
        <section className="lpst-sec">
          <div className="container">
            {d.heading && <h2 className="lpst-display lpst-h2 lpst-center">{d.heading}</h2>}
            <div className="lpst-stats">
              {(d.items || []).map((s, i) => (
                <div className="lpst-stat" key={i}>
                  <span className="lpst-display lpst-stat-v">{s.value}</span>
                  <span className="manrope lpst-stat-l">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "gallery":
      return (
        <section className="lpst-sec">
          <div className="container">
            {d.heading && <h2 className="lpst-display lpst-h2 lpst-center">{d.heading}</h2>}
            <div className="lpst-gallery">
              {(d.images || []).map((g, i) => (
                <div className="lpst-g-item" key={i}><img src={g} alt="" /></div>
              ))}
            </div>
          </div>
        </section>
      );
    case "logos":
      return (
        <section className="lpst-sec lpst-logos-sec">
          {d.heading && <p className="manrope lpst-logos-head">{d.heading}</p>}
          <div className="lpst-logos">
            <div className="lpst-logos-track">
              {[...(d.images || []), ...(d.images || [])].map((g, i) => (
                <img src={g} alt="" key={i} />
              ))}
            </div>
          </div>
        </section>
      );
    case "reviews":
      return (
        <section className="lpst-sec">
          <div className="container lpst-narrow">
            {d.heading && <h2 className="lpst-display lpst-h2 lpst-center">{d.heading}</h2>}
            {(d.items || []).map((r, i) => (
              <div className="lpst-r" key={i}>
                {r.image && <img className="lpst-r-ava" src={r.image} alt={r.name || ""} />}
                <Stars n={r.rating} />
                <p className="lpst-display lpst-r-text">“{r.text}”</p>
                <p className="manrope lpst-r-by"><b>{r.name}</b>{r.role ? ` — ${r.role}` : ""}</p>
              </div>
            ))}
          </div>
        </section>
      );
    case "faqs":
      return (
        <section className="lpst-sec">
          <div className="container lpst-narrow">
            {d.heading && <h2 className="lpst-display lpst-h2">{d.heading}</h2>}
            {(d.items || []).map((f, i) => (
              <details className="lpst-faq" key={i} open={i === 0}>
                <summary className="lpst-display">{f.q}<span className="lpst-faq-x">+</span></summary>
                <p className="manrope">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      );
    case "cta":
      return (
        <section className="lpst-sec lpst-cta">
          <div className="container">
            {d.headline && <h2 className="lpst-display">{d.headline}</h2>}
            {d.text && <p className="manrope">{d.text}</p>}
            {d.ctaText && <a href={d.ctaLink || "#"} className="lpst-display lpst-cta-link">{d.ctaText} →</a>}
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

export default function Studio({ page }) {
  const c = page.content || {};
  const hero = c.hero || {};
  const sections = Array.isArray(c.sections) ? c.sections : [];
  return (
    <div className="lpst">
      <section className="lpst-hero">
        <div className="container">
          {hero.kicker && <p className="manrope lpst-kicker">{hero.kicker}</p>}
          <h1 className="lpst-display">
            {hero.headline || page.title}
            {hero.headlineAccent && <> <em className="lpst-accent">{hero.headlineAccent}</em></>}
          </h1>
          {hero.subheadline && <p className="manrope lpst-sub">{hero.subheadline}</p>}
          {hero.ctaText && <a href={hero.ctaLink || "#"} className="lpst-display lpst-hero-link">{hero.ctaText} →</a>}
          {hero.heroImage && <div className="lpst-hero-img"><img src={hero.heroImage} alt="" /></div>}
        </div>
        <div className="container"><div className="lpst-rule" /></div>
      </section>

      {sections.map((sec, i) => <Section sec={sec} key={i} />)}

      {c.showLeadForm !== false && <LeadForm slug={page.slug} />}

      <HouseSectionStyles />

      <style jsx global>{`
        .lpst { background: #1a1a1a; }
        .lpst-display { font-family: just-sans-medium, sans-serif !important; }
        .lpst-sec { padding: 45px 0; }
        .lpst-center { text-align: center; }
        .lpst-narrow { max-width: 900px; }
        .lpst-h2 { color: #fff; font-size: 42px; line-height: 1.18; margin-bottom: 24px; }
        .lpst-rule { height: 1px; background: #403e44; margin-top: 60px; }
        .lpst-hero { padding: 120px 0 0; text-align: center; }
        .lpst-kicker { color: #a8a8a8; letter-spacing: 4px; text-transform: uppercase; font-size: 12.5px; margin-bottom: 22px; }
        .lpst-hero h1 { color: #fff; font-size: 66px; line-height: 1.12; max-width: 900px; margin: 0 auto 22px; }
        .lpst-accent { color: #ff6f61; font-style: normal; }
        .lpst-sub { color: #a8a8a8; font-size: 18px; max-width: 620px; margin: 0 auto 30px; line-height: 1.75; }
        .lpst-hero-link, .lpst-cta-link {
          color: #fff; font-size: 20px; border-bottom: 1px solid #ff6f61; padding-bottom: 5px;
          transition: color 0.2s ease;
        }
        .lpst-hero-link:hover, .lpst-cta-link:hover { color: #ff6f61; }
        .lpst-hero-img { margin-top: 56px; }
        .lpst-hero-img img { width: 100%; max-height: 540px; object-fit: cover; border-radius: 4px; }
        .lpst-rich, .lpst-rich p { color: #bfbfbf; font-size: 18px; line-height: 1.85; }
        .lpst-subhead { color: #a8a8a8; font-size: 16px; margin: -10px 0 30px; text-align: center; }
        .lpst-split { display: flex; gap: 56px; align-items: center; }
        .lpst-split-rev { flex-direction: row-reverse; }
        .lpst-split-img { flex: 0 0 46%; }
        .lpst-split-img img { width: 100%; border-radius: 4px; }
        .lpst-split-body { flex: 1; }
        .lpst-f-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 44px; margin-top: 34px; }
        .lpst-f { border-top: 1px solid #403e44; padding-top: 26px; }
        .lpst-f-img { width: 100%; height: 190px; object-fit: cover; border-radius: 4px; margin-bottom: 20px; }
        .lpst-f h3 { color: #fff; font-size: 26px; margin-bottom: 12px; }
        .lpst-f p { color: #a8a8a8; font-size: 15px; line-height: 1.75; margin: 0; }
        .lpst-p-row { display: flex; gap: 30px; padding: 30px 0; border-bottom: 1px solid #403e44; }
        .lpst-p-num { color: #ff6f61; font-size: 30px; flex-shrink: 0; width: 56px; }
        .lpst-p-row h3 { color: #fff; font-size: 24px; margin-bottom: 8px; }
        .lpst-p-row p { color: #a8a8a8; font-size: 15.5px; line-height: 1.75; margin: 0; }
        .lpst-stats { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 30px; padding: 30px 0; border-top: 1px solid #403e44; border-bottom: 1px solid #403e44; }
        .lpst-stat { text-align: center; }
        .lpst-stat-v { color: #fff; font-size: 52px; display: block; }
        .lpst-stat-l { color: #a8a8a8; font-size: 13.5px; letter-spacing: 1px; text-transform: uppercase; }
        .lpst-gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 30px; }
        .lpst-g-item { overflow: hidden; border-radius: 4px; }
        .lpst-g-item img { width: 100%; height: 300px; object-fit: cover; display: block; filter: grayscale(1); transition: filter 0.4s ease; }
        .lpst-g-item:hover img { filter: none; }
        .lpst-logos-sec { text-align: center; }
        .lpst-logos-head { color: #a8a8a8; letter-spacing: 2px; text-transform: uppercase; font-size: 12.5px; margin-bottom: 24px; }
        .lpst-logos { overflow: hidden; }
        .lpst-logos-track { display: flex; align-items: center; gap: 76px; width: max-content; animation: lpst-scroll 30s linear infinite; }
        .lpst-logos-track img { height: 40px; opacity: 0.65; transition: opacity 0.2s; }
        .lpst-logos-track img:hover { opacity: 1; }
        @keyframes lpst-scroll { to { transform: translateX(-50%); } }
        .lpst-r { text-align: center; padding: 34px 0; border-bottom: 1px solid #403e44; }
        .lpst-r:last-child { border-bottom: none; }
        .lpst-stars { color: #ffc107; font-size: 17px; letter-spacing: 4px; display: block; margin-bottom: 18px; }
        .lpst-r-text { color: #fff; font-size: 26px; line-height: 1.55; margin-bottom: 16px; }
        .lpst-r-by { color: #a8a8a8; font-size: 14px; margin: 0; }
        .lpst-r-by b { color: #fff; }
        .lpst-faq { border-bottom: 1px solid #403e44; }
        .lpst-faq summary {
          list-style: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center;
          color: #fff; font-size: 22px; padding: 24px 0;
        }
        .lpst-faq summary::-webkit-details-marker { display: none; }
        .lpst-faq-x { color: #ff6f61; font-size: 24px; transition: transform 0.25s ease; }
        .lpst-faq[open] .lpst-faq-x { transform: rotate(45deg); }
        .lpst-faq p { color: #a8a8a8; font-size: 15.5px; line-height: 1.8; padding: 0 0 24px; margin: 0; max-width: 720px; }
        .lpst-cta { text-align: center; padding: 70px 0; }
        .lpst-cta h2 { color: #fff; font-size: 54px; margin-bottom: 14px; }
        .lpst-cta p { color: #a8a8a8; font-size: 17px; max-width: 600px; margin: 0 auto 30px; line-height: 1.75; }
        .lpst-cta-link { font-size: 22px; }
        @media (max-width: 991px) {
          .lpst-hero h1 { font-size: 46px; }
          .lpst-h2 { font-size: 32px; }
          .lpst-f-grid { grid-template-columns: 1fr; gap: 30px; }
          .lpst-gallery { grid-template-columns: 1fr 1fr; }
          .lpst-split, .lpst-split-rev { flex-direction: column; }
          .lpst-split-img { flex: none; width: 100%; }
          .lpst-cta h2 { font-size: 38px; }
        }
        @media (max-width: 767px) {
          .lpst-hero { padding: 76px 0 0; }
          .lpst-hero h1 { font-size: 34px; }
          .lpst-h2 { font-size: 26px; }
          .lpst-gallery { grid-template-columns: 1fr; }
          .lpst-r-text { font-size: 20px; }
          .lpst-faq summary { font-size: 18px; }
          .lpst-cta h2 { font-size: 30px; }
          .lpst-stat-v { font-size: 38px; }
        }
        .lpst-p-ico { width: 46px; height: 46px; object-fit: contain; display: block; margin-bottom: 12px; }
        .lpst-r-ava { width: 54px; height: 54px; border-radius: 50%; object-fit: cover; margin-bottom: 14px; }
      `}</style>
    </div>
  );
}
