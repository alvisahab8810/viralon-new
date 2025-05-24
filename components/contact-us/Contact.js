import React from "react";
import Link from "next/link";
export default function Contact() {
  return (
    <div className="container ptb-80">
      <div className="have-questions">
        <div className="left">
          <p className="subtitle">Have questions?</p>
          <h1>Send us Link Message</h1>
          <form>
            <input type="text" placeholder="Name" />
            <div className="form-row">
              <input type="email" placeholder="Email*" />
              <input type="tel" placeholder="Phone" />
            </div>
            <textarea placeholder="Tell Us About Project *"></textarea>
            <button type="submit">Get In Touch</button>
          </form>
        </div>
        <div className="right">
          <h2>Contact Info.</h2>
          <div>
            <h3>Location</h3>
            <p>
              1007, Tower B1, Floor 10th, DLF Mypad, Vibhuti Khand, Gomti Nagar
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
