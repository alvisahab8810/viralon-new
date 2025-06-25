/* ----------------------------------------------------------
   File: pages/dashboard/admin/salespeople.js
---------------------------------------------------------- */

import Cookies from "js-cookie";

import { useEffect, useState, useMemo } from "react";
import Head from "next/head";
import Link from "next/link";
import { useSession } from "next-auth/react";

import Dashnav from "@/components/Dashnav";
import Leftbar from "@/components/Leftbar";

const ROWS_PER_PAGE = 10;

export default function SalespeopleList() {
  const [rows, setRows] = useState([]);
  const [forbidden, setForbidden] = useState(false);

  const { status, data: session } = useSession(); // ✅ FIXED

  useEffect(() => {
    /*  wait only for the “loading” phase to finish  */
    if (status === "loading") return;

    fetch("/api/admin/salespeople")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setRows(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, [status]); // no need for Cookies.get or session.role
  /* ───────────────────────────────────────────────
     1.  Fetch list once session is known
     ─────────────────────────────────────────────── */
  // useEffect(() => {
  //   if (status !== "authenticated") return;

  //   fetch("/api/admin/salespeople")
  //     .then((r) => {
  //       if (r.status === 403) {
  //         setForbidden(true);
  //         return [];
  //       }
  //       if (!r.ok) throw new Error("Fetch failed");
  //       return r.json();
  //     })
  //     .then((data) => setRows(Array.isArray(data) ? data : []))
  //     .catch(console.error);
  // }, [status]);

  /* ───────────────────────────────────────────────
     2.  Filter + pagination state
     ─────────────────────────────────────────────── */
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  // Reset to first page whenever filter changes
  useEffect(() => setPage(1), [search]);

  /* apply filter */
  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return rows.filter((u) =>
      [u.name, u.email, u.phone].some((f) =>
        (f || "").toLowerCase().includes(q)
      )
    );
  }, [rows, search]);

  /* slice for current page */
  const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
  const pageRows = filtered.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  /* ───────────────────────────────────────────────
     3.  Guards
     ─────────────────────────────────────────────── */
  if (status === "loading") return <p>Loading…</p>;
  if (forbidden) return <p>Forbidden (Admin only)</p>;

  /* ───────────────────────────────────────────────
     4.  Render
     ─────────────────────────────────────────────── */

  return (
    <>
      <Head>
        <title>Salespeople</title>
        <link rel="stylesheet" href="/asets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/asets/css/main.css" />
      </Head>

      <div className="main-nav career-response">
        <Dashnav />
        <Leftbar role="admin" />

        <section className="content home">
          <div className="block-header ptb-50">
            <h2>All Salespeople</h2>
          </div>

          {/* filter input */}
          <div className="mb-3 filters " style={{ maxWidth: 320 }}>
            <input
              className="form-control bg-white"
              placeholder="Search name / email / phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((u) => (
                  <tr key={u._id}>
                    <td>
                      <Link href={`/dashboard/admin/salespeople/${u._id}`}>
                        {u.name || "(Unnamed)"}
                      </Link>
                    </td>
                    <td>{u.email}</td>
                    <td>{u.phone || "–"}</td>
                    <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <p className="mt-3 text-muted">No salespeople found.</p>
            )}
          </div>

          {/* pagination controls */}
          {filtered.length > ROWS_PER_PAGE && (
            <div className="pagination-controls mt-3 d-flex justify-content-center align-items-center">
              <button
                className="circle-btn me-3circle-btn me-3"
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
              >
                <i className="zmdi zmdi-chevron-left"></i>
              </button>
              <span>
                Page {page} / {totalPages}
              </span>
              <button
                className="circle-btn ms-3"
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              >
                <i className="zmdi zmdi-chevron-right"></i>
              </button>
            </div>
          )}
        </section>
      </div>
    </>
  );
}
