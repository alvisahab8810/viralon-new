import React from "react";

export default function FAQ() {
  return (
    <>
      <section className="faq-section pt-100">
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
                    <span className="fs-3 fw-bold me-3">01</span> What kind of websites do you build?

                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    We develop responsive websites ranging from landing pages and corporate sites to full e-commerce platforms, custom web apps, and content management systems.
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
                    <span className="fs-3 fw-bold me-3">02</span> Do you offer design and development together?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Yes, we provide both design and development services to ensure a cohesive and streamlined build process from concept to launch.
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
                    <span className="fs-3 fw-bold me-3">03</span> Which platforms do you use for web development?

                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                     We work with WordPress, Shopify, and custom HTML/CSS/JS/REACT frameworks depending on your project needs.
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
                    <span className="fs-3 fw-bold me-3">04</span> Will my website be mobile-responsive?
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                   Absolutely. All our websites are designed to work seamlessly across all devices—phones, tablets, and desktops.
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
