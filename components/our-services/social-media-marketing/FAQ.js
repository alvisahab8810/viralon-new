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
                    <span className="fs-3 fw-bold me-3">01</span> How often will
                    you post on our social media accounts?
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    We typically post several times a week, but the frequency
                    may vary based on the platform and specific campaign goals.
                    Our strategy focuses on maximizing engagement and
                    visibility, ensuring that content is timely, relevant, and
                    aligned with your audience's interests.
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
                    <span className="fs-3 fw-bold me-3">02</span> Will you
                    provide regular reports on performance?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Yes, we provide comprehensive monthly performance reports
                    that include key metrics such as engagement rates, follower
                    growth, and website traffic. These reports also offer
                    insights and actionable recommendations to help you
                    understand the effectiveness of our strategies and make
                    informed decisions for future campaigns.
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
                    <span className="fs-3 fw-bold me-3">03</span> What is your
                    process for audience engagement?
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    Our audience engagement process involves actively monitoring
                    comments, messages, and mentions across all platforms. We
                    respond promptly to inquiries, encourage discussions, and
                    create interactive content like polls and questions to
                    foster community interaction, ultimately building stronger
                    relationships with your audience and enhancing brand
                    loyalty.
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
                    <span className="fs-3 fw-bold me-3">04</span> How do you
                    determine our target audience?
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#faqAccordion"
                >
                  <div className="accordion-body">
                    We determine your target audience by analyzing demographic
                    data, interests, and online behaviors. We utilize market
                    research, social media insights, and customer personas to
                    refine our understanding, ensuring that our strategies
                    effectively reach and resonate with the right audience for
                    your brand.
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
