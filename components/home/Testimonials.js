import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
export default function Testimonials() {
  return (
    <>
      <section className="testimonials  pt-80">
        <div className="container-fluid bg-linear pt-80">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-10 text-center">
            HAVE A LOOK
            <br />
            WHAT OUR CLIENTS ARE SAYING
          </h1>
          <div className="p-relative pb-80">
            <Swiper
              spaceBetween={20}
              centeredSlides={true}
              loop={true}
              slidesPerView={3}
              // autoplay={{
              //   delay: 2500,
              //   disableOnInteraction: false,
              // }}
              pagination={{
                clickable: true,
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
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
              modules={[Autoplay, Navigation]}
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
              spaceBetween={20}
              centeredSlides={true}
              loop={true}
              slidesPerView={3}
              // autoplay={{
              //   delay: 2000,
              //   disableOnInteraction: false,
              // }}
              pagination={{
                clickable: true,
              }}
              navigation={{
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }}
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
              modules={[Autoplay, Navigation]}
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
