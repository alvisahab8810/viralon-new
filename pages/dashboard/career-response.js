import React, { useEffect, useState, useCallback } from "react";
import Head from "next/head";
import DashboardLayout from "../../components/DashboardLayout";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function CareerResponse() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // for filter -------------------

  const [filteredApps, setFilteredApps] = useState([]);
  const [positions, setPositions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedPosition, setAppliedPosition] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  //   for pagination ------

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const fetchApplications = useCallback(async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    try {
      const res = await fetch("/api/careers/list");
      const data = await res.json();
      if (data.success) {
        setApplications(data.data);

        // Get unique positions for dropdown
        const uniquePositions = [
          ...new Set(data.data.map((app) => app.appliedPosition)),
        ];
        setPositions(uniquePositions);
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // -----------------Filter Logic-------------

  useEffect(() => {
    let result = [...applications];

    // Filter by position
    if (appliedPosition) {
      result = result.filter((app) => app.appliedPosition === appliedPosition);
    }

    // Filter by date range
    if (dateRange.from && dateRange.to) {
      const from = new Date(dateRange.from);
      const to = new Date(dateRange.to);
      result = result.filter((app) => {
        const createdAt = new Date(app.createdAt);
        return createdAt >= from && createdAt <= to;
      });
    }

    // Filter by name/email
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (app) =>
          app.name.toLowerCase().includes(term) ||
          app.email.toLowerCase().includes(term)
      );
    }

    setFilteredApps(result);
    setCurrentPage(1);
  }, [appliedPosition, dateRange, searchTerm, applications]);

  // ----------------- Excel exprot logic------------

  const exportToExcel = () => {
    const exportData = applications.map((app) => ({
      Name: app.name,
      Email: app.email,
      Mobile: app.mobile,
      Portfolio: app.portfolioLink || "—",
      "Applied Position": app.appliedPosition,
      "Resume Link": `${window.location.origin}${app.resumePath}`,
      "Applied On": new Date(app.createdAt).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applications");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "career_applications.xlsx");
  };

  const hasActiveFilters =
    searchTerm || appliedPosition || dateRange.from || dateRange.to;

  const clearFilters = () => {
    setSearchTerm("");
    setAppliedPosition("");
    setDateRange({ from: "", to: "" });
  };

  const totalPages = Math.max(1, Math.ceil(filteredApps.length / rowsPerPage));
  const pageRows = filteredApps.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/assets/css/bootstrap-admin.min.css" />
        <link rel="stylesheet" href="/assets/css/main.css" />
      </Head>

      <div className="cr-page">
        <div className="cr-head">
          <div>
            <h1 className="cr-title">Career Response</h1>
            <p className="cr-subtitle">
              Every application submitted from the careers page, in one place
            </p>
          </div>

          <div className="cr-head-actions">
            <button
              type="button"
              className="cr-icon-btn"
              onClick={() => fetchApplications(true)}
              disabled={refreshing}
              title="Refresh"
            >
              <svg
                className={refreshing ? "cr-spin" : ""}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 2v6h-6" />
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                <path d="M3 22v-6h6" />
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
              </svg>
            </button>

            <button
              type="button"
              className="cr-btn-primary"
              onClick={exportToExcel}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 3v12" />
                <path d="m7 10 5 5 5-5" />
                <path d="M5 21h14" />
              </svg>
              Export to Excel
            </button>
          </div>
        </div>

        <div className="cr-card cr-filters">
          <div className="cr-field cr-search-field">
            <label>Search</label>
            <div className="cr-input-icon">
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="cr-field">
            <label>Applied For</label>
            <select
              value={appliedPosition}
              onChange={(e) => setAppliedPosition(e.target.value)}
            >
              <option value="">All Positions</option>
              {positions.map((pos, idx) => (
                <option key={idx} value={pos}>
                  {pos}
                </option>
              ))}
            </select>
          </div>

          <div className="cr-field">
            <label>From Date</label>
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) =>
                setDateRange({ ...dateRange, from: e.target.value })
              }
            />
          </div>

          <div className="cr-field">
            <label>To Date</label>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) =>
                setDateRange({ ...dateRange, to: e.target.value })
              }
            />
          </div>

          {hasActiveFilters && (
            <button type="button" className="cr-clear-btn" onClick={clearFilters}>
              Clear filters
            </button>
          )}
        </div>

        <div className="cr-result-count">
          {loading ? "Loading…" : `${filteredApps.length} application${filteredApps.length === 1 ? "" : "s"}`}
        </div>

        <div className="cr-card cr-table-card">
          <div className="cr-table-wrap">
            <table className="cr-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Portfolio</th>
                  <th>Applied For</th>
                  <th>Resume</th>
                  <th>Applied On</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="cr-empty-state">
                      Loading applications…
                    </td>
                  </tr>
                ) : pageRows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="cr-empty-state">
                      No applications found.
                    </td>
                  </tr>
                ) : (
                  pageRows.map((app) => (
                    <tr key={app._id}>
                      <td className="cr-name-cell">{app.name}</td>
                      <td className="cr-muted-cell">{app.email}</td>
                      <td className="cr-muted-cell">{app.mobile}</td>
                      <td>
                        {app.portfolioLink ? (
                          <a
                            className="cr-link"
                            href={app.portfolioLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                              <path d="M15 3h6v6" />
                              <path d="M10 14 21 3" />
                            </svg>
                          </a>
                        ) : (
                          <span className="cr-dash">—</span>
                        )}
                      </td>
                      <td>
                        <span className="cr-badge">{app.appliedPosition}</span>
                      </td>
                      <td>
                        {app.resumePath ? (
                          <a
                            href={encodeURI(app.resumePath)}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                            className="cr-download-btn"
                          >
                            <svg
                              width="13"
                              height="13"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M12 3v12" />
                              <path d="m7 10 5 5 5-5" />
                              <path d="M5 21h14" />
                            </svg>
                            Download
                          </a>
                        ) : (
                          <span className="cr-dash">—</span>
                        )}
                      </td>
                      <td className="cr-muted-cell">
                        {new Date(app.createdAt).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && filteredApps.length > rowsPerPage && (
            <div className="cr-pagination">
              <button
                type="button"
                className="cr-circle-btn"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <span className="cr-page-label">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                className="cr-circle-btn"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .cr-page {
          padding: 28px 32px 32px;
        }

        .cr-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .cr-title {
          margin: 0;
          font-size: 26px;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.02em;
        }

        .cr-subtitle {
          margin: 4px 0 0;
          font-size: 14px;
          color: #64748b;
        }

        .cr-head-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cr-icon-btn {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background: #fff;
          color: #475569;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 1px 2px rgba(15, 23, 42, 0.04);
          transition: background 0.15s ease, border-color 0.15s ease;
        }

        .cr-icon-btn:hover:not(:disabled) {
          background: #f8fafc;
          border-color: #cbd5e1;
        }

        .cr-icon-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .cr-spin {
          animation: cr-spin-anim 0.8s linear infinite;
        }

        @keyframes cr-spin-anim {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .cr-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          height: 38px;
          padding: 0 16px;
          border: none;
          border-radius: 10px;
          background: #5a57fb;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(81, 56, 238, 0.25);
          transition: opacity 0.15s ease;
        }

        .cr-btn-primary:hover {
          opacity: 0.92;
        }

        .cr-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
        }

        .cr-filters {
          display: flex;
          align-items: flex-end;
          gap: 16px;
          flex-wrap: wrap;
          padding: 16px;
          margin-bottom: 12px;
        }

        .cr-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 160px;
        }

        .cr-search-field {
          flex: 1 1 240px;
        }

        .cr-field label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #94a3b8;
        }

        .cr-field select,
        .cr-field input[type="date"] {
          height: 42px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 0 12px;
          font-size: 14px;
          color: #1e293b;
          background: #fff;
          outline: none;
          transition: border-color 0.15s ease;
        }

        .cr-field select:focus,
        .cr-field input:focus {
          border-color: #5a57fb;
        }

        .cr-input-icon {
          position: relative;
          display: flex;
          align-items: center;
        }

        .cr-input-icon svg {
          position: absolute;
          left: 12px;
          color: #94a3b8;
          pointer-events: none;
        }

        .cr-input-icon input {
          width: 100%;
          height: 42px;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 0 12px 0 36px;
          font-size: 14px;
          color: #1e293b;
          outline: none;
          transition: border-color 0.15s ease;
        }

        .cr-input-icon input:focus {
          border-color: #5a57fb;
        }

        .cr-clear-btn {
          height: 42px;
          padding: 0 14px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          color: #475569;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
        }

        .cr-clear-btn:hover {
          background: #f1f5f9;
        }

        .cr-result-count {
          font-size: 13px;
          color: #94a3b8;
          margin: 0 4px 10px;
          text-align: right;
        }

        .cr-table-card {
          overflow: hidden;
        }

        .cr-table-wrap {
          overflow-x: auto;
        }

        .cr-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 900px;
        }

        .cr-table thead tr {
          background: #f8fafc;
        }

        .cr-table th {
          text-align: left;
          padding: 12px 16px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #64748b;
          border-bottom: 1px solid #e2e8f0;
          white-space: nowrap;
        }

        .cr-table td {
          padding: 14px 16px;
          font-size: 14px;
          color: #334155;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
        }

        .cr-table tbody tr:last-child td {
          border-bottom: none;
        }

        .cr-table tbody tr:hover {
          background: #f8fafc;
        }

        .cr-name-cell {
          font-weight: 600;
          color: #0f172a;
        }

        .cr-muted-cell {
          color: #64748b;
        }

        .cr-dash {
          color: #cbd5e1;
        }

        .cr-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 999px;
          background: #eef0fe;
          color: #5138ee;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
        }

        .cr-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          color: #5138ee;
          font-weight: 600;
          text-decoration: none;
        }

        .cr-link:hover {
          text-decoration: underline;
        }

        .cr-download-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: 999px;
          background: #5a57fb;
          color: #fff;
          font-size: 13px;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
        }

        .cr-download-btn:hover {
          opacity: 0.9;
          color: #fff;
        }

        .cr-empty-state {
          text-align: center;
          padding: 40px 16px;
          color: #94a3b8;
          font-size: 14px;
        }

        .cr-pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 16px;
          border-top: 1px solid #f1f5f9;
        }

        .cr-circle-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: #5a57fb;
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: opacity 0.15s ease;
        }

        .cr-circle-btn:hover:not(:disabled) {
          opacity: 0.9;
        }

        .cr-circle-btn:disabled {
          background: #e2e8f0;
          color: #94a3b8;
          cursor: not-allowed;
        }

        .cr-page-label {
          font-size: 13px;
          font-weight: 600;
          color: #475569;
        }

        @media (max-width: 640px) {
          .cr-filters {
            flex-direction: column;
            align-items: stretch;
          }

          .cr-field {
            min-width: 0;
          }
        }
      `}</style>
    </>
  );
}

CareerResponse.getLayout = function getLayout(page) {
  return <DashboardLayout role="admin">{page}</DashboardLayout>;
};
