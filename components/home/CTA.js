import React from "react";

export default function CTA() {
  return (
    <>
      <section className="lets-cta-section ptb-100">
        <div className="container">
          <div className="row align-center">
            <div className="col-lg-8 banner-one-item">
              <h4 className="manrope">LET’S TALK</h4>
              <h2>
                <strong>About Your</strong>{" "}
                <span className="float-right"> Next Project</span>
              </h2>
            </div>
            <div className="col-lg-3 offset-lg-1 banner-one-item text-center">
              <div className="choose-us-style-one-thumb">
                <a href="#">
                  <div className="up-arrow">
                    <img
                      src="/assets/img/icon/up-arrow.png"
                      alt="Up Arrow"
                    ></img>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
