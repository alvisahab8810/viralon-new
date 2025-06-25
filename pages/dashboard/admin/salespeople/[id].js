// /* ----------------------------------------------------------
//    File: pages/dashboard/admin/salespeople/[id].js
// ---------------------------------------------------------- */
// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import Dashnav from "@/components/Dashnav";
// import Leftbar from "@/components/Leftbar";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const COLORS = ["#FF6384", "#FFCE56", "#36A2EB"];

// export default function SalespersonReport() {
//   const { status, data: session } = useSession();
//   const router = useRouter();
//   const { id } = router.query; // salesperson ID in URL

//   const [stats, setStats] = useState(null);

//   /* -------- fetch stats when admin + id present -------- */
//   useEffect(() => {
//     if (status !== "authenticated" || !id) return;

//     fetch(`/api/admin/sales-summary?salesperson=${id}`)
//       .then((r) => r.json())
//       .then(setStats)
//       .catch(console.error);
//   }, [status, id]);

//   /* -------- basic guard -------- */
//   if (status === "loading" || !stats) return <p>Loading…</p>;
//   //   if (session.user.role !== "admin")
//   //     return <p>Forbidden (admin only)</p>;

//   /* -------- chart data -------- */
//   const overviewData = [
//     { name: "Total", value: stats.total },
//     { name: "Closed", value: stats.closed },
//     { name: "Won", value: stats.won },
//     { name: "Lost", value: stats.lost },
//   ];

//   const leadLevelData = [
//     { name: "Hot", value: stats.hot },
//     { name: "Warm", value: stats.warm },
//     { name: "Cold", value: stats.cold },
//   ];

//   return (
//     <>
//       <Head>
//         <title>Salesperson Performance</title>
//         <link rel="stylesheet" href="/asets/css/bootstrap.min.css" />
//         <link rel="stylesheet" href="/asets/css/main.css" />
//       </Head>

//       <div className="main-nav">
//         <Dashnav />
//         <Leftbar role="admin" />

//         <section className="content home">
//           <div className="ptb-50">
//             <div className="block-header ">
//               <h2>
//                 Salesperson Performance
//                 <small className="text-muted">
//                   Overview for&nbsp;
//                   <strong className="text-black">
//                     {stats.name || "(rep)"}
//                   </strong>
//                 </small>
//               </h2>

//               {/* KPI cards */}
//               <div className="row pt-50">
//                 {[
//                   {
//                     label: "Total Leads",
//                     value: stats.total,
//                     color: "bg-primary",
//                   },
//                   {
//                     label: "Deals Closed",
//                     value: stats.closed,
//                     color: "bg-success",
//                   },
//                   { label: "Won", value: stats.won, color: "bg-info" },
//                   { label: "Lost", value: stats.lost, color: "bg-danger" },
//                 ].map((c) => (
//                   <div className="col-lg-3 col-md-6" key={c.label}>
//                     <div className={`card ${c.color} text-white`}>
//                       <div className="body text-center">
//                         <h4 className="mb-1">{c.value}</h4>
//                         <span>{c.label}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Charts */}
//               <div className="row ">
//                 {/* Bar chart */}
//                 <div className="col-md-6">
//                   <div className="card">
//                     <div className="body">
//                       <h5 className="mb-3">Deal Performance</h5>
//                       <ResponsiveContainer width="100%" height={250}>
//                         <BarChart data={overviewData}>
//                           <XAxis dataKey="name" />
//                           <YAxis allowDecimals={false} />
//                           <Tooltip />
//                           <Bar
//                             dataKey="value"
//                             fill="#007bff"
//                             radius={[4, 4, 0, 0]}
//                           />
//                         </BarChart>
//                       </ResponsiveContainer>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Pie chart */}
//                 <div className="col-md-6">
//                   <div className="card">
//                     <div className="body">
//                       <h5 className="mb-3">Lead Levels</h5>
//                       <ResponsiveContainer width="100%" height={250}>
//                         <PieChart>
//                           <Pie
//                             data={leadLevelData}
//                             dataKey="value"
//                             nameKey="name"
//                             outerRadius={80}
//                             label
//                           >
//                             {leadLevelData.map((entry, index) => (
//                               <Cell
//                                 key={`cell-${index}`}
//                                 fill={COLORS[index % COLORS.length]}
//                               />
//                             ))}
//                           </Pie>
//                           <Legend />
//                           <Tooltip />
//                         </PieChart>
//                       </ResponsiveContainer>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }



