import React, { useRef, useState } from "react";
import Link from "next/link";

// The footer newsletter box. It posts to /api/newsletter/subscribe, which saves
// the address into the shared "newsletters" collection — the same one HQ shows
// at Website → Newsletter — and mails the person a welcome note. The reply is
// shown under the field; there is no toast in the footer.
export default function Footer() {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(null);       // { ok: boolean, text: string }
  const [sending, setSending] = useState(false);
  const [hp, setHp] = useState("");        // honeypot field, always empty
  // How long the box has been on screen: a form filled faster than anyone can
  // type is a script, and the API turns those away.
  const openedAt = useRef(Date.now());

  const subscribe = async (e) => {
    e.preventDefault();
    if (sending) return;

    const clean = email.trim();
    if (!/^\S+@\S+\.\S+$/.test(clean)) {
      setMsg({ ok: false, text: "Please enter a valid email address." });
      return;
    }

    setSending(true);
    setMsg(null);
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: clean,
          website: hp,                       // honeypot — people never see it
          elapsed: Date.now() - openedAt.current,
          source: {
            page: window.location.pathname,
            referrer: document.referrer || "",
            utmSource: new URLSearchParams(window.location.search).get("utm_source") || "",
            utmMedium: new URLSearchParams(window.location.search).get("utm_medium") || "",
            utmCampaign: new URLSearchParams(window.location.search).get("utm_campaign") || "",
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setEmail("");
        setMsg({ ok: true, text: data.message || "You're subscribed. Thank you!" });
      } else {
        setMsg({ ok: false, text: data.message || "Something went wrong. Please try again." });
      }
    } catch {
      setMsg({ ok: false, text: "Something went wrong. Please try again." });
    }
    setSending(false);
  };

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
                  <img src="/assets/images/logo.svg" alt="Logo Image" />{" "}
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
                  <Link href="/brand"> Brand </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link href="/search"> Search </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link href="/social-content"> Social Content </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link href="/paid-ads"> Paid Ads </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link href="/analytics-and-tracking">
                    {" "}
                    Analytics & Tracking{" "}
                  </Link>{" "}
                </li>
                {/* Parked for now — this column carries the four live
                    service pages. The pages themselves still exist.
                <li>
                  {" "}
                  <Link href="/our-services/digital-marketing"> Digital Marketing </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link href="/our-services/brand-identity-design"> Branding </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link href="/our-services/web-development"> Web development </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link href="/our-services/production"> Production </Link>{" "}
                </li>
                <li>
                  {" "}
                  <Link href="/our-work"> Our Work </Link>{" "}
                </li>
                */}

                <li>
                  {" "}
                  <Link href="/contact-us"> Contact Us </Link>{" "}
                </li>
              </ul>
            </div>
            <div className="col-md-3 pl-20">
              <h5> Contact Info</h5>
              <ul className="import-list">
                <li>
                  <b>ADDRESS:</b>
                  <br />
                  <Link href="https://maps.app.goo.gl/3fLpM8c9H5dz5Ruy5">
                    Viralon Digital Services<br/>
                    Cu-01, Tower 2, Parsvnath Planet<br/>
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
              <form className="news-emailbx" onSubmit={subscribe} noValidate>
                {/* Hidden from people; only a bot fills it in. */}
                <input
                  type="text"
                  name="website"
                  value={hp}
                  onChange={(e) => setHp(e.target.value)}
                  tabIndex="-1"
                  autoComplete="off"
                  aria-hidden="true"
                  className="news-hp"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  aria-label="Your email address"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" disabled={sending} aria-label="Subscribe">
                  <i className={sending ? "fas fa-spinner fa-spin" : "fas fa-arrow-right"}></i>
                </button>
              </form>
              {msg && (
                <p className={`news-msg ${msg.ok ? "is-ok" : "is-err"}`} role="status">
                  {msg.text}
                </p>
              )}
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
