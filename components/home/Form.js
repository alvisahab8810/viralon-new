import React, { useState } from "react";
// import toast, { Toaster } from "react-hot-toast";

export default function Form() {
  return (
    <section className="form-section pt-100">
      <div className="container-fluid bg-linear ptb-80">
        <div className="container">
          <div className="form-container d-flex flex-column flex-md-row">
            <div className="form-image col-md-6 d-none d-md-block"></div>
            <div className="form-content col-12 col-md-6 d-flex flex-column justify-content-center">
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
                <button type="submit" className="btn-submit">
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
