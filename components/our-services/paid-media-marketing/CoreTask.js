import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
export default function CoreTask() {
  return (
    <>
      <div className="core-task-bg ptb-100">
        <div className="container">
          <div className="core-content pb-50">
            <h1>Core Tasks in Viralon's Paid Media Marketing</h1>
            <div className="devider"></div>

            <p>
               Our focused approach combines strategic planning, precise targeting, creative ad development, and data-driven analysis to deliver impactful campaigns that resonate with your audience and maximise your return on investment.
            </p>
          </div>
          <Swiper
            spaceBetween={20}
            // centeredSlides={true}
            loop={true}
            // grabCursor={true}
            slidesPerView={5}
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
                centeredSlides: true,

                slidesPerView: 1.5,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 5,
                spaceBetween: 20,
              },
            }}
            modules={[Autoplay, Navigation]}
            className="swiper mySwiper4 "
          >
            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                  Strategic Campaign <br />
                  Planning
                </h2>
                <p>
                  Our experts meticulously plan your paid media campaigns,
                  identifying the most effective platforms, targeting options,
                  and ad formats to achieve your Unique goals.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                  Keyword Research and
                  <br /> Optimisation
                </h2>
                <p>
                  We conduct comprehensive keyword research to ensure your ads
                  are not only seen but also reach the right audience.
                  Continuous optimization guarantees that your budget is spent
                  wisely and effectively.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                  Ad Creation and A/B
                  <br /> Testing
                </h2>
                <p>
                  Crafting compelling ads is an art, and we’re the artists. We
                  create eye-catching, persuasive ad creatives that resonate
                  with your target audience. Through rigorous A/B testing, we
                  refine and optimize your ads for maximum engagement and
                  impact.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>Link Building</h2>
                <p>
                  Effective budget allocation is crucial for success. We manage
                  your ad spend with precision, ensuring you get the most value
                  for your investment. Our strategies maximize reach and
                  conversions while minimizing waste and inefficiencies.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                  On-Page and
                  <br />
                  Off-Page SEO
                </h2>
                <p>
                  Transparency is key to our process. We provide regular,
                  data-driven reports that highlight key performance metrics.
                  Our experts analyze the data to identify opportunities for
                  improvement and adjust strategies accordingly to enhance
                  results.
                </p>
              </div>
            </SwiperSlide>


          </Swiper>
        </div>
      </div>
    </>
  );
}
