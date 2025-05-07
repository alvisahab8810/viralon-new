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
                  src="/assets/img/our-services/branding/item3.png"
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
                  src="/assets/img/our-services/packaging/item2.png"
                />
              </div>
            </div>
            <div className="row g-3 mobile-none">
              <div className="col-12 col-sm-6 mt-45">
                <img
                  alt="A futuristic dashboard on a laptop screen"
                  className="img-fluid rounded shadow"
                  src="/assets/img/our-services/packaging/item1.png"
                />
              </div>
              <div className="col-12 col-sm-6 mt-5">
                <img
                  alt="A person working on a laptop with charts on the screen"
                  className="img-fluid rounded shadow"
                  src="/assets/img/our-services/packaging/item3.png"
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
              For Branding Services
            </h1>
            <ul className="check-img-bx list-unstyled">
              <li className="d-flex mb-4">
                <img src="/assets/img/seo/icons/arrow.png"></img>
                <div className="reasons-bxx">
                  <h3 className="reasons-points">Expert Designers</h3>
                  <p>
                    Viralon boasts a team of skilled designers with extensive experience in creating impactful packaging that resonates with target audiences.
                  </p>
                </div>
              </li>
              <li className="d-flex mb-4">
                <img src="/assets/img/seo/icons/arrow.png"></img>

                <div className="reasons-bxx">
                  <h3 className="reasons-points">Strategic Research</h3>
                  <p>
                     A thorough market research to understand consumer preferences and trends, ensuring your packaging is relevant and effective.
                  </p>
                </div>
              </li>
              <li className="d-flex mb-4">
                <img src="/assets/img/seo/icons/arrow.png"></img>

                <div className="reasons-bxx">
                  <h3 className="reasons-points">Tailored Solutions</h3>
                  <p>
                    Each design is customized to meet the specific needs of your brand, enhancing its unique identity and appeal.
                  </p>
                </div>
              </li>
              <li className="d-flex mb-4">
                <img src="/assets/img/seo/icons/arrow.png"></img>

                <div className="reasons-bxx">
                  <h3 className="reasons-points">Focus on Brand Identity</h3>
                   <p>
                    Viralon emphasizes maintaining a consistent brand image, reinforcing recognition and trust among consumers.
                  </p>
                </div>
              </li>
              <li className="d-flex ">
                <img src="/assets/img/seo/icons/arrow.png"></img>

                <div className="reasons-bxx">
                  <h3 className="reasons-points">Innovative Techniques</h3>
                  <p>
                    We utilize the best design techniques, ensuring your packaging is not only visually appealing but also functional and sustainable.
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
