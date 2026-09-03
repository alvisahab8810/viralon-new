// pages/landing-preview.js — client-only preview of a landing template,
// opened from the payroll admin (Website → SEO Pages). The page data arrives
// base64-encoded in the URL hash (never sent to the server, nothing stored),
// so admins can see exactly how a template/page will look before publishing.
// noindex — this route is for previewing only.
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Topbar from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Offcanvas from "../components/header/Offcanvas";
import { getLandingTemplate } from "../components/landing";

export default function LandingPreview() {
  const [page, setPage] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const read = () => {
      try {
        // Raw slice, NOT URLSearchParams — that would decode base64's "+"
        // into spaces and corrupt the payload.
        const m = window.location.hash.match(/#d=(.+)/);
        const d = m ? m[1] : null;
        if (!d) { setError(true); return; }
        const json = decodeURIComponent(escape(atob(d)));
        const data = JSON.parse(json);
        setPage({
          title: data.title || "Preview",
          slug: data.slug || "preview",
          template: data.template || "curve",
          content: data.content || {},
        });
        setError(false);
      } catch {
        setError(true);
      }
    };
    read();
    window.addEventListener("hashchange", read);
    return () => window.removeEventListener("hashchange", read);
  }, []);

  const Template = page ? getLandingTemplate(page.template) : null;

  return (
    <div className="bg-dark" style={{ minHeight: "100vh", background: "#1a1a1a" }}>
      <Head>
        <title>Preview — Viralon</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Topbar />
      <Offcanvas />
      {page ? (
        <Template page={page} />
      ) : (
        <div className="manrope" style={{
          minHeight: "60vh", display: "flex", alignItems: "center",
          justifyContent: "center", color: "#a8a8a8", fontSize: 15,
          textAlign: "center", padding: "0 20px",
        }}>
          {error
            ? "Preview data missing — open this preview from the admin panel."
            : "Loading preview…"}
        </div>
      )}
      <Footer />
      <div className="manrope" style={{
        position: "fixed", bottom: 18, right: 18, zIndex: 9999,
        background: "linear-gradient(90deg, #FF6F61 29%, #FBA065 95%)",
        color: "#fff", padding: "8px 16px", borderRadius: 999,
        fontSize: 12.5, fontWeight: 700, letterSpacing: "0.03em",
        boxShadow: "0 6px 18px rgba(0,0,0,.35)", pointerEvents: "none",
      }}>
        Preview — not published
      </div>
    </div>
  );
}
