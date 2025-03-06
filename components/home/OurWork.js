import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
export default function OurWork() {
  return (
    <>
      <section className="our-work-section">
        <div className="container">
          <div className="row align-center ptb-50">
            <div className="col-lg-8 banner-one-item">
              <h2>
                Have a look at <strong>Our work</strong>
              </h2>
              <img src="./assets/img/icon/arrow.png" alt="Aroow"></img>
            </div>
            <div className="col-lg-3 offset-lg-1 banner-one-item text-center">
              <div className="choose-us-style-one-thumb">
                <a
                  href="https://www.youtube.com/watch?v=ipUuoMCEbDQ"
                  className="popup-youtube video-play-button"
                >
                  <i className="fas fa-play"></i>
                  <div className="effect"></div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Start Services
    ============================================= --> */}
        <div className="creative-services-area overflow-hidden default-padding">
          {/* <div className="bg-static">
            <img
              className="bg-move"
              src="assets/img/shape/5.png"
              alt="Image Not Found"
            />
          </div> */}

          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="services-item-one-items">
                  {/* <!-- Navigation --> */}
                  {/* <div className="services-nav">
                    <div className="nav-items">
                      <div className="services-button-prev"></div>
                      <div className="services-button-next"></div>
                    </div>
                  </div> */}
                  <Swiper
                    spaceBetween={20}
                    centeredSlides={true}
                    loop={true}
                    grabCursor={true}
                    slidesPerView={4.9}
                    // autoplay={{
                    //   delay: 2500,
                    //   disableOnInteraction: false,
                    // }}
                    pagination={{
                      clickable: true,
                    }}
                    navigation={{
                      nextEl: ".swiper-button-next-1",
                      prevEl: ".swiper-button-prev-1",
                    }}
                    breakpoints={{
                      240: {
                        slidesPerView: 1.5,
                        spaceBetween: 10,
                      },
                      768: {
                        slidesPerView: 2.5,
                        spaceBetween: 20,
                      },
                      1024: {
                        slidesPerView: 3.9,
                        spaceBetween: 20,
                      },
                    }}
                    modules={[Autoplay, Navigation]}
                    className="services-carousel swiper"
                  >
                    {/* <!-- Additional required wrapper --> */}

                    {/* <!-- Single Item --> */}
                    <SwiperSlide className="swiper-slide">
                      <div className="cteative-service-item">
                        <img src="assets/img/home/brands/1.png" alt="Icon" />
                        <a
                          href="https://championtutors.com.au/"
                          className="brands-link"
                        >
                          Champion Tutors
                        </a>
                      </div>
                    </SwiperSlide>
                    {/* <!-- End Single Item --> */}
                    {/* <!-- Single Item --> */}
                    <SwiperSlide className="swiper-slide">
                      <div className="cteative-service-item">
                        <img src="assets/img/home/brands/2.png" alt="Icon" />
                        <a
                          href="http://www.hitechindustries.net.in/ass_items.php"
                          className="brands-link"
                        >
                          HItech Industry
                        </a>
                      </div>
                    </SwiperSlide>
                    {/* <!-- End Single Item --> */}
                    {/* <!-- Single Item --> */}
                    <SwiperSlide className="swiper-slide">
                      <div className="cteative-service-item">
                        <img src="assets/img/home/brands/3.png" alt="Icon" />
                        <a href="https://episoul.com/" className="brands-link">
                          Episoul
                        </a>
                      </div>
                    </SwiperSlide>
                    {/* <!-- End Single Item --> */}
                    {/* <!-- Single Item --> */}
                    <SwiperSlide className="swiper-slide">
                      <div className="cteative-service-item">
                        <img src="assets/img/home/brands/4.png" alt="Icon" />
                        <a
                          href="http://rageemakeup.com/"
                          className="brands-link"
                        >
                          Ragee Makeup
                        </a>
                      </div>
                    </SwiperSlide>
                    {/* <!-- End Single Item --> */}

                    {/* <!-- Single Item --> */}

                    <SwiperSlide className="swiper-slide">
                      <div className="cteative-service-item">
                        <img src="assets/img/home/brands/5.png" alt="Icon" />
                        <a
                          href="https://tourwatchout.com/"
                          className="brands-link"
                        >
                          Tour Watchout
                        </a>
                      </div>
                    </SwiperSlide>

                    {/* <!-- End Single Item --> */}
                    {/* <!-- Single Item --> */}

                    <SwiperSlide className="swiper-slide">
                      <div className="cteative-service-item">
                        <img src="assets/img/home/brands/1.png" alt="Icon" />
                        <a
                          href="https://championtutors.com.au/"
                          className="brands-link"
                        >
                          Champion Tutors
                        </a>
                      </div>
                    </SwiperSlide>
                    {/* <!-- End Single Item --> */}

                    {/* <!-- Single Item --> */}
                    <SwiperSlide className="swiper-slide">
                      <div className="cteative-service-item">
                        <img src="assets/img/home/brands/2.png" alt="Icon" />
                        <a
                          href="http://www.hitechindustries.net.in/ass_items.php"
                          className="brands-link"
                        >
                          HItech Industry
                        </a>
                      </div>
                    </SwiperSlide>
                    {/* <!-- End Single Item --> */}
                    {/* <!-- Single Item --> */}
                    <SwiperSlide className="swiper-slide">
                      <div className="cteative-service-item">
                        <img src="assets/img/home/brands/3.png" alt="Icon" />
                        <a href="https://episoul.com/" className="brands-link">
                          Episoul
                        </a>
                      </div>
                    </SwiperSlide>
                    {/* <!-- End Single Item --> */}
                    {/* <!-- Single Item --> */}
                    <SwiperSlide className="swiper-slide">
                      <div className="cteative-service-item">
                        <img src="assets/img/home/brands/4.png" alt="Icon" />
                        <a
                          href="http://rageemakeup.com/"
                          className="brands-link"
                        >
                          Ragee Makeup
                        </a>
                      </div>
                    </SwiperSlide>
                    {/* <!-- End Single Item --> */}

                    {/* <!-- Single Item --> */}

                    <SwiperSlide className="swiper-slide">
                      <div className="cteative-service-item">
                        <img src="assets/img/home/brands/5.png" alt="Icon" />
                        <a
                          href="https://tourwatchout.com/"
                          className="brands-link"
                        >
                          Tour Watchout
                        </a>
                      </div>
                    </SwiperSlide>

                    <SwiperSlide className="swiper-slide">
                      <div className="cteative-service-item">
                        <img src="assets/img/home/brands/3.png" alt="Icon" />
                        <a href="https://episoul.com/" className="brands-link">
                          Episoul
                        </a>
                      </div>
                    </SwiperSlide>
                    {/* <!-- End Single Item --> */}
                    {/* <!-- Single Item --> */}
                    <SwiperSlide className="swiper-slide">
                      <div className="cteative-service-item">
                        <img src="assets/img/home/brands/4.png" alt="Icon" />
                        <a
                          href="http://rageemakeup.com/"
                          className="brands-link"
                        >
                          Ragee Makeup
                        </a>
                      </div>
                    </SwiperSlide>
                    {/* <!-- End Single Item --> */}

                    {/* <!-- Single Item --> */}

                    <SwiperSlide className="swiper-slide">
                      <div className="cteative-service-item">
                        <img src="assets/img/home/brands/5.png" alt="Icon" />
                        <a
                          href="https://tourwatchout.com/"
                          className="brands-link"
                        >
                          Tour Watchout
                        </a>
                      </div>
                    </SwiperSlide>

                    {/* <!-- End Single Item --> */}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- End Services --> */}
      </section>
    </>
  );
}
