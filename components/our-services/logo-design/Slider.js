// components/ProductCoverflowSlider.jsx
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/autoplay';

const images = [
  '/assets/img/our-services/logo-design/logos/img1.png',
  '/assets/img/our-services/logo-design/logos/img2.png',
  '/assets/img/our-services/logo-design/logos/img3.png',
  '/assets/img/our-services/logo-design/logos/img4.png',
  '/assets/img/our-services/logo-design/logos/img5.png',
  '/assets/img/our-services/logo-design/logos/img6.png',
  '/assets/img/our-services/logo-design/logos/img7.png',
  '/assets/img/our-services/logo-design/logos/img8.png',
  '/assets/img/our-services/logo-design/logos/img9.png',
  '/assets/img/our-services/logo-design/logos/img1.png',
  '/assets/img/our-services/logo-design/logos/img3.png',
  '/assets/img/our-services/logo-design/logos/img4.png',
  '/assets/img/our-services/logo-design/logos/img5.png',
  '/assets/img/our-services/logo-design/logos/img6.png',
  '/assets/img/our-services/logo-design/logos/img7.png',
  '/assets/img/our-services/logo-design/logos/img8.png',
  '/assets/img/our-services/logo-design/logos/img9.png',
  '/assets/img/our-services/logo-design/logos/img8.png',
  '/assets/img/our-services/logo-design/logos/img9.png',
  '/assets/img/our-services/logo-design/logos/img1.png',
  '/assets/img/our-services/logo-design/logos/img3.png',
  '/assets/img/our-services/logo-design/logos/img4.png',
  '/assets/img/our-services/logo-design/logos/img5.png',
  '/assets/img/our-services/logo-design/logos/img6.png',
  '/assets/img/our-services/logo-design/logos/img7.png',
  '/assets/img/our-services/logo-design/logos/img8.png',
  '/assets/img/our-services/logo-design/logos/img9.png'
];

const ProductCoverflowSlider = () => {
  return (
    <div className="container logo-sliders w-full max-w-6xl mx-auto ptb-50">
      <Swiper
        effect={'coverflow'}
        slidesPerView={2.5}
        grabCursor={true}
        centeredSlides={true}
        loop={true}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 220,
          modifier: 2.5,
          slideShadows: false,
        }}




        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        breakpoints={{
          320: {
            slidesPerView: 1.8,
            spaceBetween: 10,
          },
          480: {
            slidesPerView: 1.8,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 2.2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="mySwiper"
      >
        {images.map((src, index) => (
          <SwiperSlide
            key={index}
            className="rounded-3xl overflow-hidden w-[160px] h-[300px] sm:h-[350px] md:h-[400px] lg:w-[250px] lg:h-[500px]"
       
          >
            <img
              src={src}
              alt={`Slide ${index + 1}`}
              className="object-cover w-full h-full"
              
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ProductCoverflowSlider;
