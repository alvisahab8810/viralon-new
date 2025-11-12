import React, { useEffect } from "react";

export default function HeroSection() {
  useEffect(() => {
    const textArray = [
      "Clicks",
      "Leads",
      "Engagement",
      "Visibility",
      "Traffic",
      "ROI",
      "Followers",
    ];
    let currentIndex = 0;
    let intervalId = null;
    let timeoutId = null;

    const animateText = () => {
      const el = document.getElementById("animated-text-inner");
      if (!el) return;

      el.textContent = "";
      const text = textArray[currentIndex];
      let i = 0;

      // Clear any old interval before starting a new one
      if (intervalId) clearInterval(intervalId);

      intervalId = setInterval(() => {
        el.textContent += text[i];
        i++;

        if (i >= text.length) {
          clearInterval(intervalId);
          timeoutId = setTimeout(() => {
            currentIndex = (currentIndex + 1) % textArray.length;
            animateText(); // next word
          }, 2000);
        }
      }, 100);
    };

    animateText();

    // === Lazy video loader ===
    const loadVideo = () => {
      document.querySelectorAll(".lazy-iframe").forEach((container) => {
        const iframe = document.createElement("iframe");
        iframe.allowFullscreen = true;
        iframe.playsInline = true;
        iframe.webkitAllowsFullscreen = true;
        iframe.webkitPlaysInline = true;

        iframe.src =
          window.innerWidth <= 768
            ? "https://www.youtube.com/embed/pGtBPQqZmnU?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&rel=0&playlist=pGtBPQqZmnU"
            : "https://player.vimeo.com/video/1001511306?h=852012b993&controls=0&title=0&byline=0&portrait=0&autoplay=1&loop=1&badge=0&muted=1";

        iframe.className = "embed-responsive-item";
        container.innerHTML = "";
        container.appendChild(iframe);
      });
    };

    const videoTimeout = setTimeout(() => {
      loadVideo();
    }, 2000);

    // 🧹 Cleanup: stop all intervals/timeouts on unmount
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      clearTimeout(videoTimeout);
    };
  }, []);

  return (
    <section className="hero-section">
      <div className="container">
        <div className="main-section">
          <h1 className="main-heading text-center text-white content__container__text mb-5">
            Get More{" "}
            <span className="text-orange animated-text">
              <span
                className="animated-text-inner"
                id="animated-text-inner"
              ></span>
            </span>
            <br /> With Us
          </h1>

          <div className="video-embed-area border-10 border border-white shadow-sm">
            <div className="ratio ratio-21x9 lazy-iframe">
              {/* Placeholder — gets replaced dynamically */}
              <noscript>
                <iframe
                  className="embed-responsive-item mob-none"
                  src="https://www.youtube.com/embed/GIBWr1zXJ_U?autoplay=1&mute=1&controls=0&modestbranding=1"
                  allowFullScreen
                  title="Viralon Desktop Video"
                ></iframe>
              </noscript>

              <noscript>
                <iframe
                  id="mobileVideo"
                  className="desk-none"
                  src="https://www.youtube.com/embed/pGtBPQqZmnU?autoplay=1&mute=1&controls=0&modestbranding=1"
                  allowFullScreen
                  title="Viralon Mobile Video"
                ></iframe>
              </noscript>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-creative">
        <img
          src="./assetss/images/hero-strip.png"
          alt="Viralon Hero-Gif"
          className="mob-none"
        />
        <img
          src="./assetss/images/hero4.svg"
          alt="Viralon Hero-Gif"
          className="desk-none"
        />
      </div>
    </section>
  );
}
