import React from "react";

export default function SolidReasons() {
  return (
    <section className="solid-reasons-section ptb-100">
      <div className="container  solid_reason-bx">
        <div className="row">
          {/* <!-- Left Section --> */}
          <div className="col-lg-6 mb-4">
            <div className="row g-3">
              <div className="col-12 col-sm-6 p-relative z-in  desktop-none super-img">
                <img
                  alt="A futuristic dashboard on a laptop screen"
                  className="img-fluid rounded shadow "
                  src="/assets/img/seo/img3.png"
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

              <div className="col-12 col-sm-6 mt-150 p-relative z-in  mobile-none">
                <div className="pattern-img">
                  <img src="/assets/img/seo/pattern.png"></img>
                </div>
                <img
                  alt="A futuristic dashboard on a laptop screen"
                  className="img-fluid rounded shadow "
                  src="/assets/img/seo/img1.png"
                />
              </div>
            </div>
            <div className="row g-3 mobile-none">
              <div className="col-12 col-sm-6 mt-45">
                <img
                  alt="A futuristic dashboard on a laptop screen"
                  className="img-fluid rounded shadow"
                  src="/assets/img/seo/img3.png"
                />
              </div>
              <div className="col-12 col-sm-6 mt-5">
                <img
                  alt="A person working on a laptop with charts on the screen"
                  className="img-fluid rounded shadow"
                  src="/assets/img/seo/img2.png"
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
              For Video Production
            </h1>
            <ul className="check-img-bx list-unstyled">
              <li className="d-flex mb-4">
                <img src="/assets/img/seo/icons/arrow.png"></img>
                <div className="reasons-bxx">
                  <h3 className="reasons-points">Expert Creative Team</h3>
                  <p>
                  Skilled professionals with a passion for crafting compelling and visually stunning videos that resonate with your audience.
                  </p>
                </div>
              </li>
              <li className="d-flex mb-4">
                <img src="/assets/img/seo/icons/arrow.png"></img>

                <div className="reasons-bxx">
                  <h3 className="reasons-points">Customized Storytelling</h3>
                  <p>
                    We believe that every brand has a unique story to tell we align the videos with your brand identity and audience.
                  </p>
                </div>
              </li>
              <li className="d-flex mb-4">
                <img src="/assets/img/seo/icons/arrow.png"></img>

                <div className="reasons-bxx">
                  <h3 className="reasons-points">State-of-the-Art Equipment </h3>
                  <p>
                    Access to the latest equipment and techniques to deliver videos that are not only visually stunning but also technically flawless.
                  </p>
                </div>
              </li>
              <li className="d-flex mb-4">
                <img src="/assets/img/seo/icons/arrow.png"></img>

                <div className="reasons-bxx">
                  <h3 className="reasons-points">Transparent Process</h3>
                  <p>
                    Our process keeps you involved, we value your input and strive to create a seamless experience from concept to completion
                  </p>
                </div>
              </li>
              <li className="d-flex mb-4">
                <img src="/assets/img/seo/icons/arrow.png"></img>

                <div className="reasons-bxx">
                  <h3 className="reasons-points">Ongoing Support</h3>
                  <p>
                    Our commitment doesn’t end with the final cut. We offer post-production services & guidance to maximise your video’s impact
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
