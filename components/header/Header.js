import Link from "next/link";
import React from "react";

export default function Topbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <header>
            <div className="navbar-header">
              <Link className="navbar-brand" href="/">
                <img
                  src="/assets/img/logo.png"
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
                <li className="nav-item">
                  <Link className="nav-link" href="/our-services/digital-marketing">
                    Our services
                  </Link>
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
                  <Link className="nav-link" href="#">
                    Contact
                  </Link>
                </li>
              </ul>

              <Link className="burger-menu desktop-none" data-bs-toggle="offcanvas" role="button" aria-controls=" offcanvasExample" href="/#offcanvasExample"><img src="./assets/img/icon/menu.png" alt="Menu Png"/></Link>
            </div>
          </header>
        </div>
      </nav>
    </>
  );
}
