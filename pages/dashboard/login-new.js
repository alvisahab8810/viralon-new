import React from 'react'

import Head from 'next/head'

export default function LoginNew() {
  return (
    <div>
          <Head>
        <link rel="stylesheet" href="/asets/css/admin.css" />

        <title>Admin Login</title>
      </Head>
         <div className="admin-login-area">
    <div className="left-side">
      <div style={{ maxWidth: "400px", width: "100%" }}>
        <div className="icon-circle" aria-hidden="true">
          <i className="fas fa-building"></i>
        </div>
        <h1>Admin Login</h1>
        <p className="subtitle">Sign in to the administrator panel</p>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className="form-control"
            />
          </div>
          <div className="mb-3 password-wrapper">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="form-control"
            />
            <button type="button" aria-label="Toggle password visibility" tabIndex={-1}>
              <i className="far fa-eye"></i>
            </button>
          </div>
          <button type="submit" className="btn btn-purple">
            Sign in
          </button>
        </form>
        <div className="info-box" role="alert">
          <div className="info-title">
            <i className="fas fa-shield-alt"></i>
            Admin Access Only
          </div>
          <p>
            This portal is restricted to administrators only. Unauthorized access attempts are logged and monitored.
          </p>
        </div>
      </div>
    </div>
    <div className="right-side" aria-label="Information panel">
      <div className="content-box">
        <h2>Admin Control Panel</h2>
        <p>
          Welcome to the central admin dashboard. Manage clients, generate invoices & quotations, track sales, and handle queries — all in one place.
        </p>
        <div className="feature">
          <i className="fas fa-key" aria-hidden="true"></i>
          <div className="feature-text">
            <strong>Lead & Career Tracking</strong>
            Capture and review queries or job applications submitted via your site to keep your communication streamlined.
          </div>
        </div>
        <div className="feature">
          <i className="fas fa-shield-alt" aria-hidden="true"></i>
          <div className="feature-text">
            <strong>Integrated Sales & Operations</strong>
            Use the built-in sales tools to track performance, streamline operations, and improve customer engagement.


          </div>
        </div>
      </div>
    </div>
  </div>
    </div>
  )
}
