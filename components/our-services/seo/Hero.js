import React from "react";

export default function Hero() {
  return (
    <>
      <div className="seo-hero about-section1">
        <div className="seo-hero-img">
          <img src="/assets/img/seo/hero-img.png" alt="round-img"></img>
        </div>
        <div className="container">
          <div className="seo-hero-content">
            <h1>
              Grow Your Revenue with Viralon’s <br />
              <span>
                <b>Expert SEO Services</b>
              </span>
            </h1>
            <p>
              In today’s competitive digital landscape, having a strong online
              presence is essential for success. At Viralon, we specialise in
              comprehensive SEO services that elevate your website’s visibility,
              attract organic traffic, and convert visitors into loyal
              customers. Let’s transform your online presence together!

            </p>
          </div>

          <div className="image-column col-xl-7 col-lg-5 col-md-12 col-sm-12">
            <div className="inner-column">
              <figure className="image-1 overlay-anim animated">
                <img src="/assets/img/seo/thumb1.png" alt="Thumb Image" />
              </figure>
              <figure className="image-2 overlay-anim animated">
                <img src="/assets/img/seo/thumb2.png" alt="Thumb Image" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
