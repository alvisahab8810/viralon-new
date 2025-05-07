// import React from "react";
// import Link from "next/link";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation } from "swiper/modules";
// export default function Videos() {
//   return (
//     <div className="container">
//       <section className="instagram-section national-dest pb-80">

//         <div className="contianer">
//           <Swiper
//             spaceBetween={20}
//             // centeredSlides={true}
//             loop={true}
//             // grabCursor={true}
//             slidesPerView={4}
//             autoplay={{
//               delay: 2500,
//               disableOnInteraction: false,
//             }}
//             pagination={{
//               clickable: true,
//             }}
//             navigation={{
//               nextEl: ".swiper-button-next-1",
//               prevEl: ".swiper-button-prev-1",
//             }}
//             breakpoints={{
//               240: {
//                 slidesPerView: 1.5,
//                 spaceBetween: 10,
//               },
//               768: {
//                 slidesPerView: 2.5,
//                 spaceBetween: 20,
//               },
//               1024: {
//                 slidesPerView: 4,
//                 spaceBetween: 20,
//               },
//             }}
//             modules={[Autoplay, Navigation]}
//             className="swiper mySwiper4 pt-100"
//           >

//             <SwiperSlide className="swiper-slide">
//               <Link href="# "target="_blank" rel="noopener noreferrer" >
//               <video
//                 src="/assets/img/our-services/instagram/video1.mp4"
//                 alt="National Destination"
//                 autoPlay
//                 muted
//                 loop
//                 playsInline

//                 style={{ cursor: 'pointer' }} // Optional: Changes cursor to pointer on hover
//               ></video>
//               </Link>
//             </SwiperSlide>

//             <SwiperSlide className="swiper-slide">
//             <Link href="#">
//               <video
//                 src="/assets/img/our-services/instagram/video2.mp4"
//                 alt="National Destination"
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//               ></video>
//               </Link>
//             </SwiperSlide>

//             <SwiperSlide className="swiper-slide">
//             <Link href="#">

//               <video
//                 src="/assets/img/our-services/instagram/video3.mp4"
//                 alt="National Destination"
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//               ></video>
//               </Link>
//             </SwiperSlide>

//             <SwiperSlide className="swiper-slide">

//             <Link href="#">

//               <video
//                 src="/assets/img/our-services/instagram/video4.mp4"
//                 alt="National Destination"
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//               ></video>
//               </Link>
//             </SwiperSlide>

//             <SwiperSlide className="swiper-slide">
//             <Link href="#">

//               <video
//                 src="/assets/img/our-services/instagram/video5.mp4"
//                 alt="National Destination"
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//               ></video>
//               </Link>
//             </SwiperSlide>

//             <SwiperSlide className="swiper-slide">

//             <Link href="#">

//               <video
//                 src="/assets/img/our-services/instagram/video6.mp4"
//                 alt="National Destination"
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//               ></video>
//               </Link>
//             </SwiperSlide>

//             <SwiperSlide className="swiper-slide">
//             <Link href="#">

//               <video
//                 src="/assets/img/our-services/instagram/video4.mp4"
//                 alt="National Destination"
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//               ></video>
//               </Link>
//             </SwiperSlide>

//             <SwiperSlide className="swiper-slide">
//             <Link href="#">

//               <video
//                 src="/assets/img/our-services/instagram/video5.mp4"
//                 alt="National Destination"
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//               ></video>

//               </Link>
//             </SwiperSlide>

//             <SwiperSlide className="swiper-slide">

//             <Link href="#">

//               <video
//                 src="/assets/img/our-services/instagram/video6.mp4"
//                 alt="National Destination"
//                 autoPlay
//                 muted
//                 loop
//                 playsInline
//               ></video>
//               </Link>
//             </SwiperSlide>
//           </Swiper>
//         </div>
//       </section>
//     </div>
//   );
// }

import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";

const videoSources = [
  "/assets/img/our-services/instagram/video1.mp4",
  "/assets/img/our-services/instagram/video2.mp4",
  "/assets/img/our-services/instagram/video3.mp4",
  "/assets/img/our-services/instagram/video4.mp4",
  "/assets/img/our-services/instagram/video5.mp4",
  "/assets/img/our-services/instagram/video6.mp4",
];

export default function Videos() {
  const videoRefs = useRef([]);
  const [unmutedIndex, setUnmutedIndex] = useState(null);

  const toggleMute = (index) => {
    videoRefs.current.forEach((video, i) => {
      if (video) {
        if (i === index) {
          video.muted = !video.muted;
          setUnmutedIndex(video.muted ? null : i);
        } else {
          video.muted = true;
        }
      }
    });
  };

  return (
    <div className="container">
      <section className="instagram-section national-dest ptb-100">
        <div className="contianer">
          <Swiper
            spaceBetween={20}
            loop={true}
            grabCursor={true}
            slidesPerView={4}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            breakpoints={{
              240: {
                slidesPerView: 1.5,
                spaceBetween: 10,
                centeredSlides: true,
              },
              768: { slidesPerView: 2.5, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 20 },
            }}
            navigation={{
              nextEl: ".swiper-button-next-1",
              prevEl: ".swiper-button-prev-1",
            }}
            modules={[Autoplay, Navigation]}
            className="swiper mySwiper4"
          >
            {videoSources.map((src, index) => (
              <SwiperSlide key={index} className="swiper-slide relative">
                <div className="video-container">
                  <video
                    ref={(el) => (videoRefs.current[index] = el)}
                    src={src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="video-element"
                  />
                  <button
                    className="mute-toggle-button"
                    onClick={() => toggleMute(index)}
                  >
                    {unmutedIndex === index ? (
                      <FaVolumeUp size={20} />
                    ) : (
                      <FaVolumeMute size={20} />
                    )}
                  </button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <style jsx>{`
        .video-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .video-element {
          width: 100%;
          height: auto;
          border-radius: 12px;
        }

        .mute-toggle-button {
          position: absolute;
          top: 10px;
          right: 10px;
          background-color: rgba(0, 0, 0, 0.6);
          border: none;
          color: white;
          padding: 8px;
          border-radius: 50%;
          cursor: pointer;
          transition: background 0.3s ease;
          z-index: 10;
        }

        .mute-toggle-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
