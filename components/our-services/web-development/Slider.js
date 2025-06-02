// // components/BrandIdentitySlider.jsx
// import React from "react";
// import { Swiper, SwiperSlide  } from "swiper/react";
// import { EffectCoverflow, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-coverflow";

// const brandImages = [
//   "/assets/img/our-services/web-development/img1.png",
//   "/assets/img/our-services/web-development/img5.png",
//   "/assets/img/our-services/web-development/img3.png",
//   "/assets/img/our-services/web-development/img4.png",
//   "/assets/img/our-services/web-development/img5.png",
//   "/assets/img/our-services/web-development/img1.png",
//   "/assets/img/our-services/web-development/img5.png",
//   "/assets/img/our-services/web-development/img3.png",
//   "/assets/img/our-services/web-development/img4.png",
//   "/assets/img/our-services/web-development/img5.png",
//   "/assets/img/our-services/web-development/img1.png",
//   "/assets/img/our-services/web-development/img5.png",
//   "/assets/img/our-services/web-development/img3.png",
//   "/assets/img/our-services/web-development/img4.png",
//   "/assets/img/our-services/web-development/img4.png",
//   "/assets/img/our-services/web-development/img1.png",
//   "/assets/img/our-services/web-development/img5.png",
//   "/assets/img/our-services/web-development/img3.png",
//   "/assets/img/our-services/web-development/img4.png",
//   "/assets/img/our-services/web-development/img5.png",
// ];

// const BrandIdentitySlider = () => {
//   return (
//     <div className="container my-5 ">
//       <div className="brand-identity-design mx-auto position-relative ">
//         <Swiper



//           effect="coverflow"
        
//           grabCursor={true}
//           centeredSlides={true}
//           autoplay={{
//             delay: 2000,
//             disableOnInteraction: false,
//           }}
//           loop={true}
//           slidesPerView="3.5"
       
//           coverflowEffect={{
//             rotate: 20,
//             stretch: 0,
//             depth: 280,
//             modifier: 1.5,
//             slideShadows: false,
//           }}
//           breakpoints={{
//             320: {
//               slidesPerView: 1.2,
//               spaceBetween: 10,
//             },
//             640: {
//               slidesPerView: 1.6,
//               spaceBetween: 20,
//             },
//             768: {
//               slidesPerView: 3,
//               spaceBetween: 30,
//             },
//             1024: {
//               slidesPerView: 4,
//             },
//           }}
//              modules={[EffectCoverflow, Autoplay]}
//           className="mySwiper"
//         >
//           {brandImages.map((src, index) => (
//             <SwiperSlide key={index} className="slider-card">
//               <img
//                 src={src}
//                 alt={`Brand Slide ${index + 1}`}
//                 className="img-fluid rounded shadow"
//               />
//               {/* <div className="card-caption text-white text-center mt-2">
//                 <h6>Slide {index + 1}</h6>
//               </div> */}
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// };

// export default BrandIdentitySlider;




// components/CoverflowSlider.jsx
'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
// import './CoverflowSlider.css';

const images = [
  '/assets/img/our-services/web-development/img1.png',
  '/assets/img/our-services/web-development/img2.jpg',
  '/assets/img/our-services/web-development/img3.png',
  '/assets/img/our-services/web-development/img4.png',
  '/assets/img/our-services/web-development/img5.png',
  '/assets/img/our-services/web-development/img6.png',
  '/assets/img/our-services/web-development/img7.png',
    '/assets/img/our-services/web-development/img1.png',
  '/assets/img/our-services/web-development/img2.jpg',
  '/assets/img/our-services/web-development/img3.png',
  '/assets/img/our-services/web-development/img4.png',
  '/assets/img/our-services/web-development/img5.png',
  '/assets/img/our-services/web-development/img6.png',
  '/assets/img/our-services/web-development/img7.png',


  // 'https://i.postimg.cc/66F8J9tr/hakon-sataoen-qyfco1nf-Mtg-unsplash.jpg',
  // 'https://i.postimg.cc/ydbzRYvv/joey-banks-YApi-Wyp0lqo-unsplash.jpg',
  // 'https://i.postimg.cc/NGKKzyqG/joshua-koblin-eq-W1-MPin-EV4-unsplash.jpg',
  // 'https://i.postimg.cc/JhK81QJw/marcus-p-o-UBjd22g-F6w-unsplash.jpg',
  // 'https://i.postimg.cc/Z0ktfskN/peter-broomfield-m3m-ln-R90u-M-unsplash.jpg',
  // 'https://i.postimg.cc/MTTSXjbn/brandon-atchison-e-BJWhlq-WR54-unsplash.jpg',
  // 'https://i.postimg.cc/8cfgmQYD/campbell-3-ZUs-NJhi-Ik-unsplash.jpg',
  // 'https://i.postimg.cc/8Ck5BcmS/evgeny-tchebotarev-aiwu-Lj-LPFn-U-unsplash.jpg',
  // 'https://i.postimg.cc/66F8J9tr/hakon-sataoen-qyfco1nf-Mtg-unsplash.jpg',
  // 'https://i.postimg.cc/ydbzRYvv/joey-banks-YApi-Wyp0lqo-unsplash.jpg',
  // 'https://i.postimg.cc/NGKKzyqG/joshua-koblin-eq-W1-MPin-EV4-unsplash.jpg',
  // 'https://i.postimg.cc/JhK81QJw/marcus-p-o-UBjd22g-F6w-unsplash.jpg',
];

const BrandIdentitySlider = () => {
  return (
    <div className='container'>
      <div className="coverflow-container web-development-coverflow">
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView="auto"
        autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        loop={true}
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 250,
          modifier: 1,
          slideShadows: true,
        }}

        breakpoints={{
            320: {
              slidesPerView: 1.5,
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
              slidesPerView: "auto",
            },
          }}
        // pagination={{ el: '.swiper-pagination', clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]} 
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} style={{ backgroundImage: `url(${src})` }} />
        ))}
        {/* <div className="swiper-pagination" /> */}
      </Swiper>
    </div>
    </div>
  );
};

export default BrandIdentitySlider;
