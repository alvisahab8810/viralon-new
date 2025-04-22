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
              <h1>Core Tasks in Viralon's SEO Services</h1>
              <div className="devider" ></div>

              <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard
            dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it </p>
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
                    <h2>Technical SEO<br/>
                    Audits</h2>
                    <p>Our team performs detailed technical audits to identify and fix issues that may affect your website's performance, including site speed and mobile-friendliness.</p>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-slide">
                  <div className="core-bx">
                    <h2>Keyword Research and<br/> Optimization</h2>
                     <p>We conduct thorough keyword research to identify the phrases your customers use. We then optimize your website's content to target these keywords, ensuring better search rankings.</p>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-slide">
                 <div className="core-bx">
                    <h2>Content Creation and<br/> Optimization</h2>
                     <p>High-quality content is essential for effective SEO. Our experts create and optimize engaging content that aligns with search engine algorithms, including blog posts, product descriptions, and other valuable resources.</p>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-slide">
                <div className="core-bx">
                    <h2>Link Building
                    </h2>
                     <p>Acquiring high-quality, authoritative backlinks is vital for SEO success. We implement ethical link-building strategies to enhance your site's authority and credibility, driving more traffic and improving rankings.</p>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-slide">
                <div className="core-bx">
                    <h2>
                    On-Page and<br/>
                    Off-Page SEO
                    </h2>
                     <p>We optimize both on-page elements (titles, meta descriptions, headers) and off-page factors (backlinks, social signals) to ensure a comprehensive SEO strategy that maximizes your online visibility.</p>
                    </div>
                </SwiperSlide>


                <SwiperSlide className="swiper-slide">
                    <div className="core-bx">
                    <h2>Technical SEO<br/>
                    Audits</h2>
                    <p>Our team performs detailed technical audits to identify and fix issues that may affect your website's performance, including site speed and mobile-friendliness.</p>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-slide">
                  <div className="core-bx">
                    <h2>Keyword Research and<br/> Optimization</h2>
                     <p>We conduct thorough keyword research to identify the phrases your customers use. We then optimize your website's content to target these keywords, ensuring better search rankings.</p>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-slide">
                 <div className="core-bx">
                    <h2>Content Creation and<br/> Optimization</h2>
                     <p>High-quality content is essential for effective SEO. Our experts create and optimize engaging content that aligns with search engine algorithms, including blog posts, product descriptions, and other valuable resources.</p>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-slide">
                <div className="core-bx">
                    <h2>Link Building
                    </h2>
                     <p>Acquiring high-quality, authoritative backlinks is vital for SEO success. We implement ethical link-building strategies to enhance your site's authority and credibility, driving more traffic and improving rankings.</p>
                    </div>
                </SwiperSlide>

                <SwiperSlide className="swiper-slide">
                <div className="core-bx">
                    <h2>
                    On-Page and<br/>
                    Off-Page SEO
                    </h2>
                     <p>We optimize both on-page elements (titles, meta descriptions, headers) and off-page factors (backlinks, social signals) to ensure a comprehensive SEO strategy that maximizes your online visibility.</p>
                    </div>
                </SwiperSlide>

               
            </Swiper>
          </div>
        </div>
    </>
  )
}
