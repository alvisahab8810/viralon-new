import React, { useEffect, useState } from "react";
import Link from "next/link";
import Dashnav from "../../components/Dashnav";
import Leftbar from "../../components/Leftbar";
import Head from "next/head";
import DashboardSummary from "../../components/DashboardSummary";
import Setting from "../../components/Setting";
export default function admin() {



  return (
    <>
      <Head>
        <link rel="stylesheet" href="/asets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/asets/css/main.css" />
      </Head>

      

      <div className="main-nav">
        <Dashnav />
        <Leftbar />

        <section className="content home">
          <div className="block-header">
          
            <div className="row ptb-50">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>
                  Dashboard,,
                  <small className="text-muted">Welcome to Viralon</small>
                </h2>
              </div>
              <div className="col-lg-5 col-md-6 col-sm-12">
                {/* <button
                  className="btn btn-primary btn-icon btn-round hidden-sm-down float-right m-l-10"
                  type="button"
                >
                  <i className="zmdi zmdi-plus"></i>
                </button> */}
                <ul className="breadcrumb float-md-right">
                  <li className="breadcrumb-item">
                    <Link href="/dashboard/dashboard">
                      <i className="zmdi zmdi-home"></i> Viralon
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ul>
              </div>
            </div>
            <DashboardSummary />
          </div>
        </section>

        {/* ----------------invoice setting section ----------- */}
        <Setting/>
        
      </div>
    </>
  );
}

// ✅ protect this page with server-side login check
export async function getServerSideProps(context) {
  const { req, res } = context;
  const cookie = req.headers.cookie || "";

  if (!cookie.includes("admin_auth=true")) {
    return {
      redirect: {
        destination: "/dashboard/login",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // user is authenticated
  };
}
