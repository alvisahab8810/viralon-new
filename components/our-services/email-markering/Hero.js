import React from "react";

export default function Hero() {
  return (
    <>
      <div className="seo-hero about-section1">
        <div className="seo-hero-img">
          <img src="/assets/img/seo/hero-img.gif" alt="round-img"></img>
        </div>
        <div className="container">
          <div className="seo-hero-content">
            <h1>
              <b>Build Lasting Relationships </b>
              <br />
              <span>With Targeted Email Strategies</span>
            </h1>
            <p>
              In today’s competitive landscape, standing out is essential. Email
              marketing allows you to reach your audience directly, delivering
              relevant content that captures attention and drives engagement. By
              leveraging data-driven insights, you can optimize your campaigns
              for maximum impact.
            </p>
          </div>

          <div className="image-column col-xl-7 col-lg-5 col-md-12 col-sm-12">
            <div className="inner-column">
              <figure className="image-1 overlay-anim animated">
                <img
                  src="/assets/img/our-services/email-marketing/thumb1.png"
                  alt="Thumb Image"
                />
              </figure>
              <figure className="image-2 overlay-anim animated">
                <img
                  src="/assets/img/our-services/email-marketing/thumb2.png"
                  alt="Thumb Image"
                />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
