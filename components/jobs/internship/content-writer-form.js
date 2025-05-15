import React from "react";

export default function ContentWriterForm() {
  return (
    <>
      <div
        className="applying-form wpcf7 "
      >

        <h2>Apply for this job here:</h2>
  
        <form className="wpcf7-form init">
          <div className="career-form-wrap">
            <div className="career-form d-flex flex-wrap">
              <div className="col-12 px-0">
                <input
                  type="hidden"
                  name="appliedPosition"
                  value="Content Writer Intern"
                  className=" wpcf7-hidden"
                />
              </div>
              <div className="col-12 pt-3 px-0">
                  <input
                    type="text"
                    name="name"
                    className="  form-control"
                    placeholder="Name*"
                  />
              </div>
              <div className="col-12 pt-3 px-0">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email*"
                  />
              </div>
              <div className="col-12 pt-3 px-0">
                  <input
                    type="tel"
                    name="mobile"
                    maxLength="10"
                    minLength="10"
                    className="form-control"
                    placeholder="Phone Number*"
                  />
              </div>
              <div className="col-12 pt-3 px-0">
                <p className="font14 bold mb_5">Upload CV*</p>
           
                    <input
                      type="file"
                      name="file"
                      className="form-control"
                      id="cv"
                      accept=".pdf,.doc,.docx"
                    />
              </div>
              <div className="col-12 pt-3 px-0">
                <h4 className="bold font20 or">OR</h4>
                    <input
                      type="url"
                      name="portfolioLink"
                      className="form-control"
                      placeholder="Portfolio Link"
                    />
              </div>
              <div className="col-12 pt-3 px-0">
                <button
                  type="submit"
                  className="apply-now-btn"
                  fdprocessedid="6wqin"
                >
                  Submit
                </button>
                <span className="ajax-loader"></span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
