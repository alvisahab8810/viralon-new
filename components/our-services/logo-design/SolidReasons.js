import React from "react";

export default function SolidReasons() {
  return (
    <section className="solid-reasons-section ptb-100">
      <div className="container  solid_reason-bx">
        <div className="row">
          {/* <!-- Left Section --> */}
         

          <div className="col-lg-6 mb-4">
            <div className="row g-3">
              <div className="col-12 col-sm-6  desktop-none super-img">
                <img
                  alt="A futuristic dashboard on a laptop screen"
                  className="img-fluid rounded shadow"
                  src="/assets/img/our-services/paid-media-marketing/img3.png"
                />
              </div>

              <div className="col-12 col-sm-6">
                <div className="about--bx bg-white ">
                  <h2 className="text-first">LET'S TALK</h2>
                  <h1 className="text-second ">About Your Next Project</h1>
                  <button className="process-btn" fdprocessedid="rut8u">
                    LET’S TALK
                  </button>
                </div>
              </div>

              <div className="col-12 col-sm-6 mt-150 p-relative z-in mobile-none">
                <div className="pattern-img">
                  <img src="/assets/img/seo/pattern.png"></img>
                </div>
                <img
                  alt="A futuristic dashboard on a laptop screen"
                  className="img-fluid rounded shadow"
                  src="/assets/img/our-services/logo-design/img1.png"
                />
              </div>
            </div>
            <div className="row g-3 mobile-none">
              <div className="col-12 col-sm-6 mt-45">
                <img
                  alt="A futuristic dashboard on a laptop screen"
                  className="img-fluid rounded shadow"
                  src="/assets/img/our-services/logo-design/img3.png"
                />
              </div>
              <div className="col-12 col-sm-6 mt-5">
                <img
                  alt="A person working on a laptop with charts on the screen"
                  className="img-fluid rounded shadow"
                  src="/assets/img/our-services/logo-design/img2.png"
                />
              </div>
            </div>
          </div>
          {/* <!-- Right Section --> */}
          <div className="col-lg-6 pl-70">
            <h2 className="process-heading">-5 Solid Reasons</h2>
            <h1 className="why-c-heading mb-4">
              Why Choose{" "}
              <span className="text-white">
                <b>Viralon</b>
              </span>
              <br />
              For Logo Design
            </h1>
            <ul className="check-img-bx list-unstyled">
              <li className="d-flex mb-4">
                <img src="/assets/img/seo/icons/arrow.png"></img>
                <div className="reasons-bxx">
                  <h3 className="reasons-points">Expert Designers</h3>
                  <p>
                    Our team consists of experienced designers with a proven
                    track record in creating impactful logos that resonate.
                  </p>
                </div>
              </li>
              <li className="d-flex mb-4">
                <img src="/assets/img/seo/icons/arrow.png"></img>

                <div className="reasons-bxx">
                  <h3 className="reasons-points">Tailored Solutions</h3>
                  <p>
                    We customize our logo design strategies to your brand’s
                    unique needs, ensuring a distinctive and memorable identity.
                  </p>
                </div>
              </li>
              <li className="d-flex mb-4">
                <img src="/assets/img/seo/icons/arrow.png"></img>

                <div className="reasons-bxx">
                  <h3 className="reasons-points">Collaborative Process</h3>
                  <p>
                    Viralon values your input we work closely with you
                    throughout the design process to achieve your vision.
                  </p>
                </div>
              </li>
              <li className="d-flex mb-4">
                <img src="/assets/img/seo/icons/arrow.png"></img>

                <div className="reasons-bxx">
                  <h3 className="reasons-points">Comprehensive Support</h3>
                  <p>
                    We provide ongoing support ensuring your logo is effectively
                    integrated into your overall branding strategy.
                  </p>
                </div>
              </li>
              <li className="d-flex ">
                <img src="/assets/img/seo/icons/arrow.png"></img>

                <div className="reasons-bxx">
                  <h3 className="reasons-points">Client-Centric Approach</h3>
                  <p>
                    We maintain transparent communication and outstanding
                    support throughout our partnership.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
