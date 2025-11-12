// import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useState } from "react";
import toast from "react-hot-toast";
// import "swiper/css/navigation";

import { useRouter } from "next/router"; // ✅ for redirect         
export default function Testimonials() {



  const testimonials = [
    {
      img: "../assetss/images/testimonials/mahima.webp",
      name: "Mahima Sukhwal",
      time: "2 months ago",
      text: `Viralon is the go-to digital marketing agency in Lucknow! Their expertise and attention to detail have helped my business thrive online. Highly recommend them to anyone looking to grow their digital presence!`,
      link: "https://www.google.com/maps/contrib/110499248533211612686/place/ChIJmSsWH1njmzkRgZJyklYdDOw",
    },
    {
      img: "../assetss/images/testimonials/deepak.webp",
      name: "Deepak Singh",
      time: "3 months ago",
      text: `Viralon has been instrumental in transforming my online presence. Their professionalism and dedication shine through in every project they undertake.`,
      link: "https://www.google.com/maps/contrib/104864815466056183828/place/ChIJmSsWH1njmzkRgZJyklYdDOw",
    },
    {
      img: "../assetss/images/testimonials/smridhi.webp",
      name: "Samridhi Garg",
      time: "2 months ago",
      text: `It's been a long time working with Viralon for my digital marketing needs, and I am glad to say that I am really impressed by their dedication and professionalism.`,
      link: "https://www.google.com/maps/contrib/113796512669099304781/place/ChIJmSsWH1njmzkRgZJyklYdDOw",
    },
    {
      img: "../assetss/images/testimonials/dr.webp",
      name: "Dr Nishith Shivam",
      time: "6 months ago",
      text: `If you're looking for a reliable digital marketing agency, look no further than Viralon Digital Services. Their expertise in social media marketing and Google Ads is unparalleled.`,
      link: "https://www.google.com/maps/contrib/113796512669099304781/place/ChIJmSsWH1njmzkRgZJyklYdDOw",
    },
    {
      img: "../assetss/images/testimonials/company.webp",
      name: "All World Tony Stark",
      time: "7 months ago",
      text: `I had a fantastic experience with Viralon Digital Services in Lucknow. Their team demonstrated exceptional expertise and exceeded expectations.`,
      link: "https://www.google.com/maps/contrib/104721027855665994070/place/ChIJmSsWH1njmzkRgZJyklYdDOw",
    },
    {
      img: "../assetss/images/testimonials/company2.webp",
      name: "Astro Amateur",
      time: "6 months ago",
      text: `In-depth review regarding Viralon Digital Services! Their creativity and innovation are truly next-level.`,
      link: "https://www.google.com/maps/contrib/112245269299355404517/place/ChIJmSsWH1njmzkRgZJyklYdDOw",
    },


     {
      img: "../assetss/images/testimonials/mahima.webp",
      name: "Mahima Sukhwal",
      time: "2 months ago",
      text: `Viralon is the go-to digital marketing agency in Lucknow! Their expertise and attention to detail have helped my business thrive online. Highly recommend them to anyone looking to grow their digital presence!`,
      link: "https://www.google.com/maps/contrib/110499248533211612686/place/ChIJmSsWH1njmzkRgZJyklYdDOw",
    },
    {
      img: "../assetss/images/testimonials/deepak.webp",
      name: "Deepak Singh",
      time: "3 months ago",
      text: `Viralon has been instrumental in transforming my online presence. Their professionalism and dedication shine through in every project they undertake.`,
      link: "https://www.google.com/maps/contrib/104864815466056183828/place/ChIJmSsWH1njmzkRgZJyklYdDOw",
    },
    {
      img: "../assetss/images/testimonials/smridhi.webp",
      name: "Samridhi Garg",
      time: "2 months ago",
      text: `It's been a long time working with Viralon for my digital marketing needs, and I am glad to say that I am really impressed by their dedication and professionalism.`,
      link: "https://www.google.com/maps/contrib/113796512669099304781/place/ChIJmSsWH1njmzkRgZJyklYdDOw",
    },
    {
      img: "../assetss/images/testimonials/dr.webp",
      name: "Dr Nishith Shivam",
      time: "6 months ago",
      text: `If you're looking for a reliable digital marketing agency, look no further than Viralon Digital Services. Their expertise in social media marketing and Google Ads is unparalleled.`,
      link: "https://www.google.com/maps/contrib/113796512669099304781/place/ChIJmSsWH1njmzkRgZJyklYdDOw",
    },
    {
      img: "../assetss/images/testimonials/company.webp",
      name: "All World Tony Stark",
      time: "7 months ago",
      text: `I had a fantastic experience with Viralon Digital Services in Lucknow. Their team demonstrated exceptional expertise and exceeded expectations.`,
      link: "https://www.google.com/maps/contrib/104721027855665994070/place/ChIJmSsWH1njmzkRgZJyklYdDOw",
    },
    {
      img: "../assetss/images/testimonials/company2.webp",
      name: "Astro Amateur",
      time: "6 months ago",
      text: `In-depth review regarding Viralon Digital Services! Their creativity and innovation are truly next-level.`,
      link: "https://www.google.com/maps/contrib/112245269299355404517/place/ChIJmSsWH1njmzkRgZJyklYdDOw",
    },
  ];




 const router = useRouter();

  const [formData, setFormData] = useState({
    formIdentifier: "form1",
    fullName: "",
    country_code: "91",
    mobileNumber: "",
    email: "",
    businessName: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const loadingToast = toast.loading("Submitting your query...");

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

        // Optional: short delay to show the toast before redirect
        setTimeout(() => {
          router.push("/thank-you");
        }, 1000);
      } else {
        toast.error(data.message || "Failed to submit form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.dismiss(loadingToast);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <section className="clients-section bg-light ptb-100 p-relative">
      <div className="container">
        <h2 className="heading text-dark">
          Have a look
          <br /> What our Clients are saying
        </h2>

        <div className="cilents-bx pt-100">
          <div className="row bg-image p-30">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="star-bx">
                <div className="google-bx">
                  <img
                    src="../assetss/images/icons/google.png"
                    alt="google logo image"
                  />
                  <div className="review-txt">
                    <p>Reviews</p>
                    <img
                      src="../assetss/images/icons/rating.png"
                      alt="Google Rating Image"
                    />
                  </div>
                </div>

                <div className="padding-left">
                  <p className="para text-white">
                    Our 99% of clients report seeing a significant increase in
                    reach after connecting with us and we are proud to say that
                    we have helped them achieve their goals.
                  </p>
                </div>
              </div>
            </div>

            {/* Swiper Slider replacing Bootstrap Carousel */}
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="bg-body-tertiary">

                <div className="carousel mt-2">
                <Swiper
                  modules={[ Autoplay]}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,

                    
                  }}

                  grabCursor="true"
                  spaceBetween={5}
                  slidesPerView={4}
                  loop="true"

                   breakpoints={{
                      240: {
                        slidesPerView: 1.5,
                        spaceBetween: 5,
                      },
                      480: {
                        slidesPerView: 1.5,
                        spaceBetween: 5,
                      },
                      768: {
                        slidesPerView: 2,
                        spaceBetween: 5,
                      },
                      1024: {
                        slidesPerView: 2.5,
                        spaceBetween: 5,
                      },
                      1240: {
                        slidesPerView: 3,
                        spaceBetween: 5,
                      },
                      1440: {
                        slidesPerView: 4,
                        spaceBetween: 5,
                      },
                    }}
                  className="carousel-inner"


                  
                >
                    

                    
                  {testimonials.map((item, index) => (
                    <SwiperSlide key={index} className="carousel-item  active">
                      <div className="card shadow-sm rounded-3">
                        <div className="quotes display-2 text-body-tertiary">
                          <i className="bi bi-quote"></i>
                        </div>
                        <div className="card-body">
                          <div className="d-flex align-items-center pt-2">
                            <img src={item.img} alt={item.name} />
                            <div>
                              <h5 className="card-title fw-bold">{item.name}</h5>
                              <span className="text-secondary">{item.time}</span>
                              <div className="review-txt">
                                <img
                                  src="../assetss/images/icons/rating.png"
                                  alt="Google Rating Image"
                                />
                              </div>
                            </div>
                          </div>
                          <p className="card-text mt-2">{item.text}</p>
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="login-with-google-btn"
                          >
                            View on Google
                          </a>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ===== Contact Form (unchanged) ===== */}
        <div className="cilents-bx pt-100" id="lets-connect">
          <div className="row">
            <div className="col-lg-12 p-0">
              <div className="bg-image-1 p-30">
                <h2 className="heading text-white">
                  Let's Talk Your Requirements!
                </h2>

                <div className="row">
                  <div className="col-lg-12">
                    {/* <form
                      className="req-forms"
                      id="QueryForm"
                      action=""
                      method="post"
                      autoComplete="off"
                    >
                      <input
                        type="hidden"
                        name="formIdentifier"
                        value="form1"
                      />
                      <div className="row pt-50">
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <input
                              type="text"
                              name="fullName"
                              className="form-control"
                              id="FullName"
                              placeholder="Full Name*"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3 d-flex position-relative">
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
                              name="mobileNumber"
                              className="form-control padding-left-110"
                              id="MobileNumber"
                              placeholder="Phone Number*"
                              required
                              pattern="[0-9]{10}"
                              maxLength="10"
                              minLength="10"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <input
                              type="email"
                              name="email"
                              className="form-control"
                              id="EmailAdd"
                              placeholder="Email Address"
                              required
                            />
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="mb-3">
                            <input
                              type="text"
                              name="businessName"
                              className="form-control"
                              id="BusinessName"
                              placeholder="Business Name*"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <button type="submit" className="blue-cta-button">
                        Submit
                      </button>
                      <div id="message"></div>
                    </form> */}


                  <form className="req-forms" id="queryForm" onSubmit={handleSubmit}>
      <input type="hidden" name="formIdentifier" value="form1" />

      <div className="row pt-50">
        <div className="col-lg-6">
          <div className="mb-3">
            <input
              type="text"
              name="fullName"
              className="form-control"
              id="FullName"
              placeholder="Full Name*"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col-lg-6">
          <div className="mb-3 d-flex position-relative">
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
              name="mobileNumber"
              className="form-control padding-left-110"
              id="MobileNumber"
              placeholder="Phone Number*"
              value={formData.mobileNumber}
              onChange={handleChange}
              pattern="[0-9]{10}"
              maxLength="10"
              minLength="10"
              required
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              id="EmailAdd"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="mb-3">
            <input
              type="text"
              name="businessName"
              className="form-control"
              id="BusinessName"
              placeholder="Business Name*"
              value={formData.businessName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
      </div>

      <button type="submit" className="blue-cta-button">
        Submit
      </button>
    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
