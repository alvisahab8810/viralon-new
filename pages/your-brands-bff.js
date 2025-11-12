

"use client";
import React, { useEffect } from "react";
import CustomHead from "../components/CustomHead";
import Link from "next/link";
import Testimonials from "../components/LandingPage/Testimonials";
import Head from "next/head";
import BrandLogos from "../components/LandingPage/BrandLogos";
import HeroSection from "../components/LandingPage/HeroSection";
import PopupModal from "../components/LandingPage/PopupModal";
import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function YourBrandsBFf() {


    const router = useRouter();

  const [formData, setFormData] = useState({
    formIdentifier: "form2",
    full_name: "",
    country_code: "91",
    phone_number: "",
    email_address: "",
    your_message: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Submitting your message...");

    try {
      const res = await fetch("/api/landing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      toast.dismiss(loadingToast);

      if (data.success) {
        toast.success(data.message);

        // optional freeze access prevention
        sessionStorage.setItem("formSubmitted", "true");

        // short delay before redirect
        setTimeout(() => {
          router.push("/thank-you");
        }, 1000);

        // reset form
        setFormData({
          formIdentifier: "form2",
          full_name: "",
          country_code: "91",
          phone_number: "",
          email_address: "",
          your_message: "",
        });
      } else {
        toast.error(data.message || "Submission failed!");
      }
    } catch (err) {
      console.error("Error submitting contact form:", err);
      toast.dismiss(loadingToast);
      toast.error("Something went wrong. Please try again later.");
    }
  };
  useEffect(() => {
    // When this page is mounted, add the CSS
    const bootstrap = document.createElement("link");
    bootstrap.rel = "stylesheet";
    bootstrap.href = "../assetss/css/bootstrap.min.css";
    bootstrap.id = "page-bootstrap";

    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = "../assetss/css/style.css";
    style.id = "page-style";

    document.head.appendChild(bootstrap);
    document.head.appendChild(style);

    // When leaving this page, remove the CSS
    return () => {
      document.getElementById("page-bootstrap")?.remove();
      document.getElementById("page-style")?.remove();
    };
  }, []);

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
          integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />

        {/* <script src="../assetss/js/jquery.js" defer></script> */}
        <script src="../assetss/js/bootstrap.bundle.min.js" defer></script>
        {/* <script src="../assetss/js/main.js" defer></script> */}

        <link
          rel="icon"
          type="image/x-icon"
          href="../assetss/images/favicon-32x32.png"
        />
      </Head>
      <CustomHead title="Viralon || Landing Page" keywords="" description="#" />

      <section className="header-section">
        <div className="container">
          <header className="d-flex flex-wrap justify-content-center py-3 mb-4">
            <Link
              href="/"
              className="d-flex align-items-center mb-3 mb-md-0 me-md-auto logo"
            >
              <img src="../assetss/images/logo.png" alt="Viralon Logo Image" />
            </Link>
          </header>
        </div>
      </section>

      {/* <!-- ============================= Hero area start here ======================= --> */}

      {/* <section className="hero-section">
        <div className="container">
          <div className="main-section">
            <h1 className="main-heading text-center text-white content__container__text mb-5">
              Get More
              <span className="text-orange animated-text">
                <span
                  className="animated-text-inner "
                  id="animated-text-inner"
                ></span>
              </span>
              <br /> With Us
            </h1>

            <div className="video-embed-area border-10 border border-white shadow-sm">
              <div className="ratio ratio-21x9 lazy-iframe">
                <noscript>
                  <iframe
                    className="embed-responsive-item"
                    src="https://www.youtube.com/embed/GIBWr1zXJ_U?autoplay=1&mute=1&controls=0&modestbranding=1"
                    allowfullscreen
                    className="mob-none"
                  ></iframe>
                </noscript>

                <noscript>
                  <iframe
                    id="mobileVideo"
                    src="https://www.youtube.com/embed/pGtBPQqZmnU?autoplay=1&mute=1&controls=0&modestbranding=1"
                    allowfullscreen
                    className="desk-none"
                  ></iframe>
                </noscript>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-creative">
          <img
            src="./assetss/images/hero-strip.png"
            alt="Viralon Hero-Gif"
            className="mob-none"
          />
          <img
            src="./assetss/images/hero4.svg"
            alt="Viralon Hero-Gif"
            className="desk-none"
          />
        </div>
      </section> */}

      <HeroSection/>

      {/* <!-- ============================= Hero area end here ======================= --> */}

      <Testimonials />

      <BrandLogos />

      <section className="onboard-section bg-dark ptb-100">
        <div className="container">
          <h2 className="heading text-white">Get Onboard with us</h2>

          <div className="process-area  ptb-100">
            <div>
              <div className="process-item">
                <img
                  src="../assetss/images/icons/icon4.png"
                  alt="Viralon Icon"
                />
              </div>
              <p>Get A Free Consultation</p>
            </div>

            <div className="arrow-up">
              <img src="../assetss/images/icons/arrow.png" alt="Viralon Icon" />
            </div>

            <div>
              <div className="process-item">
                <img
                  src="../assetss/images/icons/icon3.png"
                  alt="Viralon Icon"
                />
              </div>
              <p>
                Discuss Your <br /> Requirements
              </p>
            </div>

            <div className="arrow-up arrrow-down">
              <img
                src="../assetss/images/icons/bottom-arrow.png"
                alt="Viralon Icon"
              />
            </div>

            <div>
              <div className="process-item">
                <img
                  src="../assetss/images/icons/icon1.png"
                  alt="Viralon Icon"
                />
              </div>
              <p>
                Choose <br /> Plan
              </p>
            </div>

            <div className="arrow-up">
              <img src="../assetss/images/icons/arrow.png" alt="Viralon Icon" />
            </div>
            <div>
              <div className="process-item">
                <img
                  src="../assetss/images/icons/icon2.png"
                  alt="Viralon Icon"
                />
              </div>
              <p>
                Relax <br />
                And Grow
              </p>
            </div>
          </div>
        </div>

        <div id="contact-cta-section" className="contact-cta-section">
          <div className="wrapper-full">
            <div className="cta-wrapper">
              <a
                className="blue-cta-button"
                href="#"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalCenter"
              >
                Let's Talk!
              </a>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="why-us-section bg-light ptb-100">
        <div className="container">
          <h2 className="heading text-dark">
            Know the secret of our results!{" "}
          </h2>
          <div className="why-us-items-section pt-100">
            <ol>
              <li className="why-us-items active">
                <div className="why-us-item-bx border-2 border border-white shadow-sm">
                  <img
                    src="../assetss/images/why-us/1.webp"
                    alt="Viralon Image"
                  />
                </div>

                <div className="why-us-content-bx">
                  <div className="first-content">
                    <span className="why-numbers">1</span>
                    <h3>Dedicated Client Manager</h3>
                  </div>
                  <div className="right-para animate__animated animate__bounce animate__delay-2s">
                    <p className="fris-para">
                      Ace your brand game with our dedicated client manager. Our
                      managers are here to support you every step of the way,
                      whether it's in business strategy or providing solid
                      support.
                    </p>
                  </div>
                </div>
              </li>

              <li className="why-us-items">
                <div className="why-us-item-bx border-2 border border-white shadow-sm">
                  <img
                    src="../assetss/images/why-us/2.webp"
                    alt="Viralon Image"
                  />
                </div>

                <div className="why-us-content-bx">
                  <div className="first-content">
                    <span className="why-numbers">2</span>
                    <h3>Monthly Reporting & Analytics</h3>
                  </div>
                  <div className="right-para animate__animated animate__bounce animate__delay-2s">
                    <p className="fris-para">
                      Get the scoop with our monthly reports and analytics for
                      clear performance metrics and insights on what’s rocking
                      and what needs a tweak. Our reports are super sleek, with
                      no jargon just straight-up results!
                    </p>
                  </div>
                </div>
              </li>

              <li className="why-us-items">
                <div className="why-us-item-bx border-2 border border-white shadow-sm">
                  <img
                    src="../assetss/images/why-us/3.webp"
                    alt="Viralon Image"
                  />
                </div>

                <div className="why-us-content-bx">
                  <div className="first-content">
                    <span className="why-numbers">3</span>
                    <h3>ROI focused Approach</h3>
                  </div>
                  <div className="right-para">
                    <p className="fris-para">
                      We’re ROI obsessed. From targeting the perfect audience to
                      running impactful campaigns, every step is data-driven to
                      achieve measurable success.
                    </p>
                  </div>
                </div>
              </li>

              <li className="why-us-items width-55">
                <div className="why-us-item-bx border-2 border border-white shadow-sm">
                  <img
                    src="../assetss/images/why-us/4.webp"
                    alt="Viralon Image"
                  />
                </div>

                <div className="why-us-content-bx">
                  <div className="first-content">
                    <span className="why-numbers">4</span>
                    <h3>Team Of Digital Experts</h3>
                  </div>
                  <div className="right-para">
                    <p className="fris-para">
                      We're a crew of digital experts, from social media
                      marketing, branding, paid media marketing, web
                      development, and more. We're all about bringing fresh,
                      innovative solutions to level up your brand game.
                    </p>
                  </div>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      <section className="what-we-do-area ptb-100 bg-dark tabuler-section">
        <div className="container">
          <h2 className="heading text-white">What We Do?</h2>

          <section className="section">
            <div className="outer-wrapper">
              <ul
                className="inner-wrapper nav nav-pills ptb-100"
                id="pills-tab"
                role="tablist"
              >
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="pills-tab1"
                    data-bs-toggle="pill"
                    data-bs-target="#tab1"
                    type="button"
                    role="tab"
                    aria-controls="tab1"
                    aria-selected="true"
                  >
                    <img
                      src="../assetss/icons/icon1.png"
                      alt="Services Icons"
                    />
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-tab2"
                    data-bs-toggle="pill"
                    data-bs-target="#tab2"
                    type="button"
                    role="tab"
                    aria-controls="tab2"
                    aria-selected="false"
                  >
                    <img
                      src="../assetss/icons/icon2.png"
                      alt="Services Icons"
                    />
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-tab3"
                    data-bs-toggle="pill"
                    data-bs-target="#tab3"
                    type="button"
                    role="tab"
                    aria-controls="tab3"
                    aria-selected="false"
                  >
                    <img
                      src="../assetss/icons/icon3.png"
                      alt="Services Icons"
                    />
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-tab4"
                    data-bs-toggle="pill"
                    data-bs-target="#tab4"
                    type="button"
                    role="tab"
                    aria-controls="tab4"
                    aria-selected="false"
                  >
                    <img
                      src="../assetss/icons/icon4.png"
                      alt="Services Icons"
                    />
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-tab5"
                    data-bs-toggle="pill"
                    data-bs-target="#tab5"
                    type="button"
                    role="tab"
                    aria-controls="tab5"
                    aria-selected="false"
                  >
                    <img
                      src="../assetss/icons/icon5.png"
                      alt="Services Icons"
                    />
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-tab6"
                    data-bs-toggle="pill"
                    data-bs-target="#tab6"
                    type="button"
                    role="tab"
                    aria-controls="tab6"
                    aria-selected="false"
                  >
                    <img
                      src="../assetss/icons/icon6.png"
                      alt="Services Icons"
                    />
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-tab7"
                    data-bs-toggle="pill"
                    data-bs-target="#tab7"
                    type="button"
                    role="tab"
                    aria-controls="tab7"
                    aria-selected="false"
                  >
                    <img
                      src="../assetss/icons/icon7.png"
                      alt="Services Icons"
                    />
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="pills-tab8"
                    data-bs-toggle="pill"
                    data-bs-target="#tab8"
                    type="button"
                    role="tab"
                    aria-controls="tab8"
                    aria-selected="false"
                  >
                    <img
                      src="../assetss/icons/icon8.png"
                      alt="Services Icons"
                    />
                  </button>
                </li>
              </ul>
            </div>
            <div className="pseduo-track"></div>
          </section>
          <div className="tab-content" id="pills-tabContent">
            <div
              className="tab-pane fade show active"
              id="tab1"
              role="tabpanel"
              aria-labelledby="pills-tab1"
            >
              <div className="text">
                <h3 className="mb-3">Social Media Marketing</h3>
                <p>
                  Need your brand to pop up on social media? That's where we
                  come in. We craft stunning visuals and engaging content just
                  for your audience, making every post drive real results. From
                  strategic timing to targeted growth hacks, we increase your
                  reach and engagement.{" "}
                  <span>
                    <a href="https://viralon.in/services/digital/social-media-marketing">
                      Read More
                    </a>
                  </span>
                </p>
                <ul className="arrow-fill-bx">
                  <li>
                    <div className="count-num">
                      <h2>1</h2>
                    </div>
                    Turn your likes into leads with our innovative strategies.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>2</h2>
                    </div>
                    Get viral-ready content for Instagram, FB, Twitter, YouTube,
                    and LinkedIn.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>3</h2>
                    </div>
                    Receive weekly performance updates and exclusive growth
                    hacks with us!
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>4</h2>
                    </div>
                    Maximize your reach with our regular content posting at peak
                    times!
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>5</h2>
                    </div>
                    Stand out with our eye-catching visuals that pop your social
                    media.
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="tab2"
              role="tabpanel"
              aria-labelledby="pills-tab2"
            >
              <div className="text">
                <h3 className="mb-3">Branding</h3>
                <p>
                  If your brand’s logos and designs feel stuck in the past,
                  chill – you’re in the right spot. Branding is all about
                  creating a vibe that makes your brand stand out and resonate
                  with your audience. We’re the brand wizards crafting your
                  brand's entire identity. From compelling storytelling to
                  eye-catching design, with us your brand will always be the one
                  everyone’s talking about.{" "}
                  <span>
                    <a href="https://viralon.in/services/design/product-level-design">
                      Read More
                    </a>
                  </span>
                </p>
                <ul className="arrow-fill-bx">
                  <li>
                    <div className="count-num">
                      <h2>1</h2>
                    </div>
                    Get our Versatile logos, strategic branding, and designs
                    that slay everywhere.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>2</h2>
                    </div>
                    Achieve the perfect brand identity with us!
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>3</h2>
                    </div>
                    Don't blend in, stand out and get noticed with our branding
                    expertise.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>4</h2>
                    </div>
                    Maintain a consistent brand identity with our cutting-edge
                    strategies.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>5</h2>
                    </div>
                    Enjoy a customized brand story that maximizes your ROI.
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="tab3"
              role="tabpanel"
              aria-labelledby="pills-tab3"
            >
              <div className="text">
                <h3 className="mb-3">Email Marketing</h3>
                <p>
                  With around 4.48 billion people using email daily, it's the
                  ultimate platform for engagement. Are you using its power for
                  your business? Don’t miss out—link up with your perfect
                  customers and watch your sales blow up. At Viralon, we’ve got
                  a full range of email marketing services that fit your brand,
                  budget, and target audience.{" "}
                  <span>
                    <a href="https://viralon.in/services/digital/email-marketing">
                      Read More
                    </a>
                  </span>
                </p>
                <ul className="arrow-fill-bx">
                  <li>
                    <div className="count-num">
                      <h2>1</h2>
                    </div>
                    Transform your lead generation with our personalized email
                    marketing that drives results.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>2</h2>
                    </div>
                    Get engaging emails that leave your customers wanting more.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>3</h2>
                    </div>
                    Stay on top with our real-time analytics that tracks
                    revenue, conversion rates, and more.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>4</h2>
                    </div>
                    Enjoy our dedicated support and expertise to ace your
                    campaigns.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>5</h2>
                    </div>
                    Go beyond basic email sequences with our AI-powered email
                    automation.
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="tab4"
              role="tabpanel"
              aria-labelledby="pills-tab4"
            >
              <div className="text">
                <h3 className="mb-3">Influencer Marketing</h3>
                <p>
                  Forget those cringy celebrity ads! Influencer marketing is the
                  real deal. We craft a customised strategy based on your brand
                  needs. This includes finding the right influencers, creating
                  authentic stories, managing campaigns, and delivering detailed
                  reports and analytics. We help your brand connect with
                  audiences in a way that feels natural and drives real
                  engagement.{" "}
                  <span>
                    <a href="https://viralon.in/services/digital/influencer-marketing">
                      Read More
                    </a>
                  </span>
                </p>
                <ul className="arrow-fill-bx">
                  <li>
                    <div className="count-num">
                      <h2>1</h2>
                    </div>
                    From goals to ROI, get data-driven results with us.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>2</h2>
                    </div>
                    Find the perfect influencer for your brand with our
                    matchmaking services.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>3</h2>
                    </div>
                    Fuel your long-term success with our next-level influencer
                    marketing strategies.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>4</h2>
                    </div>
                    Level up your content creation by combining traditional
                    productions with influencers.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>5</h2>
                    </div>
                    Sit back and relax with our dedicated influencer and
                    campaign managers.
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="tab5"
              role="tabpanel"
              aria-labelledby="pills-tab5"
            >
              <div className="text">
                <h3 className="mb-3">Web Development</h3>
                <p>
                  Building a website aint just about clicks and code. It's like
                  crafting a website that users can't stop interacting with. We
                  turn your digital dreams into reality with epic web
                  development. From sleek, user-friendly designs to powerful
                  features, we create websites that look awesome and work
                  perfectly. Whether you’re launching a new site or giving an
                  old one a glow-up, we use the latest tech to make sure your
                  online game is on point.
                  <span>
                    <a href="https://viralon.in/services/design/ui-ux">
                      Read More
                    </a>
                  </span>
                </p>
                <ul className="arrow-fill-bx">
                  <li>
                    <div className="count-num">
                      <h2>1</h2>
                    </div>
                    From pixels to plugins, we’re your WordPress team for
                    stunning results.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>2</h2>
                    </div>
                    Reach more customers and close more deals with our
                    responsive web designs.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>3</h2>
                    </div>
                    Receive fast results and targeted reach with our SEM and SEO
                    strategies.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>4</h2>
                    </div>
                    Get top cloud services like Google Cloud, AWS, and Microsoft
                    Azure for fast application deployment.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>5</h2>
                    </div>
                    Stand out with our Customized websites that reflect your
                    unique brand identity.
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="tab6"
              role="tabpanel"
              aria-labelledby="pills-tab6"
            >
              <div className="text">
                <h3 className="mb-3">Paid Media Marketing</h3>
                <p>
                  Paid media isn't just about ads—it's like magic that grabs Gen
                  Z's attention. We craft targeted ad campaigns that hit the
                  right audience at the right time, whether it’s through social
                  media, search engines, or other platforms. Our services not
                  only grab attention but also drive engagement and set the
                  standard in your industry.
                  <span>
                    <a href="https://viralon.in/services/digital/paid-media-marketing">
                      Read More
                    </a>
                  </span>
                </p>
                <ul className="arrow-fill-bx">
                  <li>
                    <div className="count-num">
                      <h2>1</h2>
                    </div>
                    Turn your site visitors into sales with our Dynamic
                    Remarketing!
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>2</h2>
                    </div>
                    Hit the top of search results with our epic ad campaigns!
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>3</h2>
                    </div>
                    Dominate your competitors with our strategic ad creation and
                    deployment.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>4</h2>
                    </div>
                    Get faster conversions and faster results with our CRO
                    process.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>5</h2>
                    </div>
                    Stand out with our innovative Google ads, YouTube Ads,
                    LinkedIn ads and shopping ads.
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="tab7"
              role="tabpanel"
              aria-labelledby="pills-tab7"
            >
              <div className="text">
                <h3 className="mb-3">SEO</h3>
                <p>
                  Struggling to get a higher website ranking? No worries—With
                  our SEO services, get your website ranking high and receive
                  tons of traffic. To keep you ahead of the curve, we optimize
                  your content and keep an eye on emerging trends to Gain
                  attention, clicks, and outcomes. Make your website the MVP of
                  search engines with us.
                  <span>
                    <a href="https://viralon.in/services/digital/search-engine-optimization">
                      Read More
                    </a>
                  </span>
                </p>
                <ul className="arrow-fill-bx">
                  <li>
                    <div className="count-num">
                      <h2>1</h2>
                    </div>
                    Stop guessing and start dominating with our SEO keyword
                    strategy.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>2</h2>
                    </div>
                    Enjoy more leads and more sales with our web analytics
                    traffic report.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>3</h2>
                    </div>
                    Decode the algorithm and get found faster with us.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>4</h2>
                    </div>
                    Get our SEO-friendly content that increases traffic across
                    all platforms.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>5</h2>
                    </div>
                    Outsmart your competitors with our Competitive Analysis &
                    Research service.
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="tab-pane fade"
              id="tab8"
              role="tabpanel"
              aria-labelledby="pills-tab8"
            >
              <div className="text">
                <h3 className="mb-3">Production</h3>
                <p>
                  Filming content can be a real struggle. We are your production
                  crew! We’ve got you covered for all your digital media
                  needs—from brainstorming ideas to final delivery. With smart
                  planning and execution, we make sure your message pops and
                  sticks with your audience. Plus, we’re always ahead of the
                  curve with the latest trends and tech to keep you at the top
                  of your game. Make your digital presence unforgettable with
                  us.{" "}
                  <span>
                    <a href="https://viralon.in/services/digital/video-marketing">
                      Read More
                    </a>
                  </span>
                </p>
                <ul className="arrow-fill-bx">
                  <li>
                    <div className="count-num">
                      <h2>1</h2>
                    </div>
                    Don't be dull, be dazzling with our editing, colour
                    correction, and VFX, that pops!
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>2</h2>
                    </div>
                    Stand out with our bold logos and dynamic visuals that make
                    your brand unforgettable.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>3</h2>
                    </div>
                    Get engaging content in any format from our experienced
                    video production team.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>4</h2>
                    </div>
                    See your brand in the spotlight with our drone video and
                    photography services.
                  </li>

                  <li>
                    <div className="count-num">
                      <h2>5</h2>
                    </div>
                    Double your impact with our scriptwriting that drives
                    engagement and sales.
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div id="contact-cta-section" className="contact-cta-section">
            <div className="wrapper-full">
              <div className="cta-wrapper">
                <a
                  className="blue-cta-button"
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModalCenter"
                >
                  Let's Talk!
                </a>
                <div className="clearfix"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="faq-area ptb-100 bg-light">
        <div className="container">
          <h2 className="heading text-dark">FAQs</h2>

          <div className="frequently-asked-bx pt-100">
            <div className="accordion" id="accordionExample">
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
                    What Sets You Apart From Other Marketing Agencies?
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    At Viralon, our results speak louder than words. We're all
                    about creating dynamic videos, top-notch designs, epic
                    content, and seamless websites. We are focused on delivering
                    measurable results that nail your brand's targets.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    How Can I Get Started With Viralon?
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    To get started with us, simply fill out our free
                    consultation form online, We'll schedule a meeting to
                    discuss your brand vibes and goals. Our crew will drop some
                    custom strategies to enhance your online presence and
                    achieve measurable results.
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Do You Offer Free Consultations Or Demo?
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    Yes, at Viralon, we offer a free consultation to understand
                    what you need and show how our digital magic can grow your
                    brand’s online presence. It's our way of showing our skills
                    and giving you a sneak peek at the top-tier, client-focused
                    service we bring to the table.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFour">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    What Industries Do You Specialize In?
                  </button>
                </h2>
                <div
                  id="collapseFour"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFour"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    At Viralon, we're experts in a bunch of sectors like
                    personal care, food, e-commerce, travel, healthcare &
                    wellness, IT, real estate, banking & finance. Our digital
                    marketing strategies are customized to each industry’s
                    unique needs, ensuring results that hit hard and last long.
                  </div>
                </div>
              </div>

              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFive">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFive"
                    aria-expanded="false"
                    aria-controls="collapseFive"
                  >
                    How Much Time Does It Take to Achieve Measurable Results?
                  </button>
                </h2>
                <div
                  id="collapseFive"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingFive"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    With Viralon, the timeline for seeing measurable results
                    varies based on your industry, goals, and strategies.
                    Usually, you’ll notice some initial improvements in 3-4
                    months, while bigger, more significant outcomes start to
                    shine within 6-8 months.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-us-section bg-dark ptb-100 p-relative ">
        <div className="container">
          <span className="big-circle infinite-circle-animation"></span>
          <div className="form">
            <div className="contact-info">
              <h3 className="title">Let's Talk </h3>
              <p className="text">
                Partner with us & <br />
                Go viral like never before.
              </p>

              <div className="info pt-5">
                <div className="information">
                  <i className="fas fa-envelope me-2"></i>
                  <p>info@viralon.in</p>
                </div>
                <div className="information">
                  <i className="fas fa-phone me-2"></i>
                  <p>+91 93054 51301</p>
                </div>
              </div>

              <div className="social-media">
                <p>Connect with us :</p>
                <div className="social-icons">
                  <a href="https://www.facebook.com/people/Viralon-Digital-Services/61551774960535/">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href="https://www.youtube.com/@ViralonDigtialServices">
                    <i className="fab fa-youtube"></i>
                  </a>
                  <a href="https://www.instagram.com/viralon_digital_services/">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="https://www.linkedin.com/company/viralon-digital-services/">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form">
              <span className="circle one"></span>
              <span className="circle two"></span>

              {/* <form
                id="contactForm"
                action=""
                method="post"
                autoComplete="off"
              >
                <h3 className="title">Contact us</h3>

                <input type="hidden" name="formIdentifier" value="form2" />

                <div className="input-container">
                  <input
                    type="text"
                    name="full_name"
                    className="input"
                    placeholder="Full Name*"
                    required
                  />
                  <span>Full Name*</span>
                </div>

                <div className="input-container d-flex position-relative">
                 
                  <select
                    name="country_code"
                    id="country_code"
                    className="input1 c-drop"
                    required
                  >
                    <option value="91">IND (+91)</option>
                    <option value="971">UAE (+971)</option>
                    <option value="1">US (+1)</option>
                    <option value="61">AUS (+61)</option>
                    <option value="44">UK (+44)</option>
                  </select>
                  <input
                    type="tel"
                    name="phone_number"
                    className="input padding-left-110"
                    pattern="[0-9]{10}"
                    maxLength="10"
                    minLength="10"
                    required
                    placeholder="Phone Number*"
                  />
                  <span>Phone*</span>
                </div>

                <div className="input-container">
                  <input
                    type="email"
                    name="email_address"
                    className="input"
                    placeholder="Email*"
                    required
                  />
                  <span>Email*</span>
                </div>

                <div className="input-container">
                  <input
                    type="text"
                    name="your_message"
                    className="input"
                    placeholder="Business Name*"
                    required
                  />
                  <span>Business Name*</span>
                </div>

                <input
                  type="submit"
                  value="Submit"
                  className="bg-orange blue-cta-button"
                />
                <div id="message"></div>
              </form> */}


               <form id="contactForm" onSubmit={handleSubmit} autoComplete="off">
      <h3 className="title">Contact us</h3>
      <input type="hidden" name="formIdentifier" value="form2" />

      <div className="input-container">
        <input
          type="text"
          name="full_name"
          className="input"
          placeholder="Full Name*"
          value={formData.full_name}
          onChange={handleChange}
          required
        />
        <span>Full Name*</span>
      </div>

      <div className="input-container d-flex position-relative">
        <select
          name="country_code"
          id="country_code"
          className="input1 c-drop"
          value={formData.country_code}
          onChange={handleChange}
          required
        >
          <option value="91">IND (+91)</option>
          <option value="971">UAE (+971)</option>
          <option value="1">US (+1)</option>
          <option value="61">AUS (+61)</option>
          <option value="44">UK (+44)</option>
        </select>

        <input
          type="tel"
          name="phone_number"
          className="input padding-left-110"
          pattern="[0-9]{10}"
          maxLength="10"
          minLength="10"
          value={formData.phone_number}
          onChange={handleChange}
          placeholder="Phone Number*"
          required
        />
        <span>Phone*</span>
      </div>

      <div className="input-container">
        <input
          type="email"
          name="email_address"
          className="input"
          placeholder="Email*"
          value={formData.email_address}
          onChange={handleChange}
          required
        />
        <span>Email*</span>
      </div>

      <div className="input-container">
        <input
          type="text"
          name="your_message"
          className="input"
          placeholder="Business Name*"
          value={formData.your_message}
          onChange={handleChange}
          required
        />
        <span>Business Name*</span>
      </div>

      <input
        type="submit"
        value="Submit"
        className="bg-orange blue-cta-button"
      />
    </form>



            </div>
          </div>
        </div>

        <img
          src="../assetss/images/your-brands.png"
          className="footer-img mob-none"
          alt="Brands Image"
        />
        <img
          src="../assetss/images/your-brands1.svg"
          className="footer-img desk-none"
          alt="Brands Image"
        />
      </section>


      <PopupModal/>
    </>
  );
}
