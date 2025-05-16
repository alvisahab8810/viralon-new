import React from "react";
import Link from "next/link";
export default function Journey() {
  return (
    <>
      <section className="journey-seciton">
        <div className="container">
          <div className="row align-center pt-80">
            <div className="col-lg-9 banner-one-item">
              <h2>
                <strong>Start your</strong>{" "}
                <span className="float-right"> Growth Journey</span>
              </h2>
            </div>
            <div className="col-lg-3 offset-lg-1 banner-one-item text-center"></div>
          </div>
        </div>

        <div className="container card_section">
          <div className="tabs-row pt-50">
            <div className="intern-bx">
              <Link href="/jobs?tab=internship">
                <div className="card overlay-anim">
                  <img
                    alt="Experienced professionals collaborating"
                    className="card-img-top"
                    height="300"
                    src="./assets/img/careers/ex1.webp"
                  />
                  <div className="card-body card-body2 ">
                    <h5 className="card_title text-center">
                      Internship Program  
                    </h5>
                  </div>
                </div>
              </Link>
            </div>
            <div className="experience-bx">
              <Link href="/jobs?tab=experienced">
                <div className="card overlay-anim">
                  <img
                    alt="Group of interns working together"
                    className="card-img-top"
                    height="300"
                    src="./assets/img//careers/ex2.webp"
                    width="400"
                  />
                  <div className="card-body card-body1 ">
                    <h5 className="card_title text-center">
                      Experienced Professional
                    </h5>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
