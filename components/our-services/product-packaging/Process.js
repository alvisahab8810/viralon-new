import React from "react";
import Strap from "../digital-marketing/Strap";

export default function Process() {
  return (
    <>
      <section className="process-section">
        <Strap />
        <div className="container">
          <div className="row pt-100">
            <div className="col-lg-6">
              <h1 className="process-heading">
                Our Proven Product
                <br /> Design Process
              </h1>
              <div className="max-500 mt-5">
                <p>
                  At Viralon Digital Services,  we follow a structured and proven product design process that ensures we deliver innovative and user-centered solutions. Our approach is designed to foster collaboration, creativity, and efficiency, resulting in products that meet both user needs and business objectives.
                </p>
                <p>
                   From color palettes and typography to icons and imagery, each element is carefully selected to create a memorable and unified presence. We develop flexible identity systems that work across platforms, ensuring your brand always looks sharp and communicates clearly to your target audience.
                </p>
              </div>
              <button className="process-btn mt-4">LET’S TALK</button>
            </div>
            <div className="col-lg-6 mt-5 mt-lg-0">
              <div className="d-flex main-d-flex mb-4 overflow-hidden">
                <div className="step-number">
                  <ul className="nubmer-lists">
                    <li>1</li>
                  </ul>
                </div>
                <div className="ml-4 step-box step-box-orange">
                  <div className="steps-bxx">
                    <div className="width-20">
                      <img
                        alt="SEO Audit Icon"
                        className="mr-2"
                        src="/assets/img/our-services/paid-media-marketing/icons/icon1.png"
                      />
                    </div>
                    <div className="width-80">
                      <h2>Questionnaire</h2>

                      <p>
                         We ask specific questions to gather detailed information about the client's brand, goals, and expectations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex main-d-flex mb-4">
                <div className="step-number">
                  <ul className="nubmer-lists">
                    <li>2</li>
                  </ul>
                </div>
                <div className="ml-4 step-box ">
                  <div className="steps-bxx">
                    <div className="width-20">
                      <img
                        alt="SEO Audit Icon"
                        className="mr-2"
                        src="/assets/img/our-services/paid-media-marketing/icons/icon2.png"
                      />
                    </div>
                    <div className="width-80">
                      <h2>Ideation and Concept Development</h2>

                      <p>
                        Brainstorm ideas and create sketches to explore various design solutions and innovative concepts.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex main-d-flex mb-4">
                <div className="step-number">
                  <ul className="nubmer-lists">
                    <li>3</li>
                  </ul>
                </div>
                <div className="ml-4 step-box ">
                  <div className="steps-bxx">
                    <div className="width-20">
                      <img
                        alt="SEO Audit Icon"
                        className="mr-2"
                        src="/assets/img/our-services/email-marketing/icons/icon3.png"
                      />
                    </div>
                    <div className="width-80">
                      <h2>Prototyping</h2>
                      <p>
                        Develop prototypes to visualize concepts, allowing for early testing of functionality and design. 
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex main-d-flex mb-4">
                <div className="step-number">
                  <ul className="nubmer-lists">
                    <li>4</li>
                  </ul>
                </div>
                <div className="ml-4 step-box ">
                  <div className="steps-bxx">
                    <div className="width-20">
                      <img
                        alt="SEO Audit Icon"
                        className="mr-2"
                        src="/assets/img/our-services/email-marketing/icons/icon4.png"
                      />
                    </div>
                    <div className="width-80">
                      <h2>User Testing</h2>
                      <p>
                        Conduct user testing with prototypes to gather feedback and identify areas for usability improvement.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex main-d-flex overflow-hidden">
                <div className="step-number">
                  <ul className="nubmer-lists">
                    <li>5</li>
                  </ul>
                </div>
                <div className="ml-4 step-box ">
                  <div className="steps-bxx">
                    <div className="width-20">
                      <img
                        alt="SEO Audit Icon"
                        className="mr-2"
                        src="/assets/img/our-services/paid-media-marketing/icons/icon5.png"
                      />
                    </div>
                    <div className="width-80">
                      <h2>Finalization and Launch</h2>
                       <p>
                        Refine the design based on feedback, finalize specifications, and prepare for the product launch.
                      </p>
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
