"use client"; // Required for Next.js (App Router)
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css/free-mode";
import { Autoplay, Navigation, FreeMode, Pagination } from "swiper/modules";
export default function Testimonials() {
  return (
    <>
      <section className="testimonials  pt-100">
        <div className="container-fluid bg-linear pt-80">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-10 text-center">
            HAVE A LOOK
            <br />
            WHAT OUR CLIENTS ARE SAYING
          </h1>
          <div className="p-relative pt-50 pb-50 ">
            <Swiper
            
            modules={[Autoplay, FreeMode, Navigation, Pagination]}
            slidesPerView="auto"
            spaceBetween={10} // Reduced space for smooth scrolling
            centeredSlides={false} // Disabled centering for continuous scrolling
            loop={true} // Ensures infinite loop
            speed={5000} // Adjust speed for a smooth effect
            autoplay={{
              delay: 0, // No delay for continuous movement
              disableOnInteraction: false,
            }}
            freeMode={true} // Allows smooth scrolling without abrupt stops
            // pagination={{
            //   clickable: true,
            // }}
            // navigation={true} // Enables navigation buttons


              breakpoints={{
                240: {
                  slidesPerView: 1.1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                },
                840: {
                  slidesPerView: 1.7,
                  spaceBetween: 20,
                },
                1240: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
           
              className="swiper mySwiper pt-80"
            >
              <SwiperSlide className="swiper-slide">
                <div className="testimonial-card">
                  <img
                    src="/assets/img/home/testimonials/1.png"
                    alt="Testimonials"
                    width="150"
                    height="220"
                    className="review-main-img"
                  />
                  <div className="review-right-bx">
                    <div className="rating d-flex align-items-center">
                      <img
                        src="/assets/img/icon/star.png"
                        alt="Star Review"
                      ></img>
                      <span>5.0 rating</span>
                    </div>
                    <p className="text-secondary mt-2">
                      Viralon has been instrumental in transforming my online
                      presence. Their professionalism and dedication shine
                      through in every project
                    </p>
                    <p className="company mt-4">Ragee Makeup</p>
                    <p className="position">Legacy Solutions Engineer</p>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="swiper-slide tt-50">
                <div className="testimonial-card">
                  <img
                    src="/assets/img/home/testimonials/2.png"
                    alt="Testimonials"
                    width="150"
                    height="270"
                    className="review-main-img"
                  />
                  <div className="review-right-bx">
                    <div className="rating d-flex align-items-center">
                      <img
                        src="/assets/img/icon/star.png"
                        alt="Star Review"
                      ></img>
                      <span>5.0 rating</span>
                    </div>
                    <p className="text-secondary mt-2">
                      Viralon has been instrumental in transforming my online
                      presence. Their professionalism and dedication shine
                      through in every project they undertake. Best digital
                      marketing company in Lucknow!
                    </p>
                    <p className="company mt-4">Ragee Makeup</p>
                    <p className="position">Legacy Solutions Engineer</p>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="swiper-slide">
                <div className="testimonial-card">
                  <img
                    src="/assets/img/home/testimonials/3.png"
                    alt="Testimonials"
                    width="150"
                    height="270"
                    className="review-main-img"
                  />
                  <div className="review-right-bx">
                    <div className="rating d-flex align-items-center">
                      <img
                        src="/assets/img/icon/star.png"
                        alt="Star Review"
                      ></img>
                      <span>5.0 rating</span>
                    </div>
                    <p className="text-secondary mt-2">
                      Viralon has been instrumental in transforming my online
                      presence. Their professionalism and dedication shine
                      through in every project they undertake. Best digital
                      marketing company in Lucknow!
                    </p>
                    <p className="company mt-4">Ragee Makeup</p>
                    <p className="position">Legacy Solutions Engineer</p>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="swiper-slide tt-50">
                <div className="testimonial-card">
                  <img
                    src="/assets/img/home/testimonials/4.png"
                    alt="Testimonials"
                    width="150"
                    height="270"
                    className="review-main-img"
                  />
                  <div className="review-right-bx">
                    <div className="rating d-flex align-items-center">
                      <img
                        src="/assets/img/icon/star.png"
                        alt="Star Review"
                      ></img>
                      <span>5.0 rating</span>
                    </div>
                    <p className="text-secondary mt-2">
                      Viralon has been instrumental in transforming my online
                      presence. Their professionalism and dedication shine
                      through in every project they undertake. Best digital
                      marketing company in Lucknow!
                    </p>
                    <p className="company mt-4">Ragee Makeup</p>
                    <p className="position">Legacy Solutions Engineer</p>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="swiper-slide">
                <div className="testimonial-card">
                  <img
                    src="/assets/img/home/testimonials/1.png"
                    alt="Testimonials"
                    width="150"
                    height="220"
                    className="review-main-img"
                  />

                  <div className="review-right-bx">
                    <div className="rating d-flex align-items-center">
                      <img
                        src="/assets/img/icon/star.png"
                        alt="Star Review"
                      ></img>
                      <span>5.0 rating</span>
                    </div>
                    <p className="text-secondary mt-2">
                      Viralon has been instrumental in transforming my online
                      presence. Their professionalism and dedication shine
                      through in every project
                    </p>
                    <p className="company mt-4">Ragee Makeup</p>
                    <p className="position">Legacy Solutions Engineer</p>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="swiper-slide tt-50">
                <div className="testimonial-card">
                  <img
                    src="/assets/img/home/testimonials/2.png"
                    alt="Testimonials"
                    width="150"
                    height="270"
                    className="review-main-img"
                  />
                  <div className="review-right-bx">
                    <div className="rating d-flex align-items-center">
                      <img
                        src="/assets/img/icon/star.png"
                        alt="Star Review"
                      ></img>
                      <span>5.0 rating</span>
                    </div>
                    <p className="text-secondary mt-2">
                      Viralon has been instrumental in transforming my online
                      presence. Their professionalism and dedication shine
                      through in every project they undertake. Best digital
                      marketing company in Lucknow!
                    </p>
                    <p className="company mt-4">Ragee Makeup</p>
                    <p className="position">Legacy Solutions Engineer</p>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="swiper-slide">
                <div className="testimonial-card">
                  <img
                    src="/assets/img/home/testimonials/3.png"
                    alt="Testimonials"
                    width="150"
                    height="270"
                    className="review-main-img"
                  />
                  <div className="review-right-bx">
                    <div className="rating d-flex align-items-center">
                      <img
                        src="/assets/img/icon/star.png"
                        alt="Star Review"
                      ></img>
                      <span>5.0 rating</span>
                    </div>
                    <p className="text-secondary mt-2">
                      Viralon has been instrumental in transforming my online
                      presence. Their professionalism and dedication shine
                      through in every project they undertake. Best digital
                      marketing company in Lucknow!
                    </p>
                    <p className="company mt-4">Ragee Makeup</p>
                    <p className="position">Legacy Solutions Engineer</p>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="swiper-slide tt-50">
                <div className="testimonial-card">
                  <img
                    src="/assets/img/home/testimonials/4.png"
                    alt="Testimonials"
                    width="150"
                    height="270"
                    className="review-main-img"
                  />
                  <div className="review-right-bx">
                    <div className="rating d-flex align-items-center">
                      <img
                        src="/assets/img/icon/star.png"
                        alt="Star Review"
                      ></img>
                      <span>5.0 rating</span>
                    </div>
                    <p className="text-secondary mt-2">
                      Viralon has been instrumental in transforming my online
                      presence. Their professionalism and dedication shine
                      through in every project they undertake. Best digital
                      marketing company in Lucknow!
                    </p>
                    <p className="company mt-4">Ragee Makeup</p>
                    <p className="position">Legacy Solutions Engineer</p>
                  </div>
                </div>
              </SwiperSlide>

              {/* <!-- <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-pagination"></div> --> */}
            </Swiper>

            <Swiper
             modules={[Autoplay, FreeMode, Navigation, Pagination]}
             slidesPerView="auto"
             spaceBetween={10} // Reduced space for smooth scrolling
             centeredSlides={false} // Disabled centering for continuous scrolling
             loop={true} // Ensures infinite loop
             speed={5000} // Adjust speed for a smooth effect
             autoplay={{
               delay: 0, // No delay for continuous movement
               disableOnInteraction: false,
             }}
             freeMode={true} // Allows smooth scrolling without abrupt stops
              breakpoints={{
                240: {
                  slidesPerView: 1.1,
                  spaceBetween: 10,
                },
                768: {
                  slidesPerView: 1.5,
                  spaceBetween: 20,
                },
                840: {
                  slidesPerView: 1.7,
                  spaceBetween: 20,
                },
                1240: {
                  slidesPerView: 3,
                  spaceBetween: 20,
                },
              }}
           
              className="swiper mySwiper pt-80"
            >
              <SwiperSlide className="swiper-slide tt-50">
                <div className="testimonial-card">
                  <img
                    src="/assets/img/home/testimonials/1.png"
                    alt="Testimonials"
                    width="150"
                    height="220"
                    className="review-main-img"
                  />

                  <div className="review-right-bx">
                    <div className="rating d-flex align-items-center">
                      <img
                        src="/assets/img/icon/star.png"
                        alt="Star Review"
                      ></img>
                      <span>5.0 rating</span>
                    </div>
                    <p className="text-secondary mt-2">
                      Viralon has been instrumental in transforming my online
                      presence. Their professionalism and dedication shine
                      through in every project
                    </p>

                    <p className="company mt-4">Ragee Makeup</p>
                    <p className="position">Legacy Solutions Engineer</p>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="swiper-slide">
                <div className="testimonial-card">
                  <img
                    src="/assets/img/home/testimonials/2.png"
                    alt="Testimonials"
                    width="150"
                    height="270"
                    className="review-main-img"
                  />
                  <div className="review-right-bx">
                    <div className="rating d-flex align-items-center">
                      <img
                        src="/assets/img/icon/star.png"
                        alt="Star Review"
                      ></img>
                      <span>5.0 rating</span>
                    </div>
                    <p className="text-secondary mt-2">
                      Viralon has been instrumental in transforming my online
                      presence. Their professionalism and dedication shine
                      through in every project
                    </p>
                    <p className="company mt-4">Ragee Makeup</p>
                    <p className="position">Legacy Solutions Engineer</p>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="swiper-slide tt-50">
                <div className="testimonial-card">
                  <img
                    src="/assets/img/home/testimonials/3.png"
                    alt="Testimonials"
                    width="150"
                    height="270"
                    className="review-main-img"
                  />
                  <div className="review-right-bx">
                    <div className="rating d-flex align-items-center">
                      <img
                        src="/assets/img/icon/star.png"
                        alt="Star Review"
                      ></img>
                      <span>5.0 rating</span>
                    </div>
                    <p className="text-secondary mt-2">
                      Viralon has been instrumental in transforming my online
                      presence. Their professionalism and dedication shine
                      through in every project they undertake. Best digital
                      marketing company in Lucknow!
                    </p>
                    <p className="company mt-4">Ragee Makeup</p>
                    <p className="position">Legacy Solutions Engineer</p>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="swiper-slide">
                <div className="testimonial-card">
                  <img
                    src="/assets/img/home/testimonials/4.png"
                    alt="Testimonials"
                    width="150"
                    height="270"
                    className="review-main-img"
                  />
                  <div className="review-right-bx">
                    <div className="rating d-flex align-items-center">
                      <img
                        src="/assets/img/icon/star.png"
                        alt="Star Review"
                      ></img>
                      <span>5.0 rating</span>
                    </div>
                    <p className="text-secondary mt-2">
                      Viralon has been instrumental in transforming my online
                      presence. Their professionalism and dedication shine
                      through in every project they undertake. Best digital
                      marketing company in Lucknow!
                    </p>
                    <p className="company mt-4">Ragee Makeup</p>
                    <p className="position">Legacy Solutions Engineer</p>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="swiper-slide tt-50">
                <div className="testimonial-card">
                  <img
                    src="/assets/img/home/testimonials/1.png"
                    alt="Testimonials"
                    width="150"
                    height="220"
                    className="review-main-img"
                  />

                  <div className="review-right-bx">
                    <div className="rating d-flex align-items-center">
                      <img
                        src="/assets/img/icon/star.png"
                        alt="Star Review"
                      ></img>
                      <span>5.0 rating</span>
                    </div>
                    <p className="text-secondary mt-2">
                      Viralon has been instrumental in transforming my online
                      presence. Their professionalism and dedication shine
                      through in every project
                    </p>

                    <p className="company mt-4">Ragee Makeup</p>
                    <p className="position">Legacy Solutions Engineer</p>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="swiper-slide">
                <div className="testimonial-card">
                  <img
                    src="/assets/img/home/testimonials/2.png"
                    alt="Testimonials"
                    width="150"
                    height="270"
                    className="review-main-img"
                  />
                  <div className="review-right-bx">
                    <div className="rating d-flex align-items-center">
                      <img
                        src="/assets/img/icon/star.png"
                        alt="Star Review"
                      ></img>
                      <span>5.0 rating</span>
                    </div>
                    <p className="text-secondary mt-2">
                      Viralon has been instrumental in transforming my online
                      presence. Their professionalism and dedication shine
                      through in every project they undertake. Best digital
                      marketing company in Lucknow!
                    </p>
                    <p className="company mt-4">Ragee Makeup</p>
                    <p className="position">Legacy Solutions Engineer</p>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="swiper-slide tt-50">
                <div className="testimonial-card">
                  <img
                    src="/assets/img/home/testimonials/3.png"
                    alt="Testimonials"
                    width="150"
                    height="270"
                    className="review-main-img"
                  />
                  <div className="review-right-bx">
                    <div className="rating d-flex align-items-center">
                      <img
                        src="/assets/img/icon/star.png"
                        alt="Star Review"
                      ></img>
                      <span>5.0 rating</span>
                    </div>
                    <p className="text-secondary mt-2">
                      Viralon has been instrumental in transforming my online
                      presence. Their professionalism and dedication shine
                      through in every project they undertake. Best digital
                      marketing company in Lucknow!
                    </p>
                    <p className="company mt-4">Ragee Makeup</p>
                    <p className="position">Legacy Solutions Engineer</p>
                  </div>
                </div>
              </SwiperSlide>

              <SwiperSlide className="swiper-slide">
                <div className="testimonial-card">
                  <img
                    src="/assets/img/home/testimonials/4.png"
                    alt="Testimonials"
                    width="150"
                    height="270"
                    className="review-main-img"
                  />
                  <div className="review-right-bx">
                    <div className="rating d-flex align-items-center">
                      <img
                        src="/assets/img/icon/star.png"
                        alt="Star Review"
                      ></img>
                      <span>5.0 rating</span>
                    </div>
                    <p className="text-secondary mt-2">
                      Viralon has been instrumental in transforming my online
                      presence. Their professionalism and dedication shine
                      through in every project they undertake. Best digital
                      marketing company in Lucknow!
                    </p>
                    <p className="company mt-4">Ragee Makeup</p>
                    <p className="position">Legacy Solutions Engineer</p>
                  </div>
                </div>
              </SwiperSlide>

              {/* <!-- <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                    <div className="swiper-pagination"></div> --> */}
            </Swiper>

            <div className="mobile-none">
              {/* <div className="swiper-button-prev"></div> */}
              {/* <div className="swiper-button-next"></div> */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
