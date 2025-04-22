import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
export default function CoreTask() {
  return (
    <>
      <div className="core-task-bg ptb-100">
        <div className="container">
          <div className="core-content">
            <h1>Core Tasks in Viralon's Paid Media Marketing</h1>
            <div className="devider"></div>

            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it{" "}
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
            className="swiper mySwiper4 pt-50"
          >
            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                  Strategic Campaign <br />
                  Planning
                </h2>
                <p>
                Our experts meticulously plan your paid media campaigns, identifying the most effective platforms, targeting options, and ad formats to achieve your specific marketing goals.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                  Keyword Research and
                  <br /> Optimization
                </h2>
                <p>
                  We conduct comprehensive keyword research to ensure your ads are not only seen but also reach the right audience. Continuous optimization guarantees that your budget is spent wisely and effectively.
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
                   Crafting compelling ads is an art, and we’re the artists. We create eye-catching, persuasive ad creatives that resonate with your target audience. Through rigorous A/B testing, we refine and optimize your ads for maximum engagement and impact.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>Link Building</h2>
                <p>
                Effective budget allocation is crucial for success. We manage your ad spend with precision, ensuring you get the most value for your investment. Our strategies maximize reach and conversions while minimizing waste and inefficiencies.
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
                Transparency is key to our process. We provide regular, data-driven reports that highlight key performance metrics. Our experts analyze the data to identify opportunities for improvement and adjust strategies accordingly to enhance results.
                </p>
              </div>
            </SwiperSlide>


            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                  Strategic Campaign <br />
                  Planning
                </h2>
                <p>
                Our experts meticulously plan your paid media campaigns, identifying the most effective platforms, targeting options, and ad formats to achieve your specific marketing goals.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                  Keyword Research and
                  <br /> Optimization
                </h2>
                <p>
                  We conduct comprehensive keyword research to ensure your ads are not only seen but also reach the right audience. Continuous optimization guarantees that your budget is spent wisely and effectively.
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
                   Crafting compelling ads is an art, and we’re the artists. We create eye-catching, persuasive ad creatives that resonate with your target audience. Through rigorous A/B testing, we refine and optimize your ads for maximum engagement and impact.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>Link Building</h2>
                <p>
                Effective budget allocation is crucial for success. We manage your ad spend with precision, ensuring you get the most value for your investment. Our strategies maximize reach and conversions while minimizing waste and inefficiencies.
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
                Transparency is key to our process. We provide regular, data-driven reports that highlight key performance metrics. Our experts analyze the data to identify opportunities for improvement and adjust strategies accordingly to enhance results.
                </p>
              </div>
            </SwiperSlide>

         
          </Swiper>
        </div>
      </div>
    </>
  );
}
