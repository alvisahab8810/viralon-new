import React, { useEffect, useState } from "react";

/*
 * Ring Navigator — geometry transcribed from the Figma component.
 * Everything (including the centre copy) lives inside the SVG so the whole
 * thing scales as one unit and the proportions stay px-to-px with the design
 * no matter how wide the column ends up being.
 */
const VIEW = 600;
const C = VIEW / 2;

const BG_RADIUS = 272.6; // Figma "Ellipse" — 545.29 dia
const INACTIVE_INNER = 194;
const INACTIVE_OUTER = 287;
const ACTIVE_INNER = 167;
const ACTIVE_OUTER = 296;
const INACTIVE_SPAN = 25; // half-span in degrees
const ACTIVE_SPAN = 28;
const LABEL_RADIUS = 240; // fixed — numbers don't move when a segment grows
const CORNER = 8;

// Arrow tip sits between the segment's inner edge and its number.
const ARROW_END = 205;
// clock-arrow.svg is authored pointing at 30deg with its tip at this point.
const ARROW_TIP_X = 202.435;
const ARROW_TIP_Y = 0.891835;
const ARROW_BASE_ANGLE = 30;

const AUTO_INTERVAL = 2800;

const WHEEL_ITEMS = [
  {
    num: "01",
    title: "Brand",
    desc: ["Why they pick you over", "the cheaper one."],
  },
  {
    num: "02",
    title: "Social content",
    desc: ["Builds demand before", "anyone searches."],
  },
  {
    num: "03",
    title: "Search",
    desc: ["Captures intent the moment", "they look for you."],
  },
  {
    num: "04",
    title: "Paid ads",
    desc: ["Reaches everyone else, at a", "cost we hold."],
  },
  {
    num: "05",
    title: "Website",
    desc: ["Turns the visit into an", "enquiry."],
  },
  {
    num: "06",
    title: "Tracking",
    desc: ["Shows exactly what's", "actually working."],
  },
];

function polar(cx, cy, r, angleDeg) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

// Donut wedge with rounded corners, drawn clockwise from a1 to a2.
function wedgePath(cx, cy, ri, ro, centerAngle, halfSpan, r) {
  const a1 = centerAngle - halfSpan;
  const a2 = centerAngle + halfSpan;
  const dOuter = ((r / ro) * 180) / Math.PI;
  const dInner = ((r / ri) * 180) / Math.PI;

  const p1 = polar(cx, cy, ro, a1 + dOuter);
  const p2 = polar(cx, cy, ro, a2 - dOuter);
  const c2 = polar(cx, cy, ro, a2);
  const p3 = polar(cx, cy, ro - r, a2);
  const p4 = polar(cx, cy, ri + r, a2);
  const c4 = polar(cx, cy, ri, a2);
  const p5 = polar(cx, cy, ri, a2 - dInner);
  const p6 = polar(cx, cy, ri, a1 + dInner);
  const c6 = polar(cx, cy, ri, a1);
  const p7 = polar(cx, cy, ri + r, a1);
  const p8 = polar(cx, cy, ro - r, a1);
  const c8 = polar(cx, cy, ro, a1);

  return [
    `M ${p1.x} ${p1.y}`,
    `A ${ro} ${ro} 0 0 1 ${p2.x} ${p2.y}`,
    `Q ${c2.x} ${c2.y} ${p3.x} ${p3.y}`,
    `L ${p4.x} ${p4.y}`,
    `Q ${c4.x} ${c4.y} ${p5.x} ${p5.y}`,
    `A ${ri} ${ri} 0 0 0 ${p6.x} ${p6.y}`,
    `Q ${c6.x} ${c6.y} ${p7.x} ${p7.y}`,
    `L ${p8.x} ${p8.y}`,
    `Q ${c8.x} ${c8.y} ${p1.x} ${p1.y}`,
    "Z",
  ].join(" ");
}

