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
            <h1>Core Tasks in Viralon's Logo Design</h1>
            <div className="devider"></div>
            <p>
              Our comprehensive approach ensures your logo reflects your brand’s
              essence and stands out in a competitive market.
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
                <h2>Understanding Your Vision</h2>
                <p>
                  We begin by understanding your vision, thoughts about your
                  brand, and the values you deliver, ensuring alignment with
                  your goals.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>Target Audience Analysis</h2>
                <p>
                  We identify your brand's target audience and strategize how to
                  align the design with both your brand identity and audience
                  expectations.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>Concept Creation</h2>
                <p>
                  Our talented designers create multiple logo concepts that
                  embody your brand’s vision and values, ensuring a unique and
                  memorable identity.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>Complimentary Style</h2>
                <p>
                  We design secondary logo icons and shapes that complement the
                  primary logo, enhancing brand recognition across various
                  applications.
                </p>
              </div>
            </SwiperSlide>



            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>Mockups of the Logo</h2>
                <p>
                  We provide realistic mockups of the logo in various
                  applications, allowing you to visualize how it will look
                  across different mediums.
                </p>
              </div>
            </SwiperSlide>

            
          </Swiper>
        </div>
      </div>
    </>
  );
}