// import { useEffect, useState } from "react";
// import { useSession } from "next-auth/react";
// import { useRouter } from "next/router";
// import Head from "next/head";
// import Dashnav from "@/components/Dashnav";
// import Leftbar from "@/components/Leftbar";

// import {
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";

// const COLORS = ["#FF6384", "#FFCE56", "#36A2EB"];

// export default function SalespersonReport() {
//   const { status, data: session } = useSession();
//   const router = useRouter();
//   const { id } = router.query;

//   const [stats, setStats] = useState(null);
//   const [loadingStats, setLoadingStats] = useState(true);

//   useEffect(() => {
//     if (!id) return;

//     fetch(`/api/admin/sales-summary?salesperson=${id}`)
//       .then((r) => {
//         if (!r.ok) throw new Error("Failed to fetch stats");
//         return r.json();
//       })
//       .then((data) => {
//         setStats(data);
//         setLoadingStats(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching stats:", err);
//         setLoadingStats(false);
//       });
//   }, [id]);

//   // Debug logs (optional)
//   console.log("Session status:", status);
//   console.log("Stats:", stats);

//   // Guards
//   if (typeof window !== "undefined" && status === "loading") {
//     return <p>Loading session…</p>;
//   }

//   if (loadingStats || !stats) {
//     return <p>Loading stats…</p>;
//   }

//   const overviewData = [
//     { name: "Total", value: stats.total },
//     { name: "Closed", value: stats.closed },
//     { name: "Won", value: stats.won },
//     { name: "Lost", value: stats.lost },
//   ];

//   const leadLevelData = [
//     { name: "Hot", value: stats.hot },
//     { name: "Warm", value: stats.warm },
//     { name: "Cold", value: stats.cold },
//   ];

//   return (
//     <>
//       <Head>
//         <title>Salesperson Performance</title>
//         <link rel="stylesheet" href="/asets/css/bootstrap.min.css" />
//         <link rel="stylesheet" href="/asets/css/main.css" />
//       </Head>

//       <div className="main-nav">
//         <Dashnav />
//         <Leftbar role="admin" />

//         <section className="content home">
//           <div className="ptb-50">
//             <div className="block-header">
//               <h2>
//                 Salesperson Performance
//                 <small className="text-muted">
//                   Overview for&nbsp;
//                   <strong className="text-black">
//                     {stats.name || "(rep)"}
//                   </strong>
//                 </small>
//               </h2>

//               {/* KPI Cards */}
//               <div className="row pt-50">
//                 {[
//                   {
//                     label: "Total Leads",
//                     value: stats.total,
//                     color: "bg-primary",
//                   },
//                   {
//                     label: "Deals Closed",
//                     value: stats.closed,
//                     color: "bg-success",
//                   },
//                   { label: "Won", value: stats.won, color: "bg-info" },
//                   { label: "Lost", value: stats.lost, color: "bg-danger" },
//                 ].map((c) => (
//                   <div className="col-lg-3 col-md-6" key={c.label}>
//                     <div className={`card ${c.color} text-white`}>
//                       <div className="body text-center">
//                         <h4 className="mb-1">{c.value}</h4>
//                         <span>{c.label}</span>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Charts */}
//               <div className="row">
//                 {/* Bar chart */}
//                 <div className="col-md-6">
//                   <div className="card">
//                     <div className="body">
//                       <h5 className="mb-3">Deal Performance</h5>
//                       <ResponsiveContainer width="100%" height={250}>
//                         <BarChart data={overviewData}>
//                           <XAxis dataKey="name" />
//                           <YAxis allowDecimals={false} />
//                           <Tooltip />
//                           <Bar
//                             dataKey="value"
//                             fill="#007bff"
//                             radius={[4, 4, 0, 0]}
//                           />
//                         </BarChart>
//                       </ResponsiveContainer>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Pie chart */}
//                 <div className="col-md-6">
//                   <div className="card">
//                     <div className="body">
//                       <h5 className="mb-3">Lead Levels</h5>
//                       <ResponsiveContainer width="100%" height={250}>
//                         <PieChart>
//                           <Pie
//                             data={leadLevelData}
//                             dataKey="value"
//                             nameKey="name"
//                             outerRadius={80}
//                             label
//                           >
//                             {leadLevelData.map((entry, index) => (
//                               <Cell
//                                 key={`cell-${index}`}
//                                 fill={COLORS[index % COLORS.length]}
//                               />
//                             ))}
//                           </Pie>
//                           <Legend />
//                           <Tooltip />
//                         </PieChart>
//                       </ResponsiveContainer>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }





