import React from "react";

/*
 * The client logo strip under the hero.
 *
 * The heading and the logos come from the home record the CRM holds when
 * there is one; the list below is what ships with the file, so a bare
 * <Partnering /> renders exactly what it always did.
 */
const COPY = { heading: "Proudly Partnering" };

const LOGOS = [1, 2, 3, 4, 5, 1, 1, 2, 3, 4, 5, 1].map((n) => ({
  img: "/assets/img/home/clients-logos/partner" + n + ".png",
  alt: "",
}));

export default function Partnering({ d = {} }) {
  const c = { ...COPY };
  for (const k of Object.keys(COPY)) if (d[k]) c[k] = d[k];
  const logos = d.logos?.length ? d.logos.filter((l) => l.img) : LOGOS;

  return (
    <>
      <section className="partnering-section pt-100">
        <div className="container">
          <div className="company-design-area ">
            <div className="row">
              <div className="col-lg-12">
                <h2>{c.heading}</h2>
                <div className="company-list ">
                  <div
                    className="scroller"
                    data-direction="left"
                    data-speed="slow"
                    data-lag="0"
                    data-animated="true"
                  >
                    <div className="scroller__inner">
                      {logos.map((logo, i) => (
                        <img
                          key={logo.img + i}
                          src={logo.img}
                          alt={logo.alt || ""}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
