// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import Dashnav from "../../components/Dashnav";
// import Leftbar from "../../components/Leftbar";
// import Head from "next/head";
// import DashboardSummary from "../../components/DashboardSummary";
// import Setting from "../../components/Setting";
// import io from "socket.io-client";

// export default function Admin() {

//    const [employeeStatus, setEmployeeStatus] = useState({});
//   const [socket, setSocket] = useState(null);;

// useEffect(() => {
//     const socketInstance = io(); // ✅ Connect to socket server
//     setSocket(socketInstance);

//     socketInstance.on("employeeStatusUpdate", (data) => {
//       setEmployeeStatus((prev) => ({
//         ...prev,
//         [data.employeeId]: data,
//       }));
//     });

//     return () => {
//       socketInstance.disconnect();
//     };
//   }, []);

//   return (
//     <>
//       <Head>
//         <link rel="stylesheet" href="/assets/css/bootstrap-admin.min.css" />
//         <link rel="stylesheet" href="/assets/css/main.css" />
//       </Head>

      

//       <div className="main-nav">
//         <Dashnav />
//         <Leftbar />

//         <section className="content home">
//           <div className="block-header">
          
//             <div className="row ptb-50">
//               <div className="col-lg-7 col-md-6 col-sm-12">
//                 <h2>
//                   Dashboard
//                   <small className="text-muted">Welcome to Viralon</small>
//                 </h2>
//               </div>
//               <div className="col-lg-5 col-md-6 col-sm-12">
//                 {/* <button
//                   className="btn btn-primary btn-icon btn-round hidden-sm-down float-right m-l-10"
//                   type="button"
//                 >
//                   <i className="zmdi zmdi-plus"></i>
//                 </button> */}
//                 <ul className="breadcrumb float-md-right">
//                   <li className="breadcrumb-item">
//                     <Link href="/dashboard/dashboard">
//                       <i className="zmdi zmdi-home"></i> Viralon
//                     </Link>
//                   </li>
//                   <li className="breadcrumb-item active">Dashboard</li>
//                 </ul>
//               </div>
//             </div>

// <div>
//   <h3>Employee Activity</h3>
//   <ul>
//     {Object.values(employeeStatus).map((emp) => (
//       <li key={emp.employeeId}>
//         {emp.name} - 
//         <span style={{ color: emp.status === "online" ? "green" : "red" }}>
//           {emp.status}
//         </span>
//         <small> Last Active: {new Date(emp.lastActive).toLocaleTimeString()}</small>
//       </li>
//     ))}
//   </ul>
// </div>

//             <DashboardSummary />
//           </div>
//         </section>

//         {/* ----------------invoice setting section ----------- */}
//         <Setting/>
        
//       </div>
//     </>
//   );
// }

// // ✅ protect this page with server-side login check
// export async function getServerSideProps(context) {
//   const { req, res } = context;
//   const cookie = req.headers.cookie || "";

//   if (!cookie.includes("admin_auth=true")) {
//     return {
//       redirect: {
//         destination: "/dashboard/login",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {}, // user is authenticated
//   };
// }


import React from "react";
import Head from "next/head";
import DashboardSummary from "../../components/DashboardSummary";
import DashboardLayout from "../../components/DashboardLayout";

export default function Admin() {
  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/bootstrap-admin.min.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
      </Head>

      <div className="bk-content" style={{ padding: "28px 32px 32px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 22,
              }}
            >
              <div>
                <h1 className="bk-page-title" style={{ margin: 0 }}>
                  Dashboard
                </h1>
                <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>
                  Welcome to Viralon
                </div>
              </div>
            </div>

            <DashboardSummary />
      </div>
    </>
  );
}

Admin.getLayout = function getLayout(page) {
  return <DashboardLayout role="admin">{page}</DashboardLayout>;
};

// ✅ Protect this page
export async function getServerSideProps(context) {
  const { req } = context;
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
    props: {},
  };
}
