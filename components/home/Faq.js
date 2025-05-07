import React from "react";

export default function FAQ() {
  return (
    <>
      <section className="faq-section pt-80">
        <div className="container ">
          <div className="text-center">
            <p className="text-orange">Still Having Queries ?</p>
            <h2 className="display-4 fw-bold mt-2">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="mt-5">
            <div className="accordion" id="faqAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button show"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="false"
                    aria-controls="collapseOne"
                  >
                    <span className="fs-3 fw-bold me-3">01</span> What services do you offer?
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Viralon offers a comprehensive range of services, including digital marketing, social media management, SEO, content creation, email marketing, and paid advertising. Our tailored strategies are designed to enhance brand visibility and drive engagement across various platforms.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    <span className="fs-3 fw-bold me-3">02</span> Will I have a dedicated account manager? 
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Yes, at Viralon, you will have a dedicated account manager who serves as your primary point of contact. This ensures personalized communication, consistent updates, and a tailored approach to meet your specific marketing needs and goals.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    <span className="fs-3 fw-bold me-3">03</span>  Do you provide content creation services? 
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Absolutely! Viralon specializes in content creation, offering services such as blog writing, social media posts, videos, and graphics. Our team crafts engaging, high-quality content that resonates with your audience and enhances your brand's online presence.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    <span className="fs-3 fw-bold me-3">04</span> Can I see examples of your previous work?
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                     Yes, we are happy to share case studies and examples of our previous work at Viralon. These showcase our successful campaigns and the results we've achieved for clients across various industries, demonstrating our expertise and effectiveness.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-end mt-5">
            <p className="text-orange fs-24">Ask Your Queries...</p>
          </div>
        </div>
      </section>
    </>
  );
}
