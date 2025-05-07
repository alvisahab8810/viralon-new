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
                  src="/assets/img/seo/img1.png"
                />
              </div>
            </div>
            <div className="row g-3 mobile-none">
              <div className="col-12 col-sm-6 mt-45">
                <img
                  alt="A futuristic dashboard on a laptop screen"
                  className="img-fluid rounded shadow"
                  src="/assets/img/our-services/email-marketing/img3.png"
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
              For Email Marketing
            </h1>
            <ul className="check-img-bx list-unstyled">
              <li className="d-flex mb-4">
                <img src="/assets/img/seo/icons/arrow.png"></img>
                <div className="reasons-bxx">
                  <h3 className="reasons-points">Expertise</h3>
                  <p>
                    Our team consists of experienced specialists with a proven
                    track record in email marketing success.
                  </p>
                </div>
              </li>
              <li className="d-flex mb-4">
                <img src="/assets/img/seo/icons/arrow.png"></img>

                <div className="reasons-bxx">
                  <h3 className="reasons-points">Customization</h3>
                  <p>
                    We tailor our strategies to your brand's unique needs,
                    ensuring optimal results and engagement.
                  </p>
                </div>
              </li>
              <li className="d-flex mb-4">
                <img src="/assets/img/seo/icons/arrow.png"></img>

                <div className="reasons-bxx">
                  <h3 className="reasons-points">Results-Driven</h3>
                  <p>
                    Viralon is committed to delivering tangible results, from
                    increased engagement to higher conversion rates.
                  </p>
                </div>
              </li>
              <li className="d-flex mb-4">
                <img src="/assets/img/seo/icons/arrow.png"></img>

                <div className="reasons-bxx">
                  <h3 className="reasons-points">Cutting-Edge Technology</h3>
                  <p>
                    We utilize the latest tools and techniques to keep your
                    email marketing at the forefront of industry standards.
                  </p>
                </div>
              </li>
              <li className="d-flex mb-4">
                <img src="/assets/img/seo/icons/arrow.png"></img>

                <div className="reasons-bxx">
                  <h3 className="reasons-points">Client-Centric Approach</h3>
                  <p>
                    We provide transparent communication and outstanding support
                    throughout our partnership.
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
