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
                Our Proven Video
                <br />
                Production Process
              </h1>
              <div className="max-500 mt-5">
                <p>
                 Viralon’s structured approach combines seamless collaboration and innovative creativity to craft impactful videos that align perfectly with your goals. We prioritize clear communication and efficient project management to deliver high-quality content on schedule and within your budget, ensuring your vision is brought to life effectively and professionally.
                </p>
                <p>
                    Our agile approach enables us to adapt swiftly to changes, allowing for iterative improvements and timely delivery. By closely aligning the development process with your business objectives and target audience needs, we create tailored solutions that not only meet but exceed expectations. This comprehensive process ensures your website is delivered on schedule and operates efficiently, providing a solid foundation for sustained growth, increased engagement, and measurable success in the digital landscape.
                </p>

          
              </div>
              <button className="process-btn mt-5">LET’S TALK</button>
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
                        src="/assets/img/our-services/logo-design/icons/icon1.png"
                      />
                    </div>
                    <div className="width-80">
                      <h2>Questionnaire & Consultation</h2>

                      <p>
                        We begin by understanding your vision, target audience, and goals to tailor an effective video strategy.
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
                        src="/assets/img/our-services/logo-design/icons/icon2.png"
                      />
                    </div>
                    <div className="width-80">
                      <h2>Audience & Competitor Analysis</h2>

                      <p>
                        Our research uncovers insights about your viewers and competitors, shaping content that stands out.
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
                        src="/assets/img/our-services/logo-design/icons/icon3.png"
                      />
                    </div>
                    <div className="width-80">
                      <h2>Creative Development</h2>

                      <p>
                        We design scripts, stories, and visual styles that connect emotionally and convey your message clearly.
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
                        src="/assets/img/our-services/logo-design/icons/icon4.png"
                      />
                    </div>
                    <div className="width-80">
                      <h2>Production & Filming</h2>

                      <p>
                       Our team executes the shoot with precision, capturing your story’s essence with cinematic quality.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex main-d-flex  overflow-hidden">
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
                        src="/assets/img/our-services/logo-design/icons/icon5.png"
                      />
                    </div>
                    <div className="width-80">
                      <h2>Editing & Delivery</h2>

                      <p>
                        We polish the video through expert editing and deliver a final version optimized for your intended audience.
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
