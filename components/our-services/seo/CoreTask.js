import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
export default function CoreTask() {
  return (
    <>
      <div className="seo-core-task core-task-bg ptb-100">
        <div className="container">
          <div className="core-content">
            <h1>Viralon’s Proven Approach for<br/>
            Driving $10 Billion in Revenue for Our Clients</h1>
            <div className="devider"></div>
            <p>
               Get search engine optimization services that provide an all-in-one solution to attracting qualified traffic and turning it into revenue with Viralon’s SEO solutions. Learn what our plans includes
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
            className="swiper mySwiper4 pt-30"
          >
            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                  Technical SEO
                  <br />
                  Audits
                </h2>
                <p>
                  Our team performs detailed technical audits to identify and
                  fix issues that may affect your website's performance,
                  including site speed and mobile-friendliness.
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
                  We conduct thorough keyword research to identify the phrases
                  your customers use. We then optimize your website's content to
                  target these keywords, ensuring better search rankings.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                  Content Creation and
                  <br /> Optimization
                </h2>
                <p>
                  High-quality content is essential for effective SEO. Our
                  experts create and optimize engaging content that aligns with
                  search engine algorithms, including blog posts, product
                  descriptions, and other valuable resources.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>Link Building</h2>
                <p>
                  Acquiring high-quality, authoritative backlinks is vital for
                  SEO success. We implement ethical link-building strategies to
                  enhance your site's authority and credibility, driving more
                  traffic and improving rankings.
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
                  We optimize both on-page elements (titles, meta descriptions,
                  headers) and off-page factors (backlinks, social signals) to
                  ensure a comprehensive SEO strategy that maximizes your online
                  visibility.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                  Technical SEO
                  <br />
                  Audits
                </h2>
                <p>
                  Our team performs detailed technical audits to identify and
                  fix issues that may affect your website's performance,
                  including site speed and mobile-friendliness.
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
                  We conduct thorough keyword research to identify the phrases
                  your customers use. We then optimize your website's content to
                  target these keywords, ensuring better search rankings.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>
                  Content Creation and
                  <br /> Optimization
                </h2>
                <p>
                  High-quality content is essential for effective SEO. Our
                  experts create and optimize engaging content that aligns with
                  search engine algorithms, including blog posts, product
                  descriptions, and other valuable resources.
                </p>
              </div>
            </SwiperSlide>

            <SwiperSlide className="swiper-slide">
              <div className="core-bx">
                <h2>Link Building</h2>
                <p>
                  Acquiring high-quality, authoritative backlinks is vital for
                  SEO success. We implement ethical link-building strategies to
                  enhance your site's authority and credibility, driving more
                  traffic and improving rankings.
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
                  We optimize both on-page elements (titles, meta descriptions,
                  headers) and off-page factors (backlinks, social signals) to
                  ensure a comprehensive SEO strategy that maximizes your online
                  visibility.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}
