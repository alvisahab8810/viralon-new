// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, EffectCoverflow } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/effect-coverflow";



// const INDUSTRIES = [
//   {
//     name: "Real estate",
//     blurb:
//       "A hundred enquiries make one booking. We build toward the eight that matter.",
//     img: "/assets/images/what-build/1.webp",
//   },
//   {
//     name: "Travel",
//     blurb:
//       "Weeks of research, booked in a day. Miss the weeks and you compete on price.",
//     img: "/assets/images/what-build/2.webp",
//   },
//   {
//     name: "Automotive",
//     blurb:
//       "A wash and a full paint cost the same to buy. One is worth twenty times more.",
//     img: "/assets/images/what-build/3.webp",
//   },
//   {
//     name: "IT and software",
//     blurb:
//       "Ten firms wrote the same sentences. We make yours legible first.",
//     img: "/assets/images/what-build/4.webp",
//   },

//   {
//     name: "Healthcare",
//     blurb:
//       "Most patients never fill a form. They read, they watch, then they call.",
//     img: "/assets/images/what-build/5.webp",
//   },

//     {
//     name: "Education",
//     blurb:
//       "Parents search six months before the session. April is already too late.",
//     img: "/assets/images/what-build/6.webp",
//   },


  
//     {
//     name: "B2B and manufacturing",
//     blurb:
//       "Twelve enquiries can make the year. Every volume metric will call it a bad one.",
//     img: "/assets/images/what-build/9.webp",
//   },


//      {
//     name: "Finance",
//     blurb:
//       "The platforms restrict half of what you want to say. We build trust elsewhere.",
//     img: "/assets/images/what-build/7.webp",
//   },

//     {
//     name: "Interior design & architecture",
//     blurb:
//       "Nobody picks an architect from an ad. They pick what they saw months ago.",
//     img: "/assets/images/what-build/8.webp",
//   },
// ];

// export default function BuildItFor() {
//   return (
//     <section className="builditfor-section">
//       <div className="container">
//         <div className="builditfor-grid">
//           <div className="builditfor-copy">
//             <h2 className="builditfor-heading">
//               What We
//               <br />
//               <span className="builditfor-accent">Build It For...</span>
//             </h2>
//             <p className="builditfor-desc">
//               Tailored deployment structures mapped to specific business
//               models. We build the exact customer acquisition machine your
//               industry requires.
//             </p>
//           </div>

//           <div className="builditfor-stage">
//             <Swiper
//               modules={[EffectCoverflow, Autoplay]}
//               effect="coverflow"
//               grabCursor
//               centeredSlides
//               loop
//               slidesPerView="auto"
//               spaceBetween={0}
//               speed={700}
//               watchSlidesProgress
//               autoplay={{ delay: 2600, disableOnInteraction: false }}
//               // The stretch is more than half the card width, so each card
//               // sits partly behind the one in front of it -- the cards touch
//               // and overlap, never leaving a gap. Depth plus a moderate
//               // rotation is what keeps the stack reading as 3D.
//               coverflowEffect={{
//                 rotate: 26,
//                 stretch: -20,
//                 depth: 380,
//                 modifier: 1,
//                 scale: 0.9,
//                 slideShadows: true,
//               }}
//               className="builditfor-swiper"
//             >
//               {INDUSTRIES.map((item) => (
//                 <SwiperSlide className="builditfor-slide" key={item.name}>
//                   <img src={item.img} alt={item.name} loading="lazy" />

//                   {/* Inside the slide, so it rotates with the card. */}
//                   <div className="builditfor-layer">
//                     <span className="builditfor-layer-title">{item.name}</span>
//                     <p className="builditfor-layer-desc">{item.blurb}</p>
//                   </div>
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }












import Link from "next/link";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";



