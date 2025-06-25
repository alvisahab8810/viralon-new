// File: pages/dashboard/login-sales.js

import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SalesLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.ok) {
      toast.success("Login successful!");
      setTimeout(() => router.push("/dashboard/salesperson"), 1200);
    } else {
      setMsg("Invalid credentials");
    }
  }

  return (
    <div className="login-admin">
      <Head>
        <link rel="stylesheet" href="/asets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/asets/css/main.css" />
        <title>Salesperson Login</title>
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
                    <h5>Salesperson Login</h5>
                  </div>

                  <div className="content">
                    <div className="input-group input-lg">
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                      <span className="input-group-addon">
                        <i className="zmdi zmdi-email"></i>
                      </span>
                    </div>
                    <div className="input-group input-lg">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <span className="input-group-addon">
                        <i className="zmdi zmdi-lock"></i>
                      </span>
                    </div>
                  </div>

                  <div className="footer text-center">
                    <button
                      type="submit"
                      className="btn l-cyan btn-round btn-lg btn-block waves-effect waves-light"
                    >
                      SIGN IN
                    </button>
                    {msg && <p className="text-danger mt-2">{msg}</p>}

                    <p className="mt-3">
                      <small>
                        Need an account?{" "}
                        <Link href="/dashboard/register-sales" className="text-primary">
                          Create Sales Account
                        </Link>
                      </small>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={1000} />
    </div>
  );
}
