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
            <h1>Core Tasks in Viralon's Email Marketing</h1>
            <div className="devider"></div>
            <p>
             Our comprehensive approach ensures effective communication and engagement with your audience.
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
            className="swiper mySwiper4 pt-30"
          >
            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                  Strategic Campaign <br />
                  Planning
                </h2>
                <p>
                   Our seasoned strategists develop tailored email marketing strategies designed to achieve your specific business goals and maximize campaign effectiveness
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                Segmentation and 
                  <br /> Personalization
                </h2>
                <p>
                   We utilize advanced segmentation techniques to deliver highly relevant, personalized emails that resonate with each recipient, enhancing engagement and response rates.
                </p>
              </div>
            </SwiperSlide>


            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>Compelling Content <br/>Creation</h2>
                <p>
                  Our experts craft engaging content, including eye-catching subject lines and persuasive copy, designed to capture attention and drive action from your audience.
                </p>  
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                  Automated Workflows
  
                </h2>
                <p>
                  We implement automated workflows that trigger timely messages based on user behavior, ensuring personalized communication throughout the customer journey.
                </p>
              </div>
            </SwiperSlide>


            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                   Performance Optimization
                </h2>
                <p>
                  Continuous monitoring and A/B testing allow us to refine strategies, improving campaign performance and maximizing open and conversion rates effectively.
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
                   Our seasoned strategists develop tailored email marketing strategies designed to achieve your specific business goals and maximize campaign effectiveness
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                Segmentation and 
                  <br /> Personalization
                </h2>
                <p>
                   We utilize advanced segmentation techniques to deliver highly relevant, personalized emails that resonate with each recipient, enhancing engagement and response rates.
                </p>
              </div>
            </SwiperSlide>


            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>Compelling Content <br/>Creation</h2>
                <p>
                  Our experts craft engaging content, including eye-catching subject lines and persuasive copy, designed to capture attention and drive action from your audience.
                </p>  
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                  Automated Workflows
  
                </h2>
                <p>
                  We implement automated workflows that trigger timely messages based on user behavior, ensuring personalized communication throughout the customer journey.
                </p>
              </div>
            </SwiperSlide>


            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                   Performance Optimization
                </h2>
                <p>
                  Continuous monitoring and A/B testing allow us to refine strategies, improving campaign performance and maximizing open and conversion rates effectively.
                </p>
              </div>
            </SwiperSlide>

         

         
          </Swiper>
        </div>
      </div>
    </>
  );
}
