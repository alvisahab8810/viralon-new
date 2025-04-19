import React from 'react'

export default function FAQ() {
  return (
    <>
      <section className='faq-section pt-100'>
        <div className="container ">
        <div className="text-center">
            <p className="text-orange">Still Having Queries ?</p>
            <h2 className="display-4 fw-bold mt-2">Frequently Asked Questions</h2>
        </div>
        <div className="mt-5">
            <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                        <button className="accordion-button show" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                            <span className="fs-3 fw-bold me-3">01</span> What are paid media ads, and how do they work?
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                          Paid media ads are advertisements that businesses pay for to promote their products or services on various platforms, such as search engines and social media. They work by targeting specific audiences based on demographics, interests, and behaviors.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            <span className="fs-3 fw-bold me-3">02</span>  How much should I budget for paid media advertising?  

                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                          Your budget will depend on your business goals, target audience, and the platforms you choose. It’s essential to start with a clear strategy and adjust your budget based on performance and ROI.

                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            <span className="fs-3 fw-bold me-3">03</span> What platforms do you recommend for paid media advertising? 

                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                          We recommend platforms like Google Ads for search advertising, Facebook and Instagram for social media ads, and LinkedIn for B2B advertising, depending on your target audience and business objectives.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            <span className="fs-3 fw-bold me-3">04</span> What is the typical ROI for paid media ads?
                        </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                          The ROI for paid media ads can vary based on industry, campaign goals, and execution. However, we aim to achieve a positive ROI by closely analyzing performance metrics and making data-driven adjustments..
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
  )
}
