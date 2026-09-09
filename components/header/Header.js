import Link from "next/link";
import React from "react";
import { openEnquiry } from "../common/EnquiryPopup";

export default function Topbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <header>
            <div className="navbar-header">
              <Link className="navbar-brand" href="/">
                <img
                  src="/assets/images/logo.svg"
                  className="logo logo-scrolled"
                  alt="Logo"
                />
              </Link>
            </div>
            {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button> */}
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNav"
            >
              <ul className="navbar-nav mobile-none">
                <li className="nav-item dropdown ">
                  <Link
                    className="d-flex align-items-center nav-link"
                    href="/our-services/digital-marketing "
                  >
                    Our services <i className="ri-arrow-down-s-line"></i>
                  </Link>

                  <ul className="dropdown-menu">
                    <li>
                      {" "}
                      <Link
                        className="nav-link"
                        href="/our-services/social-media-marketing"
                      >
                        Social Media Marketing
                      </Link>{" "}
                    </li>
                    <li>
                      {" "}
                      <Link
                        className="nav-link"
                        href="/our-services/paid-media-marketing"
                      >
                        Paid Media Marketing
                      </Link>{" "}
                    </li>

                    <li>
                      {" "}
                      <Link
                        className="nav-link"
                        href="/our-services/brand-identity-design"
                      >
                        Brand Identity Design
                      </Link>{" "}
                    </li>

                    <li>
                      {" "}
                      <Link
                        className="nav-link"
                        href="/our-services/product-packaging"
                      >
                        Product Packaging
                      </Link>{" "}
                    </li>
                    <li>
                      {" "}
                      <Link
                        className="nav-link"
                        href="/our-services/web-development"
                      >
                        Web Development
                      </Link>{" "}
                    </li>
                    <li>
                      {" "}
                      <Link
                        className="nav-link"
                        href="/our-services/email-marketing"
                      >
                        Email Marketing
                      </Link>{" "}
                    </li>
                    <li>
                      {" "}
                      <Link
                        className="nav-link"
                        href="/our-services/logo-design"
                      >
                        Logo Design
                      </Link>{" "}
                    </li>
                      <li>
                      {" "}
                      <Link
                        className="nav-link"
                        href="/our-services/production"
                      >
                       Production
                      </Link>{" "}
                    </li>
                    <li>
                      {" "}
                      <Link className="nav-link" href="/our-services/seo">
                        Seo
                      </Link>{" "}
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/our-work">
                    Our Work
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/blogs">
                    Blogs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/career">
                    Career
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" href="/contact-us">
                    Contact
                  </Link>
                </li>
              </ul>

             

              <Link
                className="burger-menu desktop-none"
                data-bs-toggle="offcanvas"
                role="button"
                aria-controls=" offcanvasExample"
                href="/#offcanvasExample"
              >
                <img src="/assets/img/icon/menu.svg" alt="Menu" />
              </Link>
            </div>

            {/* The pills used to route to /contact-us; they now open the CTA
                enquiry form in a popup instead (components/common/EnquiryPopup).
                Still anchors so the pill keeps its exact `.btn-lets-talk` look
                and stays keyboard-reachable. */}
            <div className="header-cta">
              <a
                className="btn-lets-talk mobile-none"
                href="/contact-us"
                onClick={(e) => { e.preventDefault(); openEnquiry(); }}
              >
                LET'S TALK
              </a>
              {/* Figma's mobile bar is burger / logo / CTA, so the pill has to
                  exist below 1024 too -- the desktop one is `.mobile-none`. */}
              <a
                className="btn-lets-talk btn-lets-talk--mobile desktop-none"
                href="/contact-us"
                onClick={(e) => { e.preventDefault(); openEnquiry(); }}
              >
                LET&apos;S TALK
              </a>
            </div>
          </header>
        </div>
      </nav>
    </>
  );
}
