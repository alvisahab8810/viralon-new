import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RegisterSales() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const router = useRouter();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // quick client validation
    if (form.password !== form.confirm)
      return toast.error("Passwords do not match");

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      toast.success("Account created! Redirecting to login…");
      setTimeout(() => router.push("/dashboard/login-sales"), 1500);
    } else {
      const { msg } = await res.json();
      toast.error(msg || "Registration failed");
    }
  };

  return (
    <div className="login-admin">
      <Head>
        <link rel="stylesheet" href="/asets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/asets/css/main.css" />
        <title>Create Sales Account</title>
      </Head>

      <div className="theme-cyan authentication sidebar-collapse">
        <div className="page-header">
          <div
            className="page-header-image"
            style={{ backgroundImage: "url(/assets/img/login.jpg)" }}
          ></div>

          <div className="container">
            <div className="col-md-12 content-center">
              <div className="card-plain">
                <form onSubmit={handleSubmit} className="form">
                  <div className="header">
                    <h5>Create Sales Account</h5>
                  </div>

                  <div className="content">
                    {/* USERNAME */}
                    <div className="input-group input-lg">
                      <input
                        name="name" // ← rename
                        value={form.name}
                        onChange={handleChange}
                        type="text"
                        className="form-control"
                        placeholder="Full name"
                        required
                      />
                      <span className="input-group-addon">
                        <i className="zmdi zmdi-account-circle"></i>
                      </span>
                    </div>

                    {/* EMAIL */}
                    <div className="input-group input-lg">
                      <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        className="form-control"
                        placeholder="Email Address"
                        required
                      />
                      <span className="input-group-addon">
                        <i className="zmdi zmdi-email"></i>
                      </span>
                    </div>

                    {/* PHONE */}
                    <div className="input-group input-lg">
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        type="tel"
                        className="form-control"
                        placeholder="Phone Number"
                      />
                      <span className="input-group-addon">
                        <i className="zmdi zmdi-phone"></i>
                      </span>
                    </div>

                    {/* PASSWORD */}
                    <div className="input-group input-lg">
                      <input
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        required
                      />
                      <span className="input-group-addon">
                        <i className="zmdi zmdi-lock"></i>
                      </span>
                    </div>

                    {/* CONFIRM */}
                    <div className="input-group input-lg">
                      <input
                        name="confirm"
                        value={form.confirm}
                        onChange={handleChange}
                        type="password"
                        className="form-control"
                        placeholder="Confirm Password"
                        required
                      />
                      <span className="input-group-addon">
                        <i className="zmdi zmdi-check"></i>
                      </span>
                    </div>
                  </div>

                  <div className="footer text-center">
                    <button
                      type="submit"
                      className="btn l-cyan btn-round btn-lg btn-block waves-effect waves-light"
                    >
                      CREATE ACCOUNT
                    </button>

                    <p className="mt-3">
                      <small>
                        Already registered?{" "}
                        <Link
                          href="/dashboard/login-sales"
                          className="text-primary"
                        >
                          Sign in
                        </Link>
                      </small>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* optional footer copy‑paste from login if you want */}
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
}