import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Head from "next/head";
import Dashnav from "@/components/Dashnav";
import Leftbar from "@/components/Leftbar";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#FF6384", "#FFCE56", "#36A2EB"];

export default function SalespersonReport() {
  const { status } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const [stats, setStats] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  // ✅ Mark component as mounted (client-side)
  useEffect(() => {
    setHasMounted(true);
  }, []);

  // ✅ Fetch data when `id` is available
  useEffect(() => {
    if (!id) return;

    fetch(`/api/admin/sales-summary?salesperson=${id}`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch stats");
        return r.json();
      })
      .then((data) => {
        setStats(data);
        setLoadingStats(false);
      })
      .catch((err) => {
        console.error("Error fetching stats:", err);
        setLoadingStats(false);
      });
  }, [id]);

  // ✅ Prevent hydration mismatch: render nothing until ready
  if (!hasMounted || status === "loading" || loadingStats || !stats) {
    return <div style={{ visibility: "hidden" }}>Loading…</div>;
  }

  const overviewData = [
    { name: "Total", value: stats.total },
    { name: "Closed", value: stats.closed },
    { name: "Won", value: stats.won },
    { name: "Lost", value: stats.lost },
  ];

  const leadLevelData = [
    { name: "Hot", value: stats.hot },
    { name: "Warm", value: stats.warm },
    { name: "Cold", value: stats.cold },
  ];

  return (
    <>
      <Head>
        <title>Salesperson Performance</title>
        <link rel="stylesheet" href="/asets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/asets/css/main.css" />
      </Head>

      <div className="main-nav">
        <Dashnav />
        <Leftbar role="admin" />

        <section className="content home">
          <div className="ptb-50">
            <div className="block-header">
              <h2>
                Salesperson Performance
                <small className="text-muted">
                  Overview for&nbsp;
                  <strong className="text-black">
                    {stats.name || "(rep)"}
                  </strong>
                </small>
              </h2>

              {/* KPI Cards */}
              <div className="row pt-50">
                {[
                  {
                    label: "Total Leads",
                    value: stats.total,
                    color: "bg-primary",
                  },
                  {
                    label: "Deals Closed",
                    value: stats.closed,
                    color: "bg-success",
                  },
                  { label: "Won", value: stats.won, color: "bg-info" },
                  { label: "Lost", value: stats.lost, color: "bg-danger" },
                ].map((c) => (
                  <div className="col-lg-3 col-md-6" key={c.label}>
                    <div className={`card ${c.color} text-white`}>
                      <div className="body text-center">
                        <h4 className="mb-1">{c.value}</h4>
                        <span>{c.label}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Charts */}
              <div className="row">
                {/* Bar chart */}
                <div className="col-md-6">
                  <div className="card">
                    <div className="body">
                      <h5 className="mb-3">Deal Performance</h5>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={overviewData}>
                          <XAxis dataKey="name" />
                          <YAxis allowDecimals={false} />
                          <Tooltip />
                          <Bar
                            dataKey="value"
                            fill="#007bff"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>

                {/* Pie chart */}
                <div className="col-md-6">
                  <div className="card">
                    <div className="body">
                      <h5 className="mb-3">Lead Levels</h5>
                      <ResponsiveContainer width="100%" height={250}>
                        <PieChart>
                          <Pie
                            data={leadLevelData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={80}
                            label
                          >
                            {leadLevelData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Pie>
                          <Legend />
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
