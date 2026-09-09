// components/common/EnquiryPopup.js — the "READY TO COLLABORATE?" CTA form,
// shown as a modal.
//
// The form itself is components/home/Form.js, imported and rendered as-is —
// same markup, same fields, same /api/queries/query submit, same lead tracking.
// Nothing about the form is re-implemented here; this file only supplies the
// overlay, the panel and the ✕.
//
// It opens two ways:
//   1. on page load, on every public page (see pages/_app.js for where it is
//      mounted and which routes are skipped);
//   2. on demand — the header's LET'S TALK pills call openEnquiry(), and any
//      element carrying data-enquiry-popup opens it too, so a new button can be
//      wired up in markup without touching this file.
import React, { useCallback, useEffect, useState } from "react";
import Form from "../home/Form";

const EVENT = "viralon:open-enquiry";

// Once the visitor has actually sent the form there is nothing left to ask, so
// the on-load open stops for the rest of the browser session. Clicking a
// LET'S TALK button still opens it.
const DONE_KEY = "vl_enquiry_sent";

/** Open the enquiry popup from anywhere (any component, any page). */
export function openEnquiry() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(EVENT));
}

export default function EnquiryPopup({ autoOpenDelay = 1200 }) {
  const [open, setOpen] = useState(false);
  // react-toastify v10 sends a toast to every container that has no
  // containerId, so the Form's own ToastContainer would double up with the one
  // already on the page. Checked before this popup mounts its copy.
  const [pageHasToaster, setPageHasToaster] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  const show = useCallback(() => {
    if (typeof document !== "undefined") {
      setPageHasToaster(!!document.querySelector(".Toastify"));
    }
    setOpen(true);
  }, []);

  // Manual triggers: the custom event, and any [data-enquiry-popup] element.
  useEffect(() => {
    const onEvent = () => show();
    const onClick = (e) => {
      const el = e.target.closest?.("[data-enquiry-popup]");
      if (!el) return;
      e.preventDefault();
      show();
    };
    window.addEventListener(EVENT, onEvent);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener(EVENT, onEvent);
      document.removeEventListener("click", onClick);
    };
  }, [show]);

  // Auto-open on load. The short delay lets the page paint first so the modal
  // doesn't fight the hero animation.
  useEffect(() => {
    let sent = false;
    try {
      sent = sessionStorage.getItem(DONE_KEY) === "1";
    } catch {}
    if (sent) return;
    const t = setTimeout(show, autoOpenDelay);
    return () => clearTimeout(t);
  }, [autoOpenDelay, show]);

  // Esc closes; the page behind must not scroll while the modal is up.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    // custome.css sets `body { overflow: auto !important }`, so a plain inline
    // style loses — the page kept scrolling behind the modal. Set it with the
    // same priority to win, and restore on close.
    const prev = document.body.style.getPropertyValue("overflow");
    const prevPriority = document.body.style.getPropertyPriority("overflow");
    document.body.style.setProperty("overflow", "hidden", "important");
    return () => {
      document.removeEventListener("keydown", onKey);
      if (prev) document.body.style.setProperty("overflow", prev, prevPriority);
      else document.body.style.removeProperty("overflow");
    };
  }, [open, close]);

  // The Form posts the lead itself; this only watches for the success state so
  // the auto-open can stand down afterwards.
  useEffect(() => {
    if (!open) return;
    const id = setInterval(() => {
      if (document.querySelector(".vlp-panel .vl-thanks")) {
        try {
          sessionStorage.setItem(DONE_KEY, "1");
        } catch {}
        clearInterval(id);
      }
    }, 500);
    return () => clearInterval(id);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="vlp-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Enquiry form"
      onClick={(e) => {
        // Backdrop only — clicks inside the panel must not close it.
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className={`vlp-panel${pageHasToaster ? " vlp-mute-toast" : ""}`}>
        <button type="button" className="vlp-close" onClick={close} aria-label="Close">
          <svg width="11" height="11" viewBox="0 0 18 18" aria-hidden="true">
            <path
              d="M1 1L17 17M17 1L1 17"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* The CTA form, untouched. */}
        <Form />
      </div>

      <style jsx global>{`
        .vlp-overlay {
          position: fixed;
          inset: 0;
          z-index: 12000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px 16px;
          background: rgba(11, 11, 15, 0.72);
          backdrop-filter: blur(3px);
          overflow-y: auto;
          animation: vlp-fade 0.22s ease-out;
        }
        @keyframes vlp-fade {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .vlp-panel {
          position: relative;
          width: 100%;
          max-width: 900px;
          max-height: 92vh;
          overflow-y: auto;
          border-radius: 18px;
          animation: vlp-rise 0.26s ease-out;
        }
        @keyframes vlp-rise {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: none; }
        }

        /* The Form ships as a full-bleed page section. Inside the modal it only
           needs its coral panel, so the outer section's page padding goes and
           the panel corners are rounded to match the modal. */
        .vlp-panel .parallax-section { margin: 0; }
        .vlp-panel .form-section { padding: 0 !important; }
        .vlp-panel .form-section .container {
          border-radius: 18px;
          max-width: 100%;
        }
        .vlp-panel .form-section .container.ptb-80 {
          padding: 26px 26px !important;
        }

        /* ── Compact scale ───────────────────────────────────────────────────
           The CTA is built as a full page section, so at page size it fills the
           whole viewport and the modal had to scroll. Everything below shrinks
           the type, the fields and the collage for the popup only -- every rule
           is scoped under .vlp-panel, so components/home/Form.js and the same
           section on the page are completely untouched. */
        .vlp-panel .vl-h1 {
          font-size: 34px !important;
          line-height: 1.06 !important;
          margin-bottom: 6px !important;
        }
        .vlp-panel .vl-sub {
          font-size: 12px !important;
          letter-spacing: 3px !important;
          margin-bottom: 14px !important;
        }
        .vlp-panel .vl-form .form-control {
          height: 42px !important;
          min-height: 42px !important;
          padding: 0 16px !important;
          font-size: 13px !important;
          margin-bottom: 8px !important;
        }
        .vlp-panel .vl-actions { margin-top: 10px !important; }
        .vlp-panel .vl-actions .btn-submit.vl-btn {
          height: 40px !important;
          padding: 0 38px !important;
          font-size: 13px !important;
        }
        /* The collage is a fixed-height block in the page section, which left it
           noticeably shorter than the field stack at popup size. Stretching the
           row lets it fill the panel to exactly the form's height. */
        /* .form-container carries a 0 80px side padding for the page section;
           at popup width that eats most of the panel. */
        .vlp-panel .form-container {
          padding: 0 !important;
          align-items: stretch !important;
        }
        .vlp-panel .form-image img {
          width: 100%;
          object-fit: cover;
          border-radius: 14px;
        }
        @media (min-width: 768px) {
          /* The image is taken out of flow so it contributes no intrinsic
             height -- left in flow, its own aspect ratio drove the row and made
             the panel far taller than the fields. Now the field column sets the
             height and the collage fills exactly that. */
          .vlp-panel .form-container > .form-image { position: relative; }
          .vlp-panel .form-container > .form-image img {
            position: absolute;
            inset: 0;
            height: 100%;
          }
        }
        /* The sweeping ellipse is sized for a full-width section; at this scale
           it would loop right across the fields. */
        .vlp-panel .shape { max-width: 62%; opacity: 0.55; }

        /* At 50/50 the narrower panel left the budget select too tight and the
           native control clipped "…Select a range". The collage gives up some
           width to the fields; below md the columns stack anyway. */
        @media (min-width: 768px) {
          .vlp-panel .form-container > .form-image {
            flex: 0 0 41%;
            max-width: 41%;
          }
          .vlp-panel .form-container > .form-content {
            flex: 0 0 59%;
            max-width: 59%;
          }
        }
        .vlp-panel .vl-select { font-size: 12.5px !important; }

        /* Page already renders a toast container; hide this instance's copy so
           validation messages don't appear twice. */
        .vlp-panel.vlp-mute-toast .Toastify { display: none !important; }

        .vlp-close {
          position: absolute;
          top: 12px;
          right: 30px;
          z-index: 5;
          width: 28px;
          height: 28px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          border: 0;
          border-radius: 50%;
          background: #ffffff;
          color: #0B0B0F;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.16);
          transition: transform 0.18s ease, background 0.18s ease;
        }
        .vlp-close:hover {
          background: #0B0B0F;
          color: #ffffff;
          transform: rotate(90deg);
        }

        @media (max-width: 1023px) {
          .vlp-overlay { padding: 16px 12px; }
          .vlp-panel { max-height: 94vh; }
          .vlp-panel { max-width: 460px; }
          .vlp-panel .form-section .container.ptb-80 {
            padding: 22px 18px !important;
          }
          .vlp-panel .vl-h1 { font-size: 26px !important; }
          .vlp-panel .form-image img { max-height: 200px; }
          .vlp-close { top: 9px; right: 9px; width: 26px; height: 26px; }
        }
      `}</style>
    </div>
  );
}
