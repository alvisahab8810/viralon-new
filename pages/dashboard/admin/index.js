import Head from "next/head";
import Link from "next/link";
import { useSession, getSession } from "next-auth/react";
import Dashnav from "../../../components/Dashnav";
import Leftbar from "../../../components/Leftbar";
import DashboardSummary from "../../../components/DashboardSummary";
import Setting from "../../../components/Setting";

export default function AdminDashboard({ role }) {
  const { data: session, status } = useSession();

  if (status === "loading") return <p style={{ padding: 20 }}>Loading…</p>;

  const isAdmin = role === "admin";

  return (
    <>
      <Head>
        {/* fixed typo: /assets not /asets */}
        <link rel="stylesheet" href="/assets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
        <title>Dashboard – Viralon</title>
      </Head>

      <div className="main-nav">
        <Dashnav />

        {/* side‑bar only for admins */}
        {isAdmin && <Leftbar />}

        <section className="content home">
          <div className="block-header">
            <div className="row">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>
                  Dashboard&nbsp;
                  <small className="text-muted">
                    Welcome to Viralon{session && `, ${session.user.name}`}
                  </small>
                </h2>
              </div>

              <div className="col-lg-5 col-md-6 col-sm-12">
                <ul className="breadcrumb float-md-right">
                  <li className="breadcrumb-item">
                    <Link href="/dashboard/admin">
                      <i className="zmdi zmdi-home" /> Viralon
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">Dashboard</li>
                </ul>
              </div>
            </div>
          </div>

          {/* summary is visible to everyone; can pass prop for compact view */}
          <DashboardSummary compact={!isAdmin} />
        </section>

        {/* invoice‑setting section – admins only */}
        {isAdmin && <Setting />}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Server‑side guard                                                 */
/*  Any logged‑in user may view.  We pass their role to the component. */
/* ------------------------------------------------------------------ */
// export async function getServerSideProps(ctx) {
//   const session = await getSession(ctx);

//   if (!session) {
//     // not logged in → bounce to login page
//     return { redirect: { destination: "/login", permanent: false } };
//   }

//   return {
//     props: { role: session.user.role }, // "admin" or "salesperson"
//   };
// }



export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) {
    // not logged in → bounce to correct login path
    return { redirect: { destination: "/dashboard/admin", permanent: false } };
  }

  return {
    props: { role: session.user.role }, // "admin" or "salesperson"
  };
}
