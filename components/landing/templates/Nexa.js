// Landing template "Nexa" — modelled on digitalnexa.com: corporate growth
// page. Split hero (text left, image right), stat boxes, service card grid
// with arrow links, scrolling logo bar. Viralon coral/gradient accents.
import React from "react";
import LeadForm from "../LeadForm";
import { HouseSection, HouseSectionStyles } from "../HouseSections";

const Stars = ({ n }) => (
  <span className="lpx-stars">{"★".repeat(Math.min(5, Math.max(1, n || 5)))}</span>
);

function Section({ sec }) {
  const d = sec.data || {};
  switch (sec.type) {
    case "intro":
      return (
        <section className="lpx-sec">
          <div className="container">
            {d.heading && <h2 className="lpx-display lpx-h2">{d.heading}</h2>}
            {d.html && <div className="manrope lpx-rich" dangerouslySetInnerHTML={{ __html: d.html }} />}
          </div>
        </section>
      );
    case "split":
      return (
        <section className="lpx-sec">
          <div className="container">
            <div className={`lpx-split ${d.reverse ? "lpx-split-rev" : ""}`}>
              {d.image && <div className="lpx-split-img"><img src={d.image} alt={d.heading || ""} /></div>}
              <div className="lpx-split-body">
                {d.heading && <h2 className="lpx-display lpx-h2">{d.heading}</h2>}
                {d.html && <div className="manrope lpx-rich" dangerouslySetInnerHTML={{ __html: d.html }} />}
              </div>
            </div>
          </div>
        </section>
      );
    case "features":
      return (
        <section className="lpx-sec">
          <div className="container">
            {d.heading && <h2 className="lpx-display lpx-h2 lpx-center">{d.heading}</h2>}
            {d.subheading && <p className="manrope lpx-subhead">{d.subheading}</p>}
            <div className="lpx-f-grid">
              {(d.items || []).map((f, i) => (
                <div className="lpx-f-card" key={i}>
                  <span className="lpx-f-dot" />
                  {f.image && <img className="lpx-f-img" src={f.image} alt={f.title} />}
                  <h3 className="manrope">{f.title}</h3>
                  <p className="manrope">{f.text}</p>
                  <span className="manrope lpx-f-link">Speak to us →</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "process":
      return (
        <section className="lpx-sec">
          <div className="container">
            {d.heading && <h2 className="lpx-display lpx-h2 lpx-center">{d.heading}</h2>}
            <div className="lpx-p-row">
              {(d.steps || []).map((s, i) => (
                <div className="lpx-p-step" key={i}>
                  <span className="manrope lpx-p-num">{i + 1}</span>
                  {s.icon && <img className="lpx-p-ico" src={s.icon} alt="" />}
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
        <section className="lpx-sec">
          <div className="container">
            {d.heading && <h2 className="lpx-display lpx-h2 lpx-center">{d.heading}</h2>}
            <div className="lpx-stats">
              {(d.items || []).map((s, i) => (
                <div className="lpx-stat" key={i}>
                  <span className="lpx-display lpx-stat-v">{s.value}</span>
                  <span className="manrope lpx-stat-l">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "gallery":
      return (
        <section className="lpx-sec">
          <div className="container">
            {d.heading && <h2 className="lpx-display lpx-h2 lpx-center">{d.heading}</h2>}
            <div className="lpx-gallery">
              {(d.images || []).map((g, i) => (
                <div className="lpx-g-item" key={i}><img src={g} alt="" /></div>
              ))}
            </div>
          </div>
        </section>
      );
    case "logos":
      return (
        <section className="lpx-sec lpx-logos-sec">
          {d.heading && <p className="manrope lpx-logos-head">{d.heading}</p>}
          <div className="lpx-logos">
            <div className="lpx-logos-track">
              {[...(d.images || []), ...(d.images || [])].map((g, i) => (
                <img src={g} alt="" key={i} />
              ))}
            </div>
          </div>
        </section>
      );
    case "reviews":
      return (
        <section className="lpx-sec">
          <div className="container">
            {d.heading && <h2 className="lpx-display lpx-h2 lpx-center">{d.heading}</h2>}
            <div className="lpx-r-grid">
              {(d.items || []).map((r, i) => (
                <div className="lpx-r-card" key={i}>
                  {r.image && <img className="lpx-r-ava" src={r.image} alt={r.name || ""} />}
                  <Stars n={r.rating} />
                  <p className="manrope lpx-r-text">“{r.text}”</p>
                  <p className="manrope lpx-r-by"><b>{r.name}</b>{r.role ? ` — ${r.role}` : ""}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "faqs":
      return (
        <section className="lpx-sec">
          <div className="container lpx-faq-wrap">
            {d.heading && <h2 className="lpx-display lpx-h2 lpx-center">{d.heading}</h2>}
            {(d.items || []).map((f, i) => (
              <details className="lpx-faq" key={i} open={i === 0}>
                <summary className="manrope">{f.q}<span className="lpx-faq-x">+</span></summary>
                <p className="manrope">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      );
    case "cta":
      return (
        <section className="lpx-sec">
          <div className="container">
            <div className="lpx-cta">
              {d.headline && <h2 className="lpx-display">{d.headline}</h2>}
              {d.text && <p className="manrope">{d.text}</p>}
              {d.ctaText && <a href={d.ctaLink || "#"} className="lpx-cta-btn manrope">{d.ctaText}</a>}
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

export default function Nexa({ page }) {
  const c = page.content || {};
  const hero = c.hero || {};
  const sections = Array.isArray(c.sections) ? c.sections : [];
  return (
    <div className="lpx">
      <section className="lpx-hero">
        <div className="container">
          <div className="lpx-hero-row">
            <div className="lpx-hero-body">
              {hero.kicker && <p className="manrope lpx-kicker">{hero.kicker}</p>}
              <h1 className="lpx-display">
                {hero.headline || page.title}
                {hero.headlineAccent && <> <span className="lpx-accent">{hero.headlineAccent}</span></>}
              </h1>
              {hero.subheadline && <p className="manrope lpx-sub">{hero.subheadline}</p>}
              {hero.ctaText && <a href={hero.ctaLink || "#"} className="lpx-hero-btn manrope">{hero.ctaText}</a>}
            </div>
            {hero.heroImage && (
              <div className="lpx-hero-img"><img src={hero.heroImage} alt="" /></div>
            )}
          </div>
        </div>
      </section>

      {sections.map((sec, i) => <Section sec={sec} key={i} />)}

      {c.showLeadForm !== false && <LeadForm slug={page.slug} />}

      <HouseSectionStyles />

      <style jsx global>{`
        .lpx { background: #1a1a1a; }
        .lpx-display { font-family: just-sans-medium, sans-serif !important; }
        .lpx-sec { padding: 45px 0; }
        .lpx-center { text-align: center; }
        .lpx-h2 { color: #fff; font-size: 44px; line-height: 1.15; margin-bottom: 22px; }
        .lpx-accent { color: #ff6f61; }
        .lpx-hero { padding: 100px 0 40px; }
        .lpx-hero-row { display: flex; align-items: center; gap: 54px; }
        .lpx-hero-body { flex: 1; }
        .lpx-kicker { color: #ff6f61; letter-spacing: 3px; text-transform: uppercase; font-size: 13.5px; margin-bottom: 18px; font-weight: 700; }
        .lpx-hero h1 { color: #fff; font-size: 56px; line-height: 1.12; margin-bottom: 20px; }
        .lpx-sub { color: #a8a8a8; font-size: 17.5px; line-height: 1.75; margin-bottom: 30px; max-width: 540px; }
        .lpx-hero-btn {
          display: inline-block; background: linear-gradient(90deg, #FF6F61 29%, #FBA065 95%);
          color: #fff; padding: 15px 38px;
          border-radius: 10px; font-weight: 700; font-size: 15px; transition: transform 0.2s ease;
        }
        .lpx-hero-btn:hover { color: #fff; transform: translateY(-2px); }
        .lpx-hero-img { flex: 0 0 42%; }
        .lpx-hero-img img { width: 100%; border-radius: 20px; border: 1px solid #403e44; }
        .lpx-rich, .lpx-rich p { color: #bfbfbf; font-size: 16.5px; line-height: 1.8; }
        .lpx-subhead { color: #a8a8a8; font-size: 16px; margin: -8px 0 28px; text-align: center; }
        .lpx-split { display: flex; gap: 50px; align-items: center; }
        .lpx-split-rev { flex-direction: row-reverse; }
        .lpx-split-img { flex: 0 0 44%; }
        .lpx-split-img img { width: 100%; border-radius: 20px; }
        .lpx-split-body { flex: 1; }
        .lpx-f-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 28px; }
        .lpx-f-card {
          background: #212121; border: 1px solid #2c2c2c; border-radius: 16px;
          padding: 30px 26px; position: relative; transition: border-color 0.25s ease, transform 0.25s ease;
        }
        .lpx-f-card:hover { border-color: #ff6f61; transform: translateY(-4px); }
        .lpx-f-dot { width: 12px; height: 12px; border-radius: 50%; background: #ff6f61; display: block; margin-bottom: 18px; }
        .lpx-f-img { width: 100%; height: 150px; object-fit: cover; border-radius: 10px; margin-bottom: 16px; }
        .lpx-f-card h3 { color: #fff; font-size: 18.5px; font-weight: 700; margin-bottom: 10px; }
        .lpx-f-card p { color: #a8a8a8; font-size: 14.5px; line-height: 1.7; margin-bottom: 16px; }
        .lpx-f-link { color: #ff6f61; font-size: 13.5px; font-weight: 700; }
        .lpx-p-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 28px; }
        .lpx-p-step { background: #212121; border-radius: 16px; padding: 28px 26px; }
        .lpx-p-num {
          width: 40px; height: 40px; border-radius: 50%; background: #ff6f61; color: #fff;
          display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 16px; margin-bottom: 16px;
        }
        .lpx-p-step h3 { color: #fff; font-size: 19px; font-weight: 700; margin-bottom: 8px; }
        .lpx-p-step p { color: #a8a8a8; font-size: 14.5px; line-height: 1.7; margin: 0; }
        .lpx-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .lpx-stat { border: 1px solid #403e44; border-radius: 16px; padding: 26px 20px; text-align: center; }
        .lpx-stat-v { color: #ff6f61; font-size: 42px; display: block; margin-bottom: 4px; }
        .lpx-stat-l { color: #a8a8a8; font-size: 13.5px; letter-spacing: 0.4px; }
        .lpx-gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-top: 26px; }
        .lpx-g-item { border-radius: 14px; overflow: hidden; }
        .lpx-g-item img { width: 100%; height: 220px; object-fit: cover; display: block; filter: grayscale(1); transition: filter 0.35s ease, transform 0.35s ease; }
        .lpx-g-item:hover img { filter: none; transform: scale(1.04); }
        .lpx-logos-sec { text-align: center; }
        .lpx-logos-head { color: #a8a8a8; letter-spacing: 2px; text-transform: uppercase; font-size: 13px; margin-bottom: 24px; }
        .lpx-logos { overflow: hidden; }
        .lpx-logos-track { display: flex; align-items: center; gap: 70px; width: max-content; animation: lpx-scroll 28s linear infinite; }
        .lpx-logos-track img { height: 42px; opacity: 0.75; transition: opacity 0.2s; }
        .lpx-logos-track img:hover { opacity: 1; }
        @keyframes lpx-scroll { to { transform: translateX(-50%); } }
        .lpx-r-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 28px; }
        .lpx-r-card { background: #212121; border: 1px solid #2c2c2c; border-radius: 16px; padding: 28px 26px; }
        .lpx-stars { color: #ffc107; font-size: 17px; letter-spacing: 3px; display: block; margin-bottom: 14px; }
        .lpx-r-text { color: #e8e8e8; font-size: 15px; line-height: 1.75; margin-bottom: 16px; }
        .lpx-r-by { color: #a8a8a8; font-size: 13.5px; margin: 0; }
        .lpx-r-by b { color: #fff; }
        .lpx-faq-wrap { max-width: 860px; }
        .lpx-faq { border: 1px solid #403e44; border-radius: 14px; margin-top: 14px; overflow: hidden; }
        .lpx-faq[open] { border-color: #ff6f61; }
        .lpx-faq summary {
          list-style: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center;
          color: #fff; font-size: 17px; font-weight: 700; padding: 20px 24px;
        }
        .lpx-faq summary::-webkit-details-marker { display: none; }
        .lpx-faq-x { color: #ff6f61; font-size: 22px; font-weight: 400; transition: transform 0.25s ease; }
        .lpx-faq[open] .lpx-faq-x { transform: rotate(45deg); }
        .lpx-faq p { color: #a8a8a8; font-size: 15px; line-height: 1.75; padding: 0 24px 20px; margin: 0; }
        .lpx-cta {
          border: 1px solid #ff6f61; border-radius: 24px; padding: 56px 40px; text-align: center;
          background: radial-gradient(ellipse at top, rgba(255,111,97,0.14), transparent 65%);
        }
        .lpx-cta h2 { color: #fff; font-size: 42px; margin-bottom: 12px; }
        .lpx-cta p { color: #bfbfbf; font-size: 16.5px; max-width: 620px; margin: 0 auto 26px; line-height: 1.7; }
        .lpx-cta-btn {
          display: inline-block; background: linear-gradient(90deg, #FF6F61 29%, #FBA065 95%);
          color: #fff; padding: 15px 40px;
          border-radius: 10px; font-weight: 700; font-size: 15px; transition: transform 0.2s ease;
        }
        .lpx-cta-btn:hover { color: #fff; transform: translateY(-2px); }
        @media (max-width: 991px) {
          .lpx-hero-row { flex-direction: column; }
          .lpx-hero-img { flex: none; width: 100%; }
          .lpx-hero h1 { font-size: 40px; }
          .lpx-h2 { font-size: 32px; }
          .lpx-f-grid, .lpx-r-grid, .lpx-p-row { grid-template-columns: 1fr 1fr; }
          .lpx-stats, .lpx-gallery { grid-template-columns: 1fr 1fr; }
          .lpx-split, .lpx-split-rev { flex-direction: column; }
          .lpx-split-img { flex: none; width: 100%; }
        }
        @media (max-width: 767px) {
          .lpx-hero { padding: 70px 0 30px; }
          .lpx-hero h1 { font-size: 30px; }
          .lpx-h2 { font-size: 26px; }
          .lpx-f-grid, .lpx-r-grid, .lpx-p-row, .lpx-gallery { grid-template-columns: 1fr; }
          .lpx-stats { grid-template-columns: 1fr 1fr; }
          .lpx-cta h2 { font-size: 27px; }
          .lpx-cta { padding: 40px 22px; }
        }
        .lpx-p-ico { width: 46px; height: 46px; object-fit: contain; display: block; margin-bottom: 12px; }
        .lpx-r-ava { width: 54px; height: 54px; border-radius: 50%; object-fit: cover; margin-bottom: 14px; }
      `}</style>
    </div>
  );
}
