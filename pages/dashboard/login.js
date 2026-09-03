import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Login successful!");
        setTimeout(() => {
          router.push("/dashboard/admin");
        }, 1500);
      } else {
        toast.error("Invalid credentials");
        setLoading(false);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="lg-page">
      <Head>
        <title>Admin Login — Viralon</title>
      </Head>

      {/* Brand panel */}
      <div className="lg-brand">
        <div className="lg-brand-inner">
          <img src="/assets/img/logo-light.png" alt="Viralon" className="lg-logo" />
          <h2>Admin Control Panel</h2>
          <p>
            Welcome to the Viralon dashboard. Manage leads, career applications,
            invoices, and your sales team — all in one place.
          </p>

          <div className="lg-feature">
            <span className="lg-feature-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M9 12l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="2" />
              </svg>
            </span>
            <div>
              <strong>Leads &amp; Career Tracking</strong>
              <p>Capture and review every query or job application submitted from your site.</p>
            </div>
          </div>

          <div className="lg-feature">
            <span className="lg-feature-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M3 3v18h18" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 14l4-4 3 3 5-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <strong>Sales &amp; Operations</strong>
              <p>Track performance, manage invoices and quotes, and streamline your team.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Login form panel */}
      <div className="lg-form-side">
        <div className="lg-form-card">
          <h1>Admin Login</h1>
          <p className="lg-subtitle">Sign in to continue to your dashboard</p>

          <form onSubmit={handleSubmit}>
            <label className="lg-field">
              <span className="lg-field-label">Username</span>
              <div className="lg-input-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="lg-input-icon">
                  <circle cx="12" cy="8" r="4" stroke="#94a3b8" strokeWidth="2" />
                  <path d="M4 20c0-4 3.5-6 8-6s8 2 8 6" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                </svg>
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
            </label>

            <label className="lg-field">
              <span className="lg-field-label">Password</span>
              <div className="lg-input-wrap">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="lg-input-icon">
                  <rect x="5" y="11" width="14" height="9" rx="2" stroke="#94a3b8" strokeWidth="2" />
                  <path d="M8 11V8a4 4 0 018 0v3" stroke="#94a3b8" strokeWidth="2" />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="lg-toggle-eye"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M3 3l18 18" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
                      <path d="M10.6 5.1A10.9 10.9 0 0112 5c6 0 9.5 5 9.5 7a11.6 11.6 0 01-3.2 3.9M6.5 6.6C3.9 8.3 2.5 10.8 2.5 12c0 2 3.5 7 9.5 7 1.3 0 2.5-.2 3.6-.6M9.9 9.9a3 3 0 104.2 4.2" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M2.5 12S6 5 12 5s9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" stroke="#94a3b8" strokeWidth="2" strokeLinejoin="round" />
                      <circle cx="12" cy="12" r="3" stroke="#94a3b8" strokeWidth="2" />
                    </svg>
                  )}
                </button>
              </div>
            </label>

            <button type="submit" className="lg-submit-btn" disabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
            </button>

            <p className="lg-create-account">
              Need an account?{" "}
              <Link href="/dashboard/register-sales">Create Sales Account</Link>
            </p>
          </form>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={1000} />

      <style jsx global>{`
        html,
        body {
          margin: 0;
          padding: 0;
        }
      `}</style>

      <style jsx>{`
        .lg-page {
          height: 100vh;
          display: flex;
          background: #f7f8fc;
          font-family: "Manrope", sans-serif;
        }

        /* ---------- Brand side ---------- */
        .lg-brand {
          flex: 1 1 42%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 48px;
          background: linear-gradient(135deg, #5138ee 0%, #02ebad 130%);
          position: relative;
          overflow: hidden;
        }
        .lg-brand::before {
          content: "";
          position: absolute;
          width: 480px;
          height: 480px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          top: -160px;
          right: -160px;
        }
        .lg-brand::after {
          content: "";
          position: absolute;
          width: 320px;
          height: 320px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.06);
          bottom: -120px;
          left: -100px;
        }
        .lg-brand-inner {
          position: relative;
          z-index: 1;
          max-width: 420px;
          color: #fff;
        }
        .lg-logo {
          height: 34px;
          margin-bottom: 40px;
        }
        .lg-brand-inner h2 {
          font-size: 28px;
          font-weight: 800;
          margin: 0 0 14px;
        }
        .lg-brand-inner > p {
          font-size: 14.5px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
          margin: 0 0 36px;
        }
        .lg-feature {
          display: flex;
          gap: 14px;
          margin-bottom: 22px;
        }
        .lg-feature-icon {
          flex-shrink: 0;
          width: 34px;
          height: 34px;
          border-radius: 10px;
          background: rgba(255, 255, 255, 0.16);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .lg-feature strong {
          display: block;
          font-size: 14px;
          font-weight: 700;
          margin-bottom: 3px;
        }
        .lg-feature p {
          margin: 0;
          font-size: 13px;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.8);
        }

        /* ---------- Form side ---------- */
        .lg-form-side {
          flex: 1 1 58%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 24px;
        }
        .lg-form-card {
          width: 100%;
          max-width: 380px;
        }
        .lg-form-card h1 {
          font-size: 26px;
          font-weight: 800;
          color: #101323;
          margin: 0 0 6px;
        }
        .lg-subtitle {
          font-size: 14px;
          color: #6b7280;
          margin: 0 0 30px;
        }
        .lg-field {
          display: block;
          margin-bottom: 18px;
        }
        .lg-field-label {
          display: block;
          font-size: 12.5px;
          font-weight: 600;
          color: #374151;
          margin-bottom: 6px;
        }
        .lg-input-wrap {
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1.5px solid #e5e7eb;
          border-radius: 10px;
          padding: 0 14px;
          background: #fff;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .lg-input-wrap:focus-within {
          border-color: #5a57fb;
          box-shadow: 0 0 0 3px rgba(81, 56, 238, 0.12);
        }
        .lg-input-icon {
          flex-shrink: 0;
        }
        .lg-input-wrap input {
          flex: 1;
          border: none;
          outline: none;
          padding: 12px 0;
          font-size: 14px;
          color: #101323;
          background: transparent;
          min-width: 0;
        }
        .lg-toggle-eye {
          background: none;
          border: none;
          padding: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .lg-submit-btn {
          width: 100%;
          border: none;
          border-radius: 10px;
          padding: 13px;
          margin-top: 10px;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
          cursor: pointer;
          background: #5a57fb;
          box-shadow: 0 8px 20px rgba(81, 56, 238, 0.25);
          transition: opacity 0.15s ease, transform 0.15s ease;
        }
        .lg-submit-btn:hover:not(:disabled) {
          opacity: 0.92;
          transform: translateY(-1px);
        }
        .lg-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .lg-create-account {
          text-align: center;
          font-size: 13px;
          color: #6b7280;
          margin: 20px 0 0;
        }
        .lg-create-account :global(a) {
          color: #5138ee;
          font-weight: 600;
          text-decoration: none;
        }
        .lg-create-account :global(a:hover) {
          text-decoration: underline;
        }

        @media (max-width: 900px) {
          .lg-brand {
            display: none;
          }
          .lg-form-side {
            flex: 1 1 100%;
          }
        }
      `}</style>
    </div>
  );
}
