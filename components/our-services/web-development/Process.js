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
                Our Proven Web 
                <br /> Development Process
              </h1>
              <div className="max-500 mt-5">
                <p>
                   Viralon’s structured methodology emphasizes strong collaboration, complete transparency, and agile practices. We prioritize delivering projects on time and within scope while aligning with your business objectives to ensure measurable success and sustained growth.
                </p>
                <p>
                   Our agile approach enables us to adapt swiftly to changes, allowing for iterative improvements and timely delivery. By closely aligning the development process with your business objectives and target audience needs, we create tailored solutions that not only meet but exceed expectations. This comprehensive process ensures your website is delivered on schedule and operates efficiently, providing a solid foundation for sustained growth, increased engagement, and measurable success in the digital landscape.
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
                      <h2>Questionnaire & Consultation</h2>

                      <p>
                        This section clearly outlines the importance of understanding the client's vision and goals, which is crucial for a successful project.
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
                      <h2>Audience & Competitor Analysis</h2>

                      <p>
                         We conduct thorough research on your target audience and competitors to craft strategic design and development decisions that set you apart.
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
                      <h2>Design & Prototyping</h2>

                      <p>
                        This emphasizes the importance of client feedback, which is essential for ensuring the final product meets expectations.
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
                      <h2>Development & Testing</h2>
                      <p>
                        This section reassures clients about the quality and performance of the final product through rigorous testing.
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
                      <h2>Launch & Support</h2>
                      <p>
                        This conveys a commitment to ongoing support, which is vital for client satisfaction and long-term success.
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
