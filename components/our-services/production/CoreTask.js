import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
export default function CoreTask() {
  return (
    <>
      <div className="seo-core-task core-task-bg ptb-100">
        <div className="container">
          <div className="core-content pb-50">
            <h1>Viralon’s Strategic Video Production</h1>
            <div className="devider"></div>
            <p>
               We transform your vision into powerful video stories that deeply engage your audience and amplify your brand presence across all platforms.
            </p>
          </div>
          <Swiper
            spaceBetween={20}
            // centeredSlides={true}
            loop={true}
            // grabCursor={true}
            slidesPerView={5}
            // autoplay={{
            // delay: 2500,
            // disableOnInteraction: false,
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
            className="swiper mySwiper4"
          >
            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                 Concept Development
                </h2>
                <p>
                 We collaborate with you to understand your story and objectives, crafting clear, compelling concepts tailored to your unique message.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                 Scriptwriting & Storyboarding
                </h2>
                <p>
                  Our creative team develops engaging scripts and detailed storyboards, ensuring your narrative flows smoothly and resonates emotionally.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                  Filming & Direction
                </h2>
                <p>
                  Using professional equipment and expert direction, we capture high-quality footage that brings your story vividly to life.

                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>Post-Production & Editing</h2>
                <p>
                 We meticulously edit footage with cutting-edge tools, enhancing visuals, sound, and pacing to create a polished final product.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                  Distribution Strategy
                </h2>
                <p>
                  We help strategize the best channels and timing to maximize your video’s reach and impact across digital and traditional platforms.
                </p>
              </div>
            </SwiperSlide>



          </Swiper>
        </div>
      </div>
    </>
  );
}
