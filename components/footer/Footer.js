import React from "react";
import Link from "next/link";
export default function Footer() {
  return (
    <>
      <footer className="footer-area ptb-80">
        <div className="container footer">
          <div className="row">
            <div className="col-md-3">
              <div className="logo">
                <Link
                  href="/"
                  className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
                >
                  <img src="/assets/img/logo.png" alt="Logo Image" />{" "}
                </Link>
              </div>
              <p className="footer-para manrope">
                We Don’t <br />
                Just Think
                <br />
                <span>We Do.</span>{" "}
              </p>
              <div className="social-icons">
                <Link href="https://wa.me/918882701800?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Tourwatchout">
                  {" "}
                  <i className="ri-whatsapp-line"></i>{" "}
                </Link>
                <Link href="https://www.instagram.com/tourwatchout/">
                  {" "}
                  <i className="ri-instagram-line"></i>{" "}
                </Link>
                <Link href="https://www.facebook.com/TourWatchout/">
                  {" "}
                  <i className="ri-facebook-fill"></i>{" "}
                </Link>
                <Link href="https://www.instagram.com/tourwatchout/">
                  {" "}
                  <i className="ri-youtube-line"></i>{" "}
                </Link>
                <Link href="https://www.facebook.com/TourWatchout/">
                  {" "}
                  <i className="ri-linkedin-fill"></i>{" "}
                </Link>
              </div>
            </div>
            <div className="col-md-3 pl-100">
              <h5> Company </h5>
              <ul className="import-list">
                <li>
                  {" "}
                  <Link href="#"> Digital Marketing </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link href="#"> Branding </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link href="#"> Web development </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link href="#"> Production </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link href="#"> Our Work </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link href="#"> Contact Us </Link>{" "}
                </li>
              </ul>
            </div>
            <div className="col-md-3 pl-50">
              <h5> Contact Info</h5>
              <ul className="import-list">
                <li>
                  <b>ADDRESS:</b>
                  <br />
                  <Link href="#">
                    5919 Trussville Crossings Pkwy, Birmingham{" "}
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <b>EMAIL:</b>
                  <br />
                  <Link href="#">info@valldtheme.com </Link>
                </li>
                <li>
                  <b>PHONE:</b>
                  <br />
                  <Link href="#"> +123 34598768 </Link>
                </li>
              </ul>
            </div>
            <div className="col-md-3">
              <h5>Newsletter</h5>
              <p className="news-para">
                Join our subscribers list to get the instant latest news and
                special offers.
              </p>
              <div className="news-emailbx">
                <input type="email" placeholder="Your Email" />
                <button>
                  <i className="fas fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
