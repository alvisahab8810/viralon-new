import React, { useState } from "react";
// import toast, { Toaster } from "react-hot-toast";

export default function Form() {
  return (
    <div className="parallax-section">
    <section className="form-section ">
      <div className="container bg-linear parallax-section ptb-80">
        
          <div className="form-container d-flex flex-column flex-md-row">
            <div className="form-image col-md-6 d-none d-md-block">
              <img src="/assets/img/home/cta.webp"></img>
            </div>
            <div className="form-content col-12 col-md-6 d-flex flex-column justify-content-center">
              <img src="/assets/img/shape/ellipse.png" className="shape p-absolute"></img>
              <h1 className="anton-regular">READY TO COLLABORATE?</h1>
              <p>LET'S TALK YOUR NEEDS</p>
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="IND (+91) Phone Number"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Business Name"
                  />
                </div>
                <button type="submit" className="btn-submit">
                  SUBMIT
                </button>
              </form>
            </div>

            <div className="form-image col-md-6 desktop-none pt-25">
              <img src="/assets/img/home/mobile-form.png"></img>
            </div>
          </div>
        
      </div>
    </section>
    </div>
  );
}
