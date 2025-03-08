import React from "react";
import Link from "next/link";

export default function Offcanvas() {
  return (
    <>
      <div
        className="offcanvas mob-canvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasExampleLabel">
            <Link
              href="/"
              className="d-flex align-items-center  mb-md-0 me-md-auto text-dark text-decoration-none desk-logo"
            >
              <img src="./assets/img/logo.png" alt="Logo Image" />
            </Link>
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <div className="mob-menus">
            <ul className=" nav nav-pills">
              <li className="nav-item">
                <Link href="#" className="nav-link ">
                  {" "}
                  Our Services
                </Link>
              </li>
              {/* <li className="nav-item mob-dropdown">
                <div className="accordion" id="familyAccordion">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        Family
                      </button>
                    </h2>
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingOne"
                      data-bs-parent="#familyAccordion"
                    >
                      <div className="accordion-body">
                        <ul className="list-unstyled">
                          <li>
                            <Link href="/national-destination">
                              - National Destination
                            </Link>
                          </li>
                          <li>
                            <Link href="/international-destination">
                              - International Destination
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </li> */}
              <li className="nav-item">
                <Link href="#" className="nav-link">
                  Our Work
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/blogs" className="nav-link">
                  Blogs
                </Link>
              </li>
           
              <li className="nav-item">
                <Link href="/career" className="nav-link">
                  Career
                </Link>
              </li>

              <li className="nav-item">
                <Link href="#" className="nav-link">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          
          {/* 
      <div className="mob-social-mediabx">
        <ul>
          <li>
            <i className="ri-facebook-fill"></i>
          </li>
          <li>
            <i className="ri-twitter-x-line"></i>
          </li>
          <li>
            <i className="ri-instagram-line"></i>
          </li>

        </ul>

      </div> */}
        </div>
      </div>
    </>
  );
}
