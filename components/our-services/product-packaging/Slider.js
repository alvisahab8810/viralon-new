// components/BrandIdentitySlider.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/autoplay";

const brandImages = [
  "/assets/img/our-services/packaging/hero/img1.png",
  "/assets/img/our-services/packaging/hero/img2.png",
  "/assets/img/our-services/packaging/hero/img3.png",
  "/assets/img/our-services/packaging/hero/img4.png",
  "/assets/img/our-services/packaging/hero/img5.png",
  "/assets/img/our-services/packaging/hero/img6.png",
  "/assets/img/our-services/packaging/hero/img7.png",
  "/assets/img/our-services/packaging/hero/img1.png",
  "/assets/img/our-services/packaging/hero/img2.png",
  "/assets/img/our-services/packaging/hero/img3.png",
  "/assets/img/our-services/packaging/hero/img4.png",
  "/assets/img/our-services/packaging/hero/img5.png",
  "/assets/img/our-services/packaging/hero/img6.png",
  "/assets/img/our-services/packaging/hero/img7.png"

  // Add more images as needed
];

const BrandIdentitySlider = () => {
  return (
    <div className="container">
      <div className="brand-identity-design w-full max-w-6xl pt-100 pb-50 mx-auto ">
        <Swiper
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 200,
            modifier: 2.5,
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
              slidesPerView: 5,
              spaceBetween: 40,
            },
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="mySwiper"
        >
          {brandImages.map((src, index) => (
            <SwiperSlide
              key={index}
              className="rounded-3xl overflow-hidden w-[160px] h-[400px] lg:w-[250px] lg:h-[500px]"
            >
              <img
                src={src}
                alt={`Brand Slide ${index + 1}`}
                className="object-cover w-full h-full"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BrandIdentitySlider;
