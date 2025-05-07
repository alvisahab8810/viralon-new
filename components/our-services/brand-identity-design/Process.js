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
                Our Proven 
                <br /> Branding Process
              </h1>
              <div className="max-500 mt-5">
                <p>
                  At Viralon Digital Services, we craft compelling brand identities rooted in strategy, creativity, and consistency. Through in-depth research and a deep understanding of your business, we design cohesive visual systems that align with your brand’s personality and values.
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
                      <h2>Market and Audience Analysis</h2>

                      <p>
                         We conduct surveys and analyze trends to understand the competitive landscape and audience preferences.
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
                      <h2>Concept Development</h2>

                      <p>
                         Brainstorming, sketching ideas, and exploring different design elements we create innovative design concepts that embody the brand's identity. 
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
                      <h2>Modifications</h2>

                      <p>
                        We value your thoughts and insights, and we incorporate your suggestions while addressing any concerns.
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
                      <h2>Real-Life Mockups</h2>
                      <p>
                        We create mockups for various materials to visualize how the brand identity will appear in real-world applications.
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
