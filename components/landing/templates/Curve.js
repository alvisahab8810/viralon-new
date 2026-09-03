// Landing template "Curve" — modelled on growthcurve.co: bold centered display
// hero, reviews pulled up front, gradient CTAs, dark high-contrast cards.
// Renders any section list (v2 content shape: { hero, sections, showLeadForm }).
import React from "react";
import LeadForm from "../LeadForm";
import { HouseSection, HouseSectionStyles } from "../HouseSections";

const Stars = ({ n }) => (
  <span className="lpc-stars">{"★".repeat(Math.min(5, Math.max(1, n || 5)))}</span>
);

function Section({ sec }) {
  const d = sec.data || {};
  switch (sec.type) {
    case "intro":
      return (
        <section className="lpc-sec lpc-intro">
          <div className="container">
            {d.heading && <h2 className="lpc-display lpc-h2">{d.heading}</h2>}
            {d.html && <div className="manrope lpc-rich" dangerouslySetInnerHTML={{ __html: d.html }} />}
          </div>
        </section>
      );
    case "split":
      return (
        <section className="lpc-sec">
          <div className="container">
            <div className={`lpc-split ${d.reverse ? "lpc-split-rev" : ""}`}>
              {d.image && <div className="lpc-split-img"><img src={d.image} alt={d.heading || ""} /></div>}
              <div className="lpc-split-body">
                {d.heading && <h2 className="lpc-display lpc-h2">{d.heading}</h2>}
                {d.html && <div className="manrope lpc-rich" dangerouslySetInnerHTML={{ __html: d.html }} />}
              </div>
            </div>
          </div>
        </section>
      );
    case "features":
      return (
        <section className="lpc-sec">
          <div className="container">
            {d.heading && <h2 className="lpc-display lpc-h2 lpc-center">{d.heading}</h2>}
            {d.subheading && <p className="manrope lpc-subhead">{d.subheading}</p>}
            <div className="lpc-f-grid">
              {(d.items || []).map((f, i) => (
                <div className="lpc-f-card" key={i}>
                  {f.image && <img className="lpc-f-img" src={f.image} alt={f.title} />}
                  <h3 className="manrope">{f.title}</h3>
                  <p className="manrope">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "process":
      return (
        <section className="lpc-sec">
          <div className="container">
            {d.heading && <h2 className="lpc-display lpc-h2 lpc-center">{d.heading}</h2>}
            <div className="lpc-p-row">
              {(d.steps || []).map((s, i) => (
                <div className="lpc-p-step" key={i}>
                  <span className="lpc-display lpc-p-num">{String(i + 1).padStart(2, "0")}</span>
                  {s.icon && <img className="lpc-p-ico" src={s.icon} alt="" />}
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
        <section className="lpc-sec">
          <div className="container">
            {d.heading && <h2 className="lpc-display lpc-h2 lpc-center">{d.heading}</h2>}
            <div className="lpc-stats">
              {(d.items || []).map((s, i) => (
                <div className="lpc-stat" key={i}>
                  <span className="lpc-display lpc-stat-v">{s.value}</span>
                  <span className="manrope lpc-stat-l">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "gallery":
      return (
        <section className="lpc-sec">
          <div className="container">
            {d.heading && <h2 className="lpc-display lpc-h2 lpc-center">{d.heading}</h2>}
            <div className="lpc-gallery">
              {(d.images || []).map((g, i) => (
                <div className="lpc-g-item" key={i}><img src={g} alt="" /></div>
              ))}
            </div>
          </div>
        </section>
      );
    case "logos":
      return (
        <section className="lpc-sec lpc-logos-sec">
          {d.heading && <p className="manrope lpc-logos-head">{d.heading}</p>}
          <div className="lpc-logos">
            <div className="lpc-logos-track">
              {[...(d.images || []), ...(d.images || [])].map((g, i) => (
                <img src={g} alt="" key={i} />
              ))}
            </div>
          </div>
        </section>
      );
    case "reviews":
      return (
        <section className="lpc-sec">
          <div className="container">
            {d.heading && <h2 className="lpc-display lpc-h2 lpc-center">{d.heading}</h2>}
            <div className="lpc-r-grid">
              {(d.items || []).map((r, i) => (
                <div className="lpc-r-card" key={i}>
                  {r.image && <img className="lpc-r-ava" src={r.image} alt={r.name || ""} />}
                  <Stars n={r.rating} />
                  <p className="manrope lpc-r-text">“{r.text}”</p>
                  <p className="manrope lpc-r-by"><b>{r.name}</b>{r.role ? ` — ${r.role}` : ""}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "faqs":
      return (
        <section className="lpc-sec">
          <div className="container lpc-faq-wrap">
            {d.heading && <h2 className="lpc-display lpc-h2 lpc-center">{d.heading}</h2>}
            {(d.items || []).map((f, i) => (
              <details className="lpc-faq" key={i} open={i === 0}>
                <summary className="manrope">{f.q}<span className="lpc-faq-x">+</span></summary>
                <p className="manrope">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      );
    case "cta":
      return (
        <section className="lpc-sec">
          <div className="container">
            <div className="lpc-cta">
              {d.headline && <h2 className="lpc-display">{d.headline}</h2>}
              {d.text && <p className="manrope">{d.text}</p>}
              {d.ctaText && <a href={d.ctaLink || "#"} className="lpc-cta-btn manrope">{d.ctaText}</a>}
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

export default function Curve({ page }) {
  const c = page.content || {};
  const hero = c.hero || {};
  const sections = Array.isArray(c.sections) ? c.sections : [];
  return (
    <div className="lpc">
      <section className="lpc-hero">
        <div className="container">
          {hero.kicker && <p className="manrope lpc-kicker">{hero.kicker}</p>}
          <h1 className="lpc-display">
            {hero.headline || page.title}
            {hero.headlineAccent && <> <span className="lpc-grad">{hero.headlineAccent}</span></>}
          </h1>
          {hero.subheadline && <p className="manrope lpc-sub">{hero.subheadline}</p>}
          {hero.ctaText && <a href={hero.ctaLink || "#"} className="lpc-hero-btn manrope">{hero.ctaText}</a>}
          {hero.heroImage && <div className="lpc-hero-img"><img src={hero.heroImage} alt="" /></div>}
        </div>
      </section>

      {sections.map((sec, i) => <Section sec={sec} key={i} />)}

      {c.showLeadForm !== false && <LeadForm slug={page.slug} />}

      <HouseSectionStyles />

      <style jsx global>{`
        .lpc { background: #1a1a1a; }
        .lpc-display { font-family: just-sans, sans-serif !important; }
        .lpc-sec { padding: 45px 0; }
        .lpc-center { text-align: center; }
        .lpc-h2 { color: #fff; font-size: 46px; text-transform: uppercase; line-height: 1.1; margin-bottom: 22px; }
        .lpc-grad {
          background: linear-gradient(90deg, #ff6f61 29%, #fba065 95%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .lpc-hero { padding: 110px 0 40px; text-align: center; }
        .lpc-kicker { color: #ff6f61; letter-spacing: 3px; text-transform: uppercase; font-size: 14px; margin-bottom: 18px; }
        .lpc-hero h1 { color: #fff; font-size: 84px; text-transform: uppercase; line-height: 1.02; margin-bottom: 22px; }
        .lpc-sub { color: #a8a8a8; font-size: 19px; max-width: 640px; margin: 0 auto 30px; line-height: 1.7; }
        .lpc-hero-btn {
          display: inline-block; background: linear-gradient(90deg, #ff6f61 29%, #fba065 95%);
          color: #fff; padding: 16px 42px; border-radius: 999px; font-weight: 700; font-size: 16px;
          transition: transform 0.2s ease;
        }
        .lpc-hero-btn:hover { color: #fff; transform: translateY(-2px); }
        .lpc-hero-img { margin-top: 46px; }
        .lpc-hero-img img { width: 100%; max-height: 520px; object-fit: cover; border-radius: 28px; }
        .lpc-intro .lpc-rich { max-width: 760px; }
        .lpc-rich, .lpc-rich p { color: #bfbfbf; font-size: 17px; line-height: 1.8; }
        .lpc-subhead { color: #a8a8a8; font-size: 16.5px; margin: -8px 0 30px; text-align: center; }
        .lpc-split { display: flex; gap: 50px; align-items: center; }
        .lpc-split-rev { flex-direction: row-reverse; }
        .lpc-split-img { flex: 0 0 44%; }
        .lpc-split-img img { width: 100%; border-radius: 24px; }
        .lpc-split-body { flex: 1; }
        .lpc-f-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 30px; }
        .lpc-f-card {
          background: #212121; border-radius: 18px; padding: 32px 28px;
          border-top: 3px solid transparent; transition: border-color 0.25s ease, transform 0.25s ease;
        }
        .lpc-f-card:hover { border-top-color: #ff6f61; transform: translateY(-4px); }
        .lpc-f-img { width: 100%; height: 160px; object-fit: cover; border-radius: 12px; margin-bottom: 18px; }
        .lpc-f-card h3 { color: #fff; font-size: 19px; font-weight: 700; margin-bottom: 10px; }
        .lpc-f-card p { color: #a8a8a8; font-size: 14.5px; line-height: 1.7; margin: 0; }
        .lpc-p-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 34px; margin-top: 30px; }
        .lpc-p-num {
          font-size: 52px; display: block; margin-bottom: 10px;
          background: linear-gradient(90deg, #ff6f61 29%, #fba065 95%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .lpc-p-step h3 { color: #fff; font-size: 20px; font-weight: 700; margin-bottom: 8px; }
        .lpc-p-step p { color: #a8a8a8; font-size: 14.5px; line-height: 1.7; margin: 0; }
        .lpc-stats { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 26px; border-top: 1px solid #403e44; border-bottom: 1px solid #403e44; padding: 40px 0; }
        .lpc-stat { text-align: center; }
        .lpc-stat-v {
          font-size: 58px; display: block;
          background: linear-gradient(90deg, #ff6f61 29%, #fba065 95%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .lpc-stat-l { color: #a8a8a8; font-size: 14px; letter-spacing: 0.5px; }
        .lpc-gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; margin-top: 26px; }
        .lpc-g-item { border-radius: 18px; overflow: hidden; }
        .lpc-g-item img { width: 100%; height: 260px; object-fit: cover; display: block; transition: transform 0.35s ease; }
        .lpc-g-item:hover img { transform: scale(1.05); }
        .lpc-logos-sec { text-align: center; }
        .lpc-logos-head { color: #a8a8a8; letter-spacing: 2px; text-transform: uppercase; font-size: 13px; margin-bottom: 24px; }
        .lpc-logos { overflow: hidden; }
        .lpc-logos-track { display: flex; align-items: center; gap: 70px; width: max-content; animation: lpc-scroll 28s linear infinite; }
        .lpc-logos-track img { height: 44px; opacity: 0.75; transition: opacity 0.2s; }
        .lpc-logos-track img:hover { opacity: 1; }
        @keyframes lpc-scroll { to { transform: translateX(-50%); } }
        .lpc-r-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 30px; }
        .lpc-r-card { background: #212121; border-radius: 18px; padding: 30px 28px; border: 1px solid #2c2c2c; }
        .lpc-stars { color: #ffc107; font-size: 18px; letter-spacing: 3px; display: block; margin-bottom: 14px; }
        .lpc-r-text { color: #e8e8e8; font-size: 15.5px; line-height: 1.75; margin-bottom: 16px; }
        .lpc-r-by { color: #a8a8a8; font-size: 13.5px; margin: 0; }
        .lpc-r-by b { color: #fff; }
        .lpc-faq-wrap { max-width: 860px; }
        .lpc-faq { background: #212121; border: 1px solid #333; border-radius: 14px; margin-top: 14px; overflow: hidden; }
        .lpc-faq[open] { border-color: #ff6f61; }
        .lpc-faq summary {
          list-style: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center;
          color: #fff; font-size: 17px; font-weight: 700; padding: 20px 24px;
        }
        .lpc-faq summary::-webkit-details-marker { display: none; }
        .lpc-faq-x { color: #ff6f61; font-size: 22px; font-weight: 400; transition: transform 0.25s ease; }
        .lpc-faq[open] .lpc-faq-x { transform: rotate(45deg); }
        .lpc-faq p { color: #a8a8a8; font-size: 15px; line-height: 1.75; padding: 0 24px 20px; margin: 0; }
        .lpc-cta {
          background: linear-gradient(90deg, #ff6f61 29%, #fba065 95%);
          border-radius: 28px; padding: 60px 40px; text-align: center;
        }
        .lpc-cta h2 { color: #fff; font-size: 44px; text-transform: uppercase; margin-bottom: 12px; }
        .lpc-cta p { color: rgba(255,255,255,0.92); font-size: 17px; max-width: 620px; margin: 0 auto 26px; line-height: 1.7; }
        .lpc-cta-btn {
          display: inline-block; background: #1d1d1d; color: #fff; padding: 15px 40px;
          border-radius: 999px; font-weight: 700; font-size: 15px; transition: transform 0.2s ease;
        }
        .lpc-cta-btn:hover { color: #fff; transform: translateY(-2px); }
        @media (max-width: 991px) {
          .lpc-hero h1 { font-size: 56px; }
          .lpc-h2 { font-size: 34px; }
          .lpc-f-grid, .lpc-r-grid, .lpc-gallery, .lpc-p-row { grid-template-columns: 1fr 1fr; }
          .lpc-split, .lpc-split-rev { flex-direction: column; }
          .lpc-split-img { flex: none; width: 100%; }
        }
        @media (max-width: 767px) {
          .lpc-hero { padding: 70px 0 30px; }
          .lpc-hero h1 { font-size: 38px; }
          .lpc-h2 { font-size: 27px; }
          .lpc-sub { font-size: 16px; }
          .lpc-f-grid, .lpc-r-grid, .lpc-gallery, .lpc-p-row { grid-template-columns: 1fr; }
          .lpc-stat-v { font-size: 42px; }
          .lpc-cta h2 { font-size: 28px; }
          .lpc-cta { padding: 44px 22px; }
        }
        .lpc-p-ico { width: 46px; height: 46px; object-fit: contain; display: block; margin-bottom: 12px; }
        .lpc-r-ava { width: 54px; height: 54px; border-radius: 50%; object-fit: cover; margin-bottom: 14px; }
      `}</style>
    </div>
  );
}
