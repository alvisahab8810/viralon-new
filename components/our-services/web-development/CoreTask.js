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
            <h1>Viralon’s Strategic User-Centric Solution for Growth</h1>
            <div className="devider"></div>
            <p>
               At Viralon, we deliver more than visually appealing websites — we build thoughtful, user-focused experiences that help your business grow, engage your audience deeply, and strengthen your online presence.
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
                  Custom Web Development
                </h2>
                <p>
                  We meticulously design visually compelling, functional websites tailored to embody your unique brand identity and deliver seamless, engaging user experiences.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                 eCommerce Solutions
                </h2>
                <p>
                  We develop robust, scalable online stores engineered to provide intuitive shopping experiences, secure transactions, ensuring your brand maximizes revenue while fostering lasting customer relationships.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                 CRM Development
                </h2>
                <p>
                  Our systems that streamline customer management, improve sales processes, and enhance communication, helping your business build stronger, lasting relationships and achieve scalable growth.
                </p>
              </div>
            </SwiperSlide>

         

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                   Website Redesign & Revamp
                </h2>
                <p>
                  We revitalize your online presence by creating modern, user-friendly platforms that enhance engagement, improve functionality, and reflect your evolving brand identity to better connect with your audience.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                   Frontend & Backend 
                </h2>
                <p>
                   Our expert development team  solutions that ensure your website is fast, responsive, and reliable, delivering a smooth user experience while supporting your business goals effectively.
                </p>
              </div>
            </SwiperSlide>

          </Swiper>
        </div>
      </div>
    </>
  );
}
