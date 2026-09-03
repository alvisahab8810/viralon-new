"use client";

import { useState } from "react";

// Pulls a YouTube video ID out of any common URL shape
// (watch?v=, youtu.be/, embed/, shorts/).
function getYoutubeId(url) {
  const match = String(url).match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
}

// Drop-in replacement for the old ".popup-youtube" jQuery + magnific-popup
// wiring (public/assets/js/main.js -> $(".popup-youtube").magnificPopup(...)).
// Keeps the same markup/classes (so existing CSS for the play button still
// applies) but opens the video in a small self-contained modal instead of
// relying on jQuery — no plugin, no extra CSS file needed.
export default function VideoPopupLink({ href, className, children }) {
  const [open, setOpen] = useState(false);
  const videoId = getYoutubeId(href);

  const handleClick = (e) => {
    if (!videoId) return; // not a recognizable YouTube link — just navigate normally
    e.preventDefault();
    setOpen(true);
  };

  return (
    <>
      <a href={href} className={className} onClick={handleClick}>
        {children}
      </a>

      {open && (
        <div
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{ position: "relative", width: "100%", maxWidth: 900 }}
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close video"
              style={{
                position: "absolute",
                top: -40,
                right: 0,
                background: "transparent",
                border: "none",
                color: "#fff",
                fontSize: 32,
                lineHeight: 1,
                cursor: "pointer",
              }}
            >
              &times;
            </button>
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                title="YouTube video player"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  border: 0,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
