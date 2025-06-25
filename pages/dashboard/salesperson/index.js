// import { useSession, getSession } from "next-auth/react";
// import { signOut } from "next-auth/react";

// export default function SalespersonDashboard() {
//   const { data: session, status } = useSession();
//   if (status === "loading") return <p style={{padding:20}}>Loading…</p>;

//   const { user } = session;

//   return (
//     <main style={{padding:24}}>
//       <h2>Welcome, {user.name}</h2>
//       <p>Email: {user.email}</p>
//       <p>Role:  {user.role}</p>

//       <button style={{marginTop:20}} onClick={()=>signOut({ callbackUrl:"/login" })}>
//         Sign out
//       </button>
//     </main>
//   );
// }

// // Server‑side guard: redirect to /login if not salesperson
// export async function getServerSideProps(ctx) {
//   const session = await getSession(ctx);
//   if (!session || session.user.role !== "salesperson") {
//     return { redirect:{ destination:"/login", permanent:false }};
//   }
//   return { props:{} };
// }

import Head from "next/head";
import Link from "next/link";
import { useSession, getSession } from "next-auth/react";

import Dashnav from "../../../components/Dashnav";
import Leftbar from "../../../components/Leftbar";
import DashboardSummary from "../../../components/DashboardSummary";
import Setting from "../../../components/Setting";
import SalesReports from "../../../components/SalesDashboard";

export default function AdminDashboard({ role }) {
  const { data: session, status } = useSession();

  if (status === "loading") return <p style={{ padding: 20 }}>Loading…</p>;

  const isAdmin = role === "admin";

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/asets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/asets/css/main.css" />
        <title>Dashboard – Viralon</title>
      </Head>

      <div className="main-nav">
        <Dashnav />

        {/* Sidebar: admins get full menu, salespersons get trimmed menu */}
        <Leftbar role={role} />

        <section className="content home">
          <div className="block-header">
            <div className="row ptb-50">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>
                  My Sales Report&nbsp;
                  <small className="text-muted">
                    Welcome to Viralon,{" "}
                    <b className="text-black">{session.user.name}</b>
                  </small>
                </h2>
              </div>

              <div className="col-lg-5 col-md-6 col-sm-12">
                <ul className="breadcrumb float-md-right">
                  <li className="breadcrumb-item"></li>
                  <li className="breadcrumb-item active">
                    Overview of your pipeline{" "}
                  </li>
                </ul>
              </div>
            </div>

            <SalesReports />
          </div>

          {/* Summary always visible; compact mode for salespersons */}
          {/* <DashboardSummary compact={!isAdmin} /> */}
        </section>

        {/* Settings panel only for admins */}
        {isAdmin && <Setting />}
      </div>
    </>
  );
}

/* ------------------- server‑side guard ------------------- */
export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) {
    return { redirect: { destination: "/login", permanent: false } };
  }

  // Redirect salespersons who try to access the admin dashboard
  if (session.user.role !== "admin" && ctx.resolvedUrl === "/dashboard/admin") {
    return {
      redirect: { destination: "/dashboard/salesperson", permanent: false },
    };
  }

  return {
    props: { role: session.user.role }, // "admin" or "salesperson"
  };
}
