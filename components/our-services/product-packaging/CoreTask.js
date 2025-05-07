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
                  Target Audience Analysis
                </h2>
                <p>
                  We research the target audience to grasp preferences and behaviors, ensuring the packaging resonates with specific demographics and effectively appeals to their tastes and needs.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                  Define the Brand Identity
                </h2>
                <p>
                  A clear brand message is essential. We use consistent colors, fonts, and imagery that reflect the brand’s values, creating a cohesive look that enhances recognition and communicates the brand’s essence.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                   Prioritize Functionality
                </h2>
                <p>
                   Functionality is crucial in packaging design. We ensure the packaging protects the product while being easy to open and use, enhancing usability and contributing to a positive consumer experience.
                </p>
              </div>
            </SwiperSlide>

         

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                  Incorporate Sustainable Practices
                </h2>
                <p>
                   Opting for eco-friendly materials attracts environmentally conscious consumers. Highlighting sustainability efforts on packaging enhances brand reputation and appeals to a broader audience that values responsible practices.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                  Test and Iterate
                </h2>
                <p>
                  Feedback from customers and stakeholders to refine the designs, Prototyping to assess packaging effectiveness in real-world scenarios, making adjustments based on user experience for optimal results.
                </p>
              </div>
            </SwiperSlide>

          </Swiper>
        </div>
      </div>
    </>
  );
}
