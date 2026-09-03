// Landing template "Bold" — modelled on Optiboom index-3: heavy display type.
// Centered hero + full-width image below, giant outlined feature numbers,
// dark stat band, horizontal workflow steps. Viralon coral gradient accent.
import React from "react";
import LeadForm from "../LeadForm";
import { HouseSection, HouseSectionStyles } from "../HouseSections";

const Stars = ({ n }) => (
  <span className="lpbd-stars">{"★".repeat(Math.min(5, Math.max(1, n || 5)))}</span>
);

function Section({ sec }) {
  const d = sec.data || {};
  switch (sec.type) {
    case "intro":
      return (
        <section className="lpbd-sec">
          <div className="container lpbd-narrow">
            {d.heading && <h2 className="lpbd-display lpbd-h2">{d.heading}</h2>}
            {d.html && <div className="manrope lpbd-rich" dangerouslySetInnerHTML={{ __html: d.html }} />}
          </div>
        </section>
      );
    case "split":
      return (
        <section className="lpbd-sec">
          <div className="container">
            <div className={`lpbd-split ${d.reverse ? "lpbd-split-rev" : ""}`}>
              {d.image && <div className="lpbd-split-img"><img src={d.image} alt={d.heading || ""} /></div>}
              <div className="lpbd-split-body">
                {d.heading && <h2 className="lpbd-display lpbd-h2">{d.heading}</h2>}
                {d.html && <div className="manrope lpbd-rich" dangerouslySetInnerHTML={{ __html: d.html }} />}
              </div>
            </div>
          </div>
        </section>
      );
    case "features":
      return (
        <section className="lpbd-sec">
          <div className="container">
            {d.heading && <h2 className="lpbd-display lpbd-h2 lpbd-center">{d.heading}</h2>}
            {d.subheading && <p className="manrope lpbd-subhead">{d.subheading}</p>}
            <div className="lpbd-f-grid">
              {(d.items || []).map((f, i) => (
                <div className="lpbd-f-card" key={i}>
                  <span className="lpbd-display lpbd-f-num">{String(i + 1).padStart(2, "0")}</span>
                  {f.image && <img className="lpbd-f-img" src={f.image} alt={f.title} />}
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
        <section className="lpbd-sec">
          <div className="container">
            {d.heading && <h2 className="lpbd-display lpbd-h2 lpbd-center">{d.heading}</h2>}
            <div className="lpbd-p-row">
              {(d.steps || []).map((s, i) => (
                <div className="lpbd-p-step" key={i}>
                  <span className="lpbd-display lpbd-p-num">{String(i + 1).padStart(2, "0")}</span>
                  {s.icon && <img className="lpbd-p-ico" src={s.icon} alt="" />}
                  <div>
                    <h3 className="manrope">{s.title}</h3>
                    <p className="manrope">{s.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "stats":
      return (
        <section className="lpbd-sec">
          <div className="container">
            <div className="lpbd-stats">
              {d.heading && <h2 className="lpbd-display lpbd-h2 lpbd-center">{d.heading}</h2>}
              <div className="lpbd-stats-row">
                {(d.items || []).map((s, i) => (
                  <div className="lpbd-stat" key={i}>
                    <span className="lpbd-display lpbd-stat-v">{s.value}</span>
                    <span className="manrope lpbd-stat-l">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    case "gallery":
      return (
        <section className="lpbd-sec">
          <div className="container">
            {d.heading && <h2 className="lpbd-display lpbd-h2 lpbd-center">{d.heading}</h2>}
            <div className="lpbd-gallery">
              {(d.images || []).map((g, i) => (
                <div className="lpbd-g-item" key={i}><img src={g} alt="" /></div>
              ))}
            </div>
          </div>
        </section>
      );
    case "logos":
      return (
        <section className="lpbd-sec lpbd-logos-sec">
          {d.heading && <p className="manrope lpbd-logos-head">{d.heading}</p>}
          <div className="lpbd-logos">
            <div className="lpbd-logos-track">
              {[...(d.images || []), ...(d.images || [])].map((g, i) => (
                <img src={g} alt="" key={i} />
              ))}
            </div>
          </div>
        </section>
      );
    case "reviews":
      return (
        <section className="lpbd-sec">
          <div className="container">
            {d.heading && <h2 className="lpbd-display lpbd-h2 lpbd-center">{d.heading}</h2>}
            <div className="lpbd-r-grid">
              {(d.items || []).map((r, i) => (
                <div className="lpbd-r-card" key={i}>
                  {r.image && <img className="lpbd-r-ava" src={r.image} alt={r.name || ""} />}
                  <Stars n={r.rating} />
                  <p className="manrope lpbd-r-text">“{r.text}”</p>
                  <p className="manrope lpbd-r-by"><b>{r.name}</b>{r.role ? ` — ${r.role}` : ""}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    case "faqs":
      return (
        <section className="lpbd-sec">
          <div className="container lpbd-narrow">
            {d.heading && <h2 className="lpbd-display lpbd-h2 lpbd-center">{d.heading}</h2>}
            {(d.items || []).map((f, i) => (
              <details className="lpbd-faq" key={i} open={i === 0}>
                <summary className="manrope">{f.q}<span className="lpbd-faq-x">+</span></summary>
                <p className="manrope">{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      );
    case "cta":
      return (
        <section className="lpbd-sec">
          <div className="container">
            <div className="lpbd-cta">
              {d.headline && <h2 className="lpbd-display">{d.headline}</h2>}
              {d.text && <p className="manrope">{d.text}</p>}
              {d.ctaText && <a href={d.ctaLink || "#"} className="lpbd-cta-btn manrope">{d.ctaText}</a>}
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

export default function Bold({ page }) {
  const c = page.content || {};
  const hero = c.hero || {};
  const sections = Array.isArray(c.sections) ? c.sections : [];
  return (
    <div className="lpbd">
      <section className="lpbd-hero">
        <div className="container">
          {hero.kicker && <p className="manrope lpbd-kicker">{hero.kicker}</p>}
          <h1 className="lpbd-display">
            {hero.headline || page.title}
            {hero.headlineAccent && <> <span className="lpbd-grad">{hero.headlineAccent}</span></>}
          </h1>
          {hero.subheadline && <p className="manrope lpbd-sub">{hero.subheadline}</p>}
          {hero.ctaText && <a href={hero.ctaLink || "#"} className="lpbd-hero-btn manrope">{hero.ctaText}</a>}
          {hero.heroImage && (
            <div className="lpbd-hero-img"><img src={hero.heroImage} alt="" /></div>
          )}
        </div>
      </section>

      {sections.map((sec, i) => <Section sec={sec} key={i} />)}

      {c.showLeadForm !== false && <LeadForm slug={page.slug} />}

      <HouseSectionStyles />

      <style jsx global>{`
        .lpbd { background: #1a1a1a; }
        .lpbd-display { font-family: just-sans, sans-serif !important; }
        .lpbd-sec { padding: 45px 0; }
        .lpbd-center { text-align: center; }
        .lpbd-narrow { max-width: 900px; }
        .lpbd-h2 { color: #fff; font-size: 48px; text-transform: uppercase; line-height: 1.08; margin-bottom: 22px; }
        .lpbd-grad {
          background: linear-gradient(90deg, #FF6F61 29%, #FBA065 95%);
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        }
        .lpbd-hero { padding: 100px 0 40px; text-align: center; }
        .lpbd-kicker { color: #ff6f61; letter-spacing: 3px; text-transform: uppercase; font-size: 13.5px; font-weight: 700; margin-bottom: 18px; }
        .lpbd-hero h1 { color: #fff; font-size: 88px; text-transform: uppercase; line-height: 0.98; max-width: 1000px; margin: 0 auto 22px; }
        .lpbd-sub { color: #a8a8a8; font-size: 18px; line-height: 1.75; max-width: 640px; margin: 0 auto 30px; }
        .lpbd-hero-btn {
          display: inline-block; background: linear-gradient(90deg, #FF6F61 29%, #FBA065 95%);
          color: #1d1d1d; padding: 16px 44px; border-radius: 999px; font-weight: 800; font-size: 15px;
          transition: transform 0.2s ease;
        }
        .lpbd-hero-btn:hover { color: #1d1d1d; transform: translateY(-2px); }
        .lpbd-hero-img { margin-top: 56px; }
        .lpbd-hero-img img { width: 100%; border-radius: 24px; }
        .lpbd-rich, .lpbd-rich p { color: #bfbfbf; font-size: 16.5px; line-height: 1.8; }
        .lpbd-subhead { color: #a8a8a8; font-size: 16px; margin: -8px 0 28px; text-align: center; }
        .lpbd-split { display: flex; gap: 50px; align-items: center; }
        .lpbd-split-rev { flex-direction: row-reverse; }
        .lpbd-split-img { flex: 0 0 44%; }
        .lpbd-split-img img { width: 100%; border-radius: 20px; }
        .lpbd-split-body { flex: 1; }
        .lpbd-f-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; margin-top: 30px; }
        .lpbd-f-card { background: #212121; border-radius: 18px; padding: 32px 28px; transition: transform 0.25s ease; }
        .lpbd-f-card:hover { transform: translateY(-5px); }
        .lpbd-f-num {
          font-size: 64px; line-height: 1; display: block; margin-bottom: 16px;
          color: transparent; -webkit-text-stroke: 1.5px #ff6f61;
        }
        .lpbd-f-img { width: 100%; height: 150px; object-fit: cover; border-radius: 12px; margin-bottom: 16px; }
        .lpbd-f-card h3 { color: #fff; font-size: 20px; font-weight: 700; margin-bottom: 10px; }
        .lpbd-f-card p { color: #a8a8a8; font-size: 14.5px; line-height: 1.7; margin: 0; }
        .lpbd-p-row { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; margin-top: 30px; border-top: 1px solid #403e44; }
        .lpbd-p-step { display: flex; gap: 20px; padding: 34px 26px; border-left: 1px solid #403e44; }
        .lpbd-p-step:first-child { border-left: none; }
        .lpbd-p-num { color: transparent; -webkit-text-stroke: 1.5px #fba065; font-size: 52px; line-height: 1; flex-shrink: 0; }
        .lpbd-p-step h3 { color: #fff; font-size: 19px; font-weight: 700; margin-bottom: 8px; }
        .lpbd-p-step p { color: #a8a8a8; font-size: 14.5px; line-height: 1.7; margin: 0; }
        .lpbd-stats { background: #262525; border-radius: 24px; padding: 50px 40px; }
        .lpbd-stats .lpbd-h2 { margin-bottom: 34px; }
        .lpbd-stats-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; text-align: center; }
        .lpbd-stat-v {
          font-size: 62px; display: block; line-height: 1.1;
          background: linear-gradient(90deg, #FF6F61 29%, #FBA065 95%);
          -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
        }
        .lpbd-stat-l { color: #a8a8a8; font-size: 13.5px; letter-spacing: 0.4px; }
        .lpbd-gallery { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 28px; }
        .lpbd-g-item { border-radius: 18px; overflow: hidden; }
        .lpbd-g-item img { width: 100%; height: 260px; object-fit: cover; display: block; transition: transform 0.35s ease; }
        .lpbd-g-item:hover img { transform: scale(1.06); }
        .lpbd-logos-sec { text-align: center; }
        .lpbd-logos-head { color: #a8a8a8; letter-spacing: 2px; text-transform: uppercase; font-size: 13px; margin-bottom: 24px; }
        .lpbd-logos { overflow: hidden; }
        .lpbd-logos-track { display: flex; align-items: center; gap: 70px; width: max-content; animation: lpbd-scroll 28s linear infinite; }
        .lpbd-logos-track img { height: 42px; opacity: 0.75; }
        @keyframes lpbd-scroll { to { transform: translateX(-50%); } }
        .lpbd-r-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 30px; }
        .lpbd-r-card { background: #212121; border-radius: 18px; padding: 30px 28px; }
        .lpbd-stars { color: #ffc107; font-size: 17px; letter-spacing: 3px; display: block; margin-bottom: 14px; }
        .lpbd-r-text { color: #e8e8e8; font-size: 15px; line-height: 1.75; margin-bottom: 16px; }
        .lpbd-r-by { color: #a8a8a8; font-size: 13.5px; margin: 0; }
        .lpbd-r-by b { color: #fff; }
        .lpbd-faq { background: #212121; border-radius: 14px; margin-top: 14px; overflow: hidden; border: 1px solid transparent; }
        .lpbd-faq[open] { border-color: #ff6f61; }
        .lpbd-faq summary {
          list-style: none; cursor: pointer; display: flex; justify-content: space-between; align-items: center;
          color: #fff; font-size: 17px; font-weight: 700; padding: 20px 24px;
        }
        .lpbd-faq summary::-webkit-details-marker { display: none; }
        .lpbd-faq-x { color: #ff6f61; font-size: 22px; transition: transform 0.25s ease; }
        .lpbd-faq[open] .lpbd-faq-x { transform: rotate(45deg); }
        .lpbd-faq p { color: #a8a8a8; font-size: 15px; line-height: 1.75; padding: 0 24px 20px; margin: 0; }
        .lpbd-cta {
          background: linear-gradient(90deg, #FF6F61 29%, #FBA065 95%);
          border-radius: 28px; padding: 60px 40px; text-align: center;
        }
        .lpbd-cta h2 { color: #1d1d1d; font-size: 46px; text-transform: uppercase; margin-bottom: 12px; }
        .lpbd-cta p { color: rgba(29,29,29,0.82); font-size: 16.5px; max-width: 620px; margin: 0 auto 26px; line-height: 1.7; font-weight: 600; }
        .lpbd-cta-btn {
          display: inline-block; background: #1d1d1d; color: #fff; padding: 15px 42px;
          border-radius: 999px; font-weight: 800; font-size: 15px; transition: transform 0.2s ease;
        }
        .lpbd-cta-btn:hover { color: #fff; transform: translateY(-2px); }
        @media (max-width: 991px) {
          .lpbd-hero h1 { font-size: 56px; }
          .lpbd-h2 { font-size: 34px; }
          .lpbd-f-grid, .lpbd-r-grid, .lpbd-gallery { grid-template-columns: 1fr 1fr; }
          .lpbd-p-row { grid-template-columns: 1fr; }
          .lpbd-p-step { border-left: none; border-top: 1px solid #403e44; }
          .lpbd-p-step:first-child { border-top: none; }
          .lpbd-stats-row { grid-template-columns: 1fr 1fr; }
          .lpbd-split, .lpbd-split-rev { flex-direction: column; }
          .lpbd-split-img { flex: none; width: 100%; }
        }
        @media (max-width: 767px) {
          .lpbd-hero { padding: 70px 0 30px; }
          .lpbd-hero h1 { font-size: 38px; }
          .lpbd-h2 { font-size: 27px; }
          .lpbd-f-grid, .lpbd-r-grid, .lpbd-gallery { grid-template-columns: 1fr; }
          .lpbd-stat-v { font-size: 44px; }
          .lpbd-cta h2 { font-size: 29px; }
          .lpbd-cta { padding: 42px 22px; }
        }
        .lpbd-p-ico { width: 46px; height: 46px; object-fit: contain; display: block; margin-bottom: 12px; }
        .lpbd-r-ava { width: 54px; height: 54px; border-radius: 50%; object-fit: cover; margin-bottom: 14px; }
      `}</style>
    </div>
  );
}
