import React from "react";
import Link from "next/link";
import Dashnav from "../../../../components/Dashnav";
import Leftbar from "../../../../components/Leftbar";
import Head from "next/head";

export default function admin() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/asets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/asets/css/main.css" />
        <link rel="stylesheet" href="/asets/css/admin.css" />

      </Head>
    
      <div className="main-nav">
        <Dashnav/>
        <Leftbar/>

       

        <section className="content home">
          <div className="block-header">
             <div className="row ptb-50">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>
                  New Customer
                  <small className="text-muted">Welcome to Viralon</small>
                </h2>
              </div>
              <div className="col-lg-5 col-md-6 col-sm-12">
                <ul className="breadcrumb float-md-right">
                  <li className="breadcrumb-item">
                    <Link href="/dashboard/dashboard">
                      <i className="zmdi zmdi-home"></i> Viralon /
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">New Customer</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}