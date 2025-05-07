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
            <h1>Viralon’s Strategic branding for every business</h1>
            <div className="devider"></div>

            <p>
              Brands are fueled by a mixture of emotion and strategy. The true art of branding design is combining both— to stand out from the competition and forge memorable connections.
            </p>
          </div>
          <Swiper
            spaceBetween={20}
            // centeredSlides={true}
            // loop={true}
            // grabCursor={true}
            slidesPerView={5}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next-1",
              prevEl: ".swiper-button-prev-1",
            }}
            breakpoints={{
              240: {

        
              loop :true,
              grabCursor :true,
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
                  Embracing New Trends
                </h2>
                <p>
                   Viralon stays ahead of the curve by continuously monitoring and integrating the latest branding trends, ensuring that clients' brands remain fresh, relevant, and appealing to modern consumers.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                  Target Audience Analysis
                </h2>
                <p>
                  Through in-depth research and analysis, Viralon identifies the specific needs, preferences, and behaviors of target audiences, allowing branding strategies that resonate deeply and foster engagement.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                  Core Values & Story
                </h2>
                <p>
                  By articulating a brand's core values and unique story, Viralon helps clients create authentic connections with their audience, enhancing brand loyalty and establishing a strong market presence.
                </p>
              </div>
            </SwiperSlide>

         

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                  Feedback Adaptation
                </h2>
                <p>
                  Committed to an iterative design process, Viralon actively seeks feedback from clients and consumers, allowing for ongoing refinements that ensure branding strategies remain effective and aligned with market dynamics.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                  Real-Life Mockups
                </h2>
                <p>
                  Viralon utilizes real-life mockups to bring branding concepts to life, providing clients with tangible visualizations that demonstrate how their brand will appear in various contexts and touchpoints.
                </p>
              </div>
            </SwiperSlide>

          </Swiper>
        </div>
      </div>
    </>
  );
}
