// components/contact-us/Contact.js — the office details on the contact page.
//
// This used to carry a second lead form of its own on the left, with the
// details on the right. The page now uses the shared query form
// (components/home/Form.js) above this block, exactly as the frame draws it,
// so there is only one contact form on the site to keep in step with the CRM.
// What is left here is the address, the email, the phone and the social links.
import Link from "next/link";

export default function Contact() {
  return (
    <div className="container ptb-80">
      <div className="have-questions have-questions--info">
        <div className="right">
          <h2>Contact Info.</h2>
          <div>
            <h3>Location</h3>
            <p>
              Cu-01, Tower 2, Parsvnath Planet,<br/> Vibhuti Khand, Gomti Nagar
              Lucknow - 226010
            </p>
            <hr />
          </div>
          <div>
            <h3>Email</h3>
            <p>Info@viralon.in</p>
            <hr />
          </div>
          <div>
            <h3>Phone</h3>
            <p>+91 93054 51301</p>
            <hr />
          </div>
          <div className="social-icons">
            <Link href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link href="#" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </Link>
            <Link href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
