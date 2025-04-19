import React from 'react'

export default function FAQ() {
  return (
    <>
      <section className='faq-section pt-80'>
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
                            <span className="fs-3 fw-bold me-3">01</span> What is SEO and why is it important for my website?
                        </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                        SEO, or Search Engine Optimization, is the practice of optimizing your website to improve its visibility in search engine results. It’s important because higher visibility leads to increased organic traffic, which can result in more leads and sales.

                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                            <span className="fs-3 fw-bold me-3">02</span>  How long does it take to see results from SEO efforts? 

                        </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                        SEO is a long-term strategy, and it typically takes several months to see significant results. Factors such as competition, current website authority, and the effectiveness of your SEO strategy can influence the timeline.


                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                            <span className="fs-3 fw-bold me-3">03</span> How do you determine the right keywords for my business?
                        </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                          We conduct thorough keyword research using various tools to identify relevant keywords that have a good search volume and low competition. We also consider your business goals and target audience to select the most effective keywords.
                        </div>
                    </div>
                </div>
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingFour">
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                            <span className="fs-3 fw-bold me-3">04</span> What specific SEO services do you offer?
                        </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#faqAccordion">
                        <div className="accordion-body">
                          We offer a range of SEO services, including keyword research, on-page optimization, technical SEO audits, content creation, link building, and performance tracking to improve your website's visibility in search engines.
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