export default function Hero() {
  // `step` only ever counts up so the hand always sweeps clockwise and never
  // winds back the long way when it passes 06 -> 01.
  const [step, setStep] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setStep((s) => s + 1), AUTO_INTERVAL);
    return () => clearInterval(id);
  }, []);

  const active = step % WHEEL_ITEMS.length;
  const item = WHEEL_ITEMS[active];

  // The hand is drawn once in its authored 30deg pose, then pivoted about the
  // centre of the ring. Its tail runs back through the middle and is covered
  // by the centre copy, which paints after it.
  const baseTip = polar(C, C, ARROW_END, ARROW_BASE_ANGLE);
  const armOffsetX = baseTip.x - ARROW_TIP_X;
  const armOffsetY = baseTip.y - ARROW_TIP_Y;

  return (
    <section className="hero-section-new">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-copy">
            {/* 598.07px box, 73.5/71.4/-1.26 -- wraps to the same three lines
                as Figma without hard breaks. The strike is line.svg, laid over
                the span rather than a text-decoration rule. */}
            <h1 className="hero-heading">
              Qualified <br/>leads come from{" "}
              <span className="hero-strike">one channel.</span>
            </h1>
            <p className="hero-sub">
              They come from{" "}
              <strong>
                brand, social content, search, paid ads, website and tracking
              </strong>
              , working as one machine. <br/><span className="orange-col">We build that machine.</span>
            </p>
            <div className="hero-stat-badge">
              Across 15 brands, this machine increased qualified leads by an
              average of{" "}
              <img
                src="/assets/images/icons/state.svg"
                alt="40%"
                className="hero-stat-figure"
              />
            </div>
          </div>

          <div className="hero-wheel-wrap">
            <svg
              viewBox={`0 0 ${VIEW} ${VIEW}`}
              className="hero-wheel-svg"
              role="img"
              aria-label={`${item.title}: ${item.desc.join(" ")}`}
            >
              <defs>
                {/* gradient lifted verbatim from clock-arrow.svg */}
                <linearGradient
                  id="heroArrowFade"
                  gradientUnits="userSpaceOnUse"
                  x1="201.54"
                  y1="3.64279"
                  x2="108.431"
                  y2="162.241"
                >
                  <stop stopColor="#FE4601" />
                  <stop offset="0.55" stopColor="#160F32" stopOpacity="0" />
                </linearGradient>
              </defs>

              <circle cx={C} cy={C} r={BG_RADIUS} className="hero-wheel-bg" />

              {WHEEL_ITEMS.map((seg, i) => {
                const centerAngle = i * 60 + 30;
                const isActive = i === active;
                const label = polar(C, C, LABEL_RADIUS, centerAngle);
                return (
                  <g
                    key={seg.num}
                    className={`hero-wedge${isActive ? " is-active" : ""}`}
                  >
                    <path
                      className="hero-wedge-path"
                      d={wedgePath(
                        C,
                        C,
                        isActive ? ACTIVE_INNER : INACTIVE_INNER,
                        isActive ? ACTIVE_OUTER : INACTIVE_OUTER,
                        centerAngle,
                        isActive ? ACTIVE_SPAN : INACTIVE_SPAN,
                        CORNER
                      )}
                    />
                    <text
                      className="hero-wedge-num"
                      x={label.x}
                      y={label.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      {seg.num}
                    </text>
                  </g>
                );
              })}

              <g
                className="hero-wheel-arrow"
                style={{ transform: `rotate(${step * 60}deg)` }}
              >
                <g transform={`translate(${armOffsetX} ${armOffsetY})`}>
                  <path
                    d="M202.435 0.891835C202.263 0.250155 201.603 -0.130646 200.962 0.0412916L190.505 2.84318C189.863 3.01511 189.482 3.67468 189.654 4.31636C189.826 4.95804 190.486 5.33884 191.128 5.1669L200.422 2.67634L202.913 11.9713C203.085 12.6129 203.744 12.9937 204.386 12.8218C205.028 12.6499 205.409 11.9903 205.237 11.3486L202.435 0.891835ZM1.0415 348.014L2.0832 348.616L202.315 1.80458L201.273 1.20316L200.231 0.601731L-0.000194788 347.413L1.0415 348.014Z"
                    fill="url(#heroArrowFade)"
                  />
                </g>
              </g>

              <g className="hero-wheel-center" key={active}>
                <text
                  className="hero-wheel-part"
                  x={C}
                  y={246}
                  textAnchor="middle"
                >
                  PART {item.num}
                </text>
                <text
                  className="hero-wheel-title"
                  x={C}
                  y={311}
                  textAnchor="middle"
                >
                  {item.title}
                </text>
                <text
                  className="hero-wheel-desc"
                  x={C}
                  y={348}
                  textAnchor="middle"
                >
                  {item.desc[0]}
                </text>
                <text
                  className="hero-wheel-desc"
                  x={C}
                  y={376}
                  textAnchor="middle"
                >
                  {item.desc[1]}
                </text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
