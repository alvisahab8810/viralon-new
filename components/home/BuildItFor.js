import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

/*
 * "What We Build It For" — copy on the left, a true 3D coverflow gallery on
 * the right. The slides rotate on the Y axis around a shared vanishing point
 * so the deck reads as a rounded carousel rather than a flat rail. The cards
 * butt straight up against each other with no gap, and every card carries
 * its own caption layer, so the label turns with the card in 3D instead of
 * floating flat in front of the deck.
 *
 * Images are placeholders and meant to be swapped for the Figma exports.
 */

const INDUSTRIES = [
  {
    name: "Real estate",
    blurb:
      "Site visits, not enquiries. We build the machine that gets a serious buyer to the property.",
    img: "/assets/img/portfolio/h1.webp",
  },
  {
    name: "Education",
    blurb:
      "Admissions run on a season. We build for the intake window, then keep the pipeline warm.",
    img: "/assets/img/portfolio/h2.webp",
  },
  {
    name: "Healthcare",
    blurb:
      "Trust decides the appointment. We build the presence that earns it before the first call.",
    img: "/assets/img/portfolio/h3.webp",
  },
  {
    name: "Hospitality",
    blurb:
      "Direct bookings beat commission. We build the channel that sends guests to you first.",
    img: "/assets/img/portfolio/h4.webp",
  },
  {
    name: "Manufacturing",
    blurb:
      "Long cycles, few buyers. We build for the handful of people who actually place the order.",
    img: "/assets/img/portfolio/16.jpg",
  },
  {
    name: "Retail",
    blurb:
      "Footfall and cart both count. We build the machine that feeds the store and the site.",
    img: "/assets/img/portfolio/17.jpg",
  },
];

export default function BuildItFor() {
  return (
    <section className="builditfor-section">
      <div className="container">
        <div className="builditfor-grid">
          <div className="builditfor-copy">
            <h2 className="builditfor-heading">
              What We
              <br />
              <span className="builditfor-accent">Build It For...</span>
            </h2>
            <p className="builditfor-desc">
              Tailored deployment structures mapped to specific business
              models. We build the exact customer acquisition machine your
              industry requires.
            </p>
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
