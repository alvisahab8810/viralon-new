import React from "react";
import Link from "next/link";
export default function Footer() {
  return (
    <>
      <footer className="footer-area pt-100">
        <div className="before-bg"></div>
        <div className="container footer">
          
          <div className="row">
            <div className="col-md-3">
              <div className="logo footer-logo">
                <Link
                  href="/"
                  className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-dark text-decoration-none"
                >
                  <img src="/assets/img/logo-light.png" alt="Logo Image" />{" "}
                </Link>
              </div>
              <p className="footer-para manrope">
                We Don’t <br />
                Just Think
                <br />
                <span>We Do.</span>{" "}
              </p>
              <div className="social-icons">
                <Link href="https://wa.me/9193054 51301?text=Hi%2C%20I%20want%20to%20know%20more%20about%20Viralon">
                  {" "}
                  <i className="ri-whatsapp-line"></i>{" "}
                </Link>
                <Link href="https://www.instagram.com/viralon_digital_services/">
                  {" "}
                  <i className="ri-instagram-line"></i>{" "}
                </Link>
                <Link href="https://www.facebook.com/people/Viralon-Digital-Services/61551774960535/?mibextid=LQQJ4d">
                  {" "}
                  <i className="ri-facebook-fill"></i>{" "}
                </Link>
                <Link href="https://www.youtube.com/@ViralonDigtialServices">
                  {" "}
                  <i className="ri-youtube-line"></i>{" "}
                </Link>
                <Link href="https://www.linkedin.com/company/viralon-digital-services/">
                  {" "}
                  <i className="ri-linkedin-fill"></i>{" "}
                </Link>
              </div>
            </div>
            <div className="col-md-3  pl-100">
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
                    Viralon Digital Services<br/>
                    12th Floor, B Wing, Summit Building<br/>
                    Vibhuti Khand, Gomti Nagar, Lucknow-226010<br/>
                  </Link>{" "}
                </li>
                <li>
                  {" "}
                  <b>EMAIL:</b>
                  <br />
                  <Link href="mailto:info@viralon.in">info@viralon.in</Link>
                </li>
                <li>
                  <b>PHONE:</b>
                  <br />
                  <Link href="tel:+91 93054 51301"> +91 93054 51301 </Link>
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
      <div className="footer-2nd">
        <p>Copyright © 2025 <span><Link href="/">Viralon</Link></span>. All Rights Reserved</p>
      </div>
    </>
  );
}
