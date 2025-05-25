// components/BrandIdentitySlider.jsx
import React from "react";
import { Swiper, SwiperSlide  } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

const brandImages = [
  "/assets/img/our-services/web-development/img1.png",
  "/assets/img/our-services/web-development/img5.png",
  "/assets/img/our-services/web-development/img3.png",
  "/assets/img/our-services/web-development/img4.png",
  "/assets/img/our-services/web-development/img5.png",
  "/assets/img/our-services/web-development/img1.png",
  "/assets/img/our-services/web-development/img5.png",
  "/assets/img/our-services/web-development/img3.png",
  "/assets/img/our-services/web-development/img4.png",
  "/assets/img/our-services/web-development/img5.png",
  "/assets/img/our-services/web-development/img1.png",
  "/assets/img/our-services/web-development/img5.png",
  "/assets/img/our-services/web-development/img3.png",
  "/assets/img/our-services/web-development/img4.png",
  "/assets/img/our-services/web-development/img4.png",
  "/assets/img/our-services/web-development/img1.png",
  "/assets/img/our-services/web-development/img5.png",
  "/assets/img/our-services/web-development/img3.png",
  "/assets/img/our-services/web-development/img4.png",
  "/assets/img/our-services/web-development/img5.png",
];

const BrandIdentitySlider = () => {
  return (
    <div className="container my-5 ">
      <div className="brand-identity-design mx-auto position-relative ">
        <Swiper



          effect="coverflow"
        
          grabCursor={true}
          centeredSlides={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          loop={true}
          slidesPerView="3.5"
       
          coverflowEffect={{
            rotate: 20,
            stretch: 0,
            depth: 280,
            modifier: 1.5,
            slideShadows: false,
          }}
          breakpoints={{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 1.6,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
             modules={[EffectCoverflow, Autoplay]}
          className="mySwiper"
        >
          {brandImages.map((src, index) => (
            <SwiperSlide key={index} className="slider-card">
              <img
                src={src}
                alt={`Brand Slide ${index + 1}`}
                className="img-fluid rounded shadow"
              />
              {/* <div className="card-caption text-white text-center mt-2">
                <h6>Slide {index + 1}</h6>
              </div> */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BrandIdentitySlider;
