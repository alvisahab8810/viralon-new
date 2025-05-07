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
                    <span className="fs-3 fw-bold me-3">01</span> What file
                    formats will I receive for my logo?
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Once the logo is finalized, we provide a comprehensive
                    package that includes various file formats such as AI, EPS,
                    PNG, and JPEG. This ensures you have the right files for
                    both print and digital applications.
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
                    <span className="fs-3 fw-bold me-3">02</span> Can you help
                    with designing secondary logos or brand elements?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Yes! In addition to the primary logo, we can design
                    secondary logos, icons, and other brand elements that
                    complement your main logo. This helps create a cohesive
                    brand identity across various platforms.
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
                    <span className="fs-3 fw-bold me-3">03</span> How do you
                    ensure the logo aligns with my brand identity?
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    We conduct thorough research on your brand values, target
                    audience, and market positioning. This information guides
                    our design decisions, ensuring that the logo reflects your
                    brand’s essence and resonates with your audience.
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
                    <span className="fs-3 fw-bold me-3">04</span> Do you provide
                    support after the logo is delivered?
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Yes, we offer ongoing support even after the logo is
                    delivered. If you have questions about usage, need
                    additional design elements, or require assistance with
                    branding, we’re here to help!
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
