// components/landing/LeadForm.js — lead capture block used at the bottom of
// SEO landing pages (Website → SEO Pages in the payroll admin). Posts into
// the same queries pipeline as the homepage form, tagged with the page slug
// so the team knows which landing page converted.
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function LeadForm({ slug, headline, text }) {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", businessName: "",
  });
  const [sending, setSending] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone || !formData.businessName) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setSending(true);
    try {
      const res = await fetch("/api/queries/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, formType: `Landing Page — /${slug}` }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Your request has been sent. We’ll be in touch soon.");
        setFormData({ name: "", email: "", phone: "", businessName: "" });
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="lpf-section">
      <div className="container">
        <div className="lpf-box">
          <div className="lpf-head">
            <h2 className="anton-regular">{headline || "READY TO COLLABORATE?"}</h2>
            <p className="manrope">{text || "LET'S TALK YOUR NEEDS"}</p>
          </div>
          <form onSubmit={handleSubmit} className="lpf-form">
            <input type="text" name="name" placeholder="Your Name"
              value={formData.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email Address"
              value={formData.email} onChange={handleChange} />
            <input type="text" name="phone" placeholder="IND (+91) Phone Number"
              value={formData.phone} onChange={handleChange} />
            <input type="text" name="businessName" placeholder="Business Name"
              value={formData.businessName} onChange={handleChange} />
            <button type="submit" disabled={sending}>
              {sending ? "SENDING…" : "SUBMIT"}
            </button>
          </form>
        </div>
      </div>

      <style jsx global>{`
        .lpf-section { padding: 40px 0 90px; }
        .lpf-box {
          background: linear-gradient(90deg, #ff6f61 29%, #fba065 95%);
          border-radius: 30px;
          padding: 60px 50px;
          max-width: 920px;
          margin: 0 auto;
        }
        .lpf-head h2 { color: #fff; font-size: 42px; margin-bottom: 6px; letter-spacing: 0.5px; }
        .lpf-head p { color: #fff; opacity: 0.9; letter-spacing: 2px; font-size: 14px; margin-bottom: 30px; }
        .lpf-form { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .lpf-form input {
          background: rgba(255, 255, 255, 0.14);
          border: 1px solid rgba(255, 255, 255, 0.45);
          border-radius: 12px;
          padding: 14px 18px;
          color: #fff;
          font-family: "Manrope", sans-serif;
          font-size: 15px;
          outline: none;
          width: 100%;
        }
        .lpf-form input::placeholder { color: rgba(255, 255, 255, 0.8); }
        .lpf-form input:focus { border-color: #fff; background: rgba(255, 255, 255, 0.2); }
        .lpf-form button {
          grid-column: 1 / -1;
          background: #1d1d1d;
          color: #fff;
          border: none;
          border-radius: 12px;
          padding: 15px;
          font-family: "Manrope", sans-serif;
          font-weight: 700;
          letter-spacing: 2px;
          font-size: 14px;
          cursor: pointer;
          transition: opacity 0.2s ease;
        }
        .lpf-form button:hover { opacity: 0.85; }
        .lpf-form button:disabled { opacity: 0.6; cursor: default; }
        @media (max-width: 767px) {
          .lpf-box { padding: 40px 24px; border-radius: 22px; }
          .lpf-head h2 { font-size: 30px; }
          .lpf-form { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