const INDUSTRIES = [
  {
    name: "Real estate",
    blurb:
      "A hundred enquiries make one booking. We build toward the eight that matter.",
    img: "/assets/images/what-build/1.webp",
  },
  {
    name: "Travel",
    blurb:
      "Weeks of research, booked in a day. Miss the weeks and you compete on price.",
    img: "/assets/images/what-build/2.webp",
  },
  {
    name: "Automotive",
    blurb:
      "A wash and a full paint cost the same to buy. One is worth twenty times more.",
    img: "/assets/images/what-build/3.webp",
  },
  {
    name: "IT and software",
    blurb:
      "Ten firms wrote the same sentences. We make yours legible first.",
    img: "/assets/images/what-build/4.webp",
  },

  {
    name: "Healthcare",
    blurb:
      "Most patients never fill a form. They read, they watch, then they call.",
    img: "/assets/images/what-build/5.webp",
  },

    {
    name: "Education",
    blurb:
      "Parents search six months before the session. April is already too late.",
    img: "/assets/images/what-build/6.webp",
  },


  
    {
    name: "B2B and manufacturing",
    blurb:
      "Twelve enquiries can make the year. Every volume metric will call it a bad one.",
    img: "/assets/images/what-build/9.webp",
  },


     {
    name: "Finance",
    blurb:
      "The platforms restrict half of what you want to say. We build trust elsewhere.",
    img: "/assets/images/what-build/7.webp",
  },

    {
    name: "Interior design & architecture",
    blurb:
      "Nobody picks an architect from an ad. They pick what they saw months ago.",
    img: "/assets/images/what-build/8.webp",
  },
];

export default function BuildItFor() {
  return (
    <section className="builditfor-section">
      <div className="container">
        {/* The heading runs the full width above the row, so it reads across
            both the copy column and the card stage. */}
        <h2 className="builditfor-heading">
          <span className="builditfor-accent">Ten Industries.</span> We Already
          Know What A Lead Means In Each One.
        </h2>

        <div className="builditfor-grid">
          <div className="builditfor-copy">
            <p className="builditfor-desc">
              In real estate, the form fill means nothing, and the site visit is
              everything. In education, parents search six months before the
              session opens. Patients never fill a form; they read reviews for
              three weeks and then call. A car wash enquiry and a full paint
              enquiry cost the same to buy and are worth twenty times apart.
            </p>
            <p className="builditfor-desc">
              <strong className="builditfor-lead">
                You should not have to explain any of that to your agency.
              </strong>{" "}
              We have run these accounts, made these mistakes, and learned what a
              qualified lead actually means in each one. That knowledge sits at
              the strategy level, not with whoever manages your account.
            </p>

            <Link className="builditfor-cta" href="/contact-us">
              Let's Talk
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M7 17L17 7M9 7h8v8"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>

          <div className="builditfor-stage">
            <Swiper
              modules={[EffectCoverflow, Autoplay]}
              effect="coverflow"
              grabCursor
              centeredSlides
              loop
              slidesPerView="auto"
              spaceBetween={0}
              speed={700}
              watchSlidesProgress
              autoplay={{ delay: 2600, disableOnInteraction: false }}
              // The stretch is more than half the card width, so each card
              // sits partly behind the one in front of it -- the cards touch
              // and overlap, never leaving a gap. Depth plus a moderate
              // rotation is what keeps the stack reading as 3D.
              coverflowEffect={{
                rotate: 26,
                stretch: -20,
                depth: 380,
                modifier: 1,
                scale: 0.9,
                slideShadows: true,
              }}
              className="builditfor-swiper"
            >
              {INDUSTRIES.map((item) => (
                <SwiperSlide className="builditfor-slide" key={item.name}>
                  <img src={item.img} alt={item.name} loading="lazy" />

                  {/* Inside the slide, so it rotates with the card. */}
                  <div className="builditfor-layer">
                    <span className="builditfor-layer-title">{item.name}</span>
                    <p className="builditfor-layer-desc">{item.blurb}</p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
