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
              <b>Turn Clicks into Customers </b>
              <br />
              <span>Explore Strategic Paid Media Solutions</span>
            </h1>
            <p>
              In today's digital age, the competition for consumers' attention
              is fiercer than ever. That's where Paid Media Marketing comes into
              play, a strategic approach that enables businesses to stand out,
              connect with their target audience, and achieve tangible results.
            </p>
          </div>

          <div className="image-column col-xl-7 col-lg-5 col-md-12 col-sm-12">
            <div className="inner-column">
              <figure className="image-1 overlay-anim animated">
                <img
                  src="/assets/img/our-services/paid-media-marketing/thumb1.png"
                  alt="Thumb Image"
                />
              </figure>
              <figure className="image-2 overlay-anim animated">
                <img
                  src="/assets/img/our-services/paid-media-marketing/thumb2.png"
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
