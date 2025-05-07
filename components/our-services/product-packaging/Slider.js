

// components/BrandIdentitySlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay';

const brandImages = [
  '/assets/img/our-services/logo-design/img1.png',
  '/assets/img/our-services/logo-design/img2.png',
  '/assets/img/our-services/logo-design/img3.png',
  '/assets/img/our-services/logo-design/img1.png',
  '/assets/img/our-services/logo-design/img2.png',
  '/assets/img/our-services/logo-design/img3.png',
  '/assets/img/our-services/logo-design/img1.png',
  '/assets/img/our-services/logo-design/img2.png',
  '/assets/img/our-services/logo-design/img3.png',
  '/assets/img/our-services/logo-design/img1.png',
  '/assets/img/our-services/logo-design/img2.png',
  '/assets/img/our-services/logo-design/img3.png'
  // Add more images as needed
];

const BrandIdentitySlider = () => {
  return (
    <div className="brand-identity-design w-full max-w-6xl pt-100 pb-50 mx-auto ">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        // autoplay={{
        //   delay: 2000,
        //   disableOnInteraction: false,
        // }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 200,
          modifier: 2.5,
          slideShadows: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2,
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
  );
};

export default BrandIdentitySlider;
