import { getSession } from "next-auth/react";

import React, { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout";
import Head from "next/head";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useRouter } from "next/router";

const SELECT_FIELDS = ["Requirement meet", "Lead Level", "Status", "Final status", "Contacted by"];
const DATE_FIELDS = [
  "First contact date",
  "Proposal date",
  "Revised proposal date",
  "Decision date",
  "Requirement Meet date",
];

const SELECT_OPTIONS = {
  "Requirement meet": ["G Meet", "Personal Meet", "Calls"],
  "Lead Level": ["Hot", "Warm", "Cold"],
  Status: ["Won", "Lost"],
  "Final status": ["Closed", "Contact after week", "Contact after 3 months", "Contact after 6 months"],
};

// The meeting the team fixed on the phone, set from the CRM Leads board.
// "Google Meet" + "2026-09-04" + "16:30" → "Google Meet · 4 Sep, 4:30 PM".
const meetingLabel = (q) => {
  if (!q?.meetingDate) return "";
  const day = new Date(`${q.meetingDate}T00:00:00Z`).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", timeZone: "UTC",
  });
  let time = "";
  if (q.meetingTime) {
    const [h, m] = String(q.meetingTime).split(":").map(Number);
    const ampm = h < 12 ? "AM" : "PM";
    time = `, ${h % 12 === 0 ? 12 : h % 12}:${String(m).padStart(2, "0")} ${ampm}`;
  }
  return `${q.meetingMode ? `${q.meetingMode} · ` : ""}${day}${time}`;
};

export default function QueryResponse({ role }) {
  const router = useRouter();

  const [salespeople, setSalespeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [queries, setQueries] = useState([]);
  const [customFieldData, setCustomFieldData] = useState({});
  const [columnWidths, setColumnWidths] = useState({});
  const userId = "some-unique-id"; // Could be from user auth, or a generated session id

  const customFields = [
    "First contact date",
    "Connect counts",
    "Requirement meet",
    "Requirement Meet date",
    "Contacted by",
    "Lead Level",
    "Requirement brief",
    "Proposal sent",
    "Proposal date",
    "Objections",
    "Revised proposal date",
    "Decision date",
    "Status",
    "Deal Amount",
    "Reason (if lost)",
    "Final status",
  ];

  // for filters ----------------
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [formTypeFilter, setFormTypeFilter] = useState("");

  // for pagination ------
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    fetch("/api/admin/salespeople")
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setSalespeople(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  // Fetch saved column widths
  useEffect(() => {
    async function fetchWidths() {
      const res = await fetch(`/api/queries/column-width-get?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.widths) setColumnWidths(data.widths);
      }
    }
    fetchWidths();
  }, []);

  async function saveWidths(newWidths) {
    await fetch("/api/queries/column-width-save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, widths: newWidths }),
    });
  }

  function initResize(e, columnId) {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = columnWidths[columnId] || 150;

    function onMouseMove(e) {
      const newWidth = Math.max(startWidth + e.clientX - startX, 90);
      setColumnWidths((prev) => {
        const updated = { ...prev, [columnId]: newWidth };
        saveWidths(updated);
        return updated;
      });
    }

    function onMouseUp() {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/queries/getCustomFields");
      const data = await res.json();
      setCustomFieldData(data);
    };
    fetchData();
  }, []);

  const handleSave = async (updatedRow) => {
    try {
      const res = await fetch("/api/queries/saveCustomFields", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedRow),
      });
      const result = await res.json();
      console.log("Auto-saved:", result.message);
    } catch (error) {
      console.error("Auto-save failed:", error);
    }
  };

  const updateField = (id, field, value) => {
    const updated = { ...customFieldData };
    if (!updated[id]) updated[id] = {};
    updated[id][field] = value;
    setCustomFieldData(updated);
    handleSave({ [id]: updated[id] });
  };

  const fetchAllResponses = async (isRefresh = false) => {
    isRefresh ? setRefreshing(true) : setLoading(true);
    try {
      const [queryRes, contactRes] = await Promise.all([
        fetch("/api/queries/query"),
        fetch("/api/queries/contact"),
      ]);

      const queryData = await queryRes.json();
      const contactData = await contactRes.json();

      const formattedQueries = queryData.success
        ? queryData.data.map((item) => ({
            ...item,
            formType: "Query",
            businessName: item.businessName || "-",
          }))
        : [];

      const formattedContacts = contactData.success
        ? contactData.data.map((item) => ({
            _id: item._id,
            name: item.name,
            email: item.email,
            phone: item.phone || "-",
            businessName: item.businessName,
            createdAt: item.createdAt,
            formType: "Contact",
          }))
        : [];

      const combined = [...formattedQueries, ...formattedContacts].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      setQueries(combined);
    } catch (error) {
      console.error("Error fetching responses", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllResponses();
  }, []);

  // ---------- for export excel ----------
  const exportToExcel = () => {
    const exportData = queries.map((q) => ({
      Name: q.name,
      Email: q.email,
      Phone: q.phone,
      Business: q.businessName || "—",
      Budget: q.budget || "—",
      Meeting: meetingLabel(q) || "—",
      "Form Type": q.formType || "Query Form",
      "Submitted On": new Date(q.createdAt).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Query Responses");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "query_responses.xlsx");
  };

  // ----------------- for filters ----------
  const filteredQueries = queries.filter((q) => {
    const createdAt = new Date(q.createdAt);
    const matchesDate =
      (!fromDate || new Date(fromDate) <= createdAt) &&
      (!toDate || new Date(toDate) >= createdAt);

    const matchesFormType = !formTypeFilter || q.formType?.toLowerCase() === formTypeFilter;

    return matchesDate && matchesFormType;
  });

  const hasActiveFilters = fromDate || toDate || formTypeFilter;

  const clearFilters = () => {
    setFromDate("");
    setToDate("");
    setFormTypeFilter("");
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [fromDate, toDate, formTypeFilter, queries]);

  const totalPages = Math.max(1, Math.ceil(filteredQueries.length / rowsPerPage));
  const pageRows = filteredQueries.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ============== convert to client ====================
  const handleConvertToClient = (queryData) => {
    router.push({
      pathname: "/dashboard/sales/customers/new-customer",
      query: {
        name: queryData.name || "",
        email: queryData.email || "",
        phone: queryData.phone || "",
        businessName: queryData.businessName || "",
      },
    });
  };

  const renderCell = (q, field) => {
    if (SELECT_FIELDS.includes(field)) {
      if (field === "Contacted by") {
        return (
          <select
            className="qr-cell-select"
            value={customFieldData[q._id]?.[field] || ""}
            onChange={(e) => updateField(q._id, field, e.target.value)}
          >
            <option value="">Select</option>
            {salespeople.map((rep) => (
              <option key={rep._id} value={rep._id}>
                {rep.name}
              </option>
            ))}
          </select>
        );
      }
      return (
        <select
          className="qr-cell-select"
          value={customFieldData[q._id]?.[field] || ""}
          onChange={(e) => updateField(q._id, field, e.target.value)}
        >
          <option value="">Select</option>
          {(SELECT_OPTIONS[field] || []).map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      );
    }

    if (DATE_FIELDS.includes(field)) {
      return (
        <input
          type="date"
          className="qr-cell-input"
          value={customFieldData[q._id]?.[field] || ""}
          onChange={(e) => updateField(q._id, field, e.target.value)}
        />
      );
    }

    if (field === "Deal Amount") {
      return (
        <input
          type="number"
          className="qr-cell-input"
          placeholder="Enter amount"
          value={customFieldData[q._id]?.[field] || ""}
          onChange={(e) => updateField(q._id, field, e.target.value)}
          disabled={customFieldData[q._id]?.["Status"] !== "Won"}
        />
      );
    }

    return (
      <textarea
        className="qr-cell-textarea"
        rows={1}
        value={customFieldData[q._id]?.[field] || ""}
        onChange={(e) => {
          updateField(q._id, field, e.target.value);
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
        onInput={(e) => {
          e.target.style.height = "auto";
          e.target.style.height = e.target.scrollHeight + "px";
        }}
      />
    );
  };

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/asets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/asets/css/main.css" />
      </Head>

      <div className="qr-page">
        <div className="qr-head">
          <div>
            <h1 className="qr-title">Query Response</h1>
            <p className="qr-subtitle">
              Every query &amp; contact form submission, tracked in one place
            </p>
          </div>

          <div className="qr-head-actions">
            <button
              type="button"
              className="qr-icon-btn"
              onClick={() => fetchAllResponses(true)}
              disabled={refreshing}
              title="Refresh"
            >
              <svg
                className={refreshing ? "qr-spin" : ""}
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

            <button type="button" className="qr-btn-primary" onClick={exportToExcel}>
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

        <div className="qr-card qr-filters">
          <div className="qr-field">
            <label>From Date</label>
            <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>

          <div className="qr-field">
            <label>To Date</label>
            <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>

          <div className="qr-field">
            <label>Form Type</label>
            <select value={formTypeFilter} onChange={(e) => setFormTypeFilter(e.target.value)}>
              <option value="">All</option>
              <option value="query">Query Form</option>
              <option value="contact">Contact Form</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button type="button" className="qr-clear-btn" onClick={clearFilters}>
              Clear filters
            </button>
          )}
        </div>

        <div className="qr-result-count">
          {loading ? "Loading…" : `${filteredQueries.length} response${filteredQueries.length === 1 ? "" : "s"}`}
        </div>

        <div className="qr-card qr-table-card">
          <div className="qr-table-wrap">
            <table className="qr-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Business</th>
                  <th>Budget</th>
                  <th>Meeting</th>
                  <th>Date</th>
                  <th>Form Type</th>

                  {customFields.map((field) => (
                    <th
                      key={field}
                      className="qr-resizable-th"
                      style={{
                        minWidth: columnWidths[field] || 150,
                        width: columnWidths[field] || 150,
                      }}
                    >
                      {field}
                      <span className="qr-resize-handle" onMouseDown={(e) => initResize(e, field)} />
                    </th>
                  ))}

                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9 + customFields.length} className="qr-empty-state">
                      Loading responses…
                    </td>
                  </tr>
                ) : pageRows.length === 0 ? (
                  <tr>
                    <td colSpan={9 + customFields.length} className="qr-empty-state">
                      No responses found.
                    </td>
                  </tr>
                ) : (
                  pageRows.map((q) => (
                    <tr key={q._id}>
                      <td className="qr-name-cell">{q.name}</td>
                      <td className="qr-muted-cell">{q.email}</td>
                      <td className="qr-muted-cell">{q.phone}</td>
                      <td className="qr-muted-cell">{q.businessName}</td>
                      <td className="qr-muted-cell">{q.budget || "—"}</td>
                      <td className="qr-muted-cell">
                        {meetingLabel(q) ? (
                          <span className="qr-badge">{meetingLabel(q)}</span>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td className="qr-muted-cell">
                        {new Date(q.createdAt).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                      <td>
                        <span className="qr-badge">
                          {q.formType && q.formType.toLowerCase() === "query" ? "Query Form" : q.formType}
                        </span>
                      </td>

                      {customFields.map((field) => (
                        <td key={field}>{renderCell(q, field)}</td>
                      ))}

                      <td>
                        <button
                          type="button"
                          onClick={() => handleConvertToClient(q)}
                          className="qr-action-btn"
                          title="Convert to Client"
                        >
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
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <path d="M19 8v6" />
                            <path d="M22 11h-6" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {!loading && filteredQueries.length > rowsPerPage && (
            <div className="qr-pagination">
              <button
                type="button"
                className="qr-circle-btn"
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
              <span className="qr-page-label">
                Page {currentPage} of {totalPages}
              </span>
              <button
                type="button"
                className="qr-circle-btn"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
        .qr-page {
          padding: 28px 32px 32px;
        }

        .qr-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 20px;
        }

        .qr-title {
          margin: 0;
          font-size: 26px;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.02em;
        }

        .qr-subtitle {
          margin: 4px 0 0;
          font-size: 14px;
          color: #64748b;
        }

        .qr-head-actions {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .qr-icon-btn {
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

        .qr-icon-btn:hover:not(:disabled) {
          background: #f8fafc;
          border-color: #cbd5e1;
        }

        .qr-icon-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .qr-spin {
          animation: qr-spin-anim 0.8s linear infinite;
        }

        @keyframes qr-spin-anim {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .qr-btn-primary {
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

        .qr-btn-primary:hover {
          opacity: 0.92;
        }

        .qr-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
        }

        .qr-filters {
          display: flex;
          align-items: flex-end;
          gap: 16px;
          flex-wrap: wrap;
          padding: 16px;
          margin-bottom: 12px;
        }

        .qr-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
          min-width: 160px;
        }

        .qr-field label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #94a3b8;
        }

        .qr-field select,
        .qr-field input[type="date"] {
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

        .qr-field select:focus,
        .qr-field input:focus {
          border-color: #5a57fb;
        }

        .qr-clear-btn {
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

        .qr-clear-btn:hover {
          background: #f1f5f9;
        }

        .qr-result-count {
          font-size: 13px;
          color: #94a3b8;
          margin: 0 4px 10px;
          text-align: right;
        }

        .qr-table-card {
          overflow: hidden;
        }

        .qr-table-wrap {
          overflow-x: auto;
        }

        .qr-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 2100px;
        }

        .qr-table thead tr {
          background: #f8fafc;
        }

        .qr-table th {
          position: relative;
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

        .qr-resize-handle {
          position: absolute;
          right: 0;
          top: 0;
          height: 100%;
          width: 6px;
          cursor: col-resize;
          user-select: none;
        }

        .qr-resize-handle:hover {
          background: #5a57fb33;
        }

        .qr-table td {
          padding: 10px 16px;
          font-size: 14px;
          color: #334155;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
        }

        .qr-table tbody tr:last-child td {
          border-bottom: none;
        }

        .qr-table tbody tr:hover {
          background: #f8fafc;
        }

        .qr-name-cell {
          font-weight: 600;
          color: #0f172a;
          white-space: nowrap;
        }

        .qr-muted-cell {
          color: #64748b;
          white-space: nowrap;
        }

        .qr-badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 999px;
          background: #eef0fe;
          color: #5138ee;
          font-size: 12px;
          font-weight: 600;
          white-space: nowrap;
        }

        .qr-cell-input,
        .qr-cell-select,
        .qr-cell-textarea {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }

        .qr-cell-input,
        .qr-cell-select {
          width: 100%;
          height: 36px;
          border: 1.5px solid #d8dee9;
          border-radius: 8px;
          padding: 0 10px;
          font-size: 13px;
          font-weight: 500;
          font-family: inherit;
          color: #1e293b;
          background: #f8fafc;
          outline: none;
          cursor: pointer;
          box-shadow: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
        }

        .qr-cell-input[type="number"],
        .qr-cell-input[type="date"] {
          cursor: text;
          font-weight: 400;
        }

        .qr-cell-select {
          padding-right: 30px;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6' fill='none'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%235a57fb' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
        }

        .qr-cell-input::-webkit-calendar-picker-indicator {
          cursor: pointer;
          opacity: 0.55;
        }

        .qr-cell-textarea {
          width: 100%;
          min-height: 36px;
          border: 1.5px solid #d8dee9;
          border-radius: 8px;
          padding: 8px 10px;
          font-size: 13px;
          color: #1e293b;
          background: #f8fafc;
          outline: none;
          resize: none;
          overflow: hidden;
          font-family: inherit;
          line-height: 1.4;
          cursor: text;
          transition: border-color 0.15s ease, box-shadow 0.15s ease, background 0.15s ease;
        }

        .qr-cell-input:hover:not(:disabled),
        .qr-cell-select:hover,
        .qr-cell-textarea:hover {
          border-color: #5a57fb;
          background: #fff;
        }

        .qr-cell-input:focus,
        .qr-cell-select:focus,
        .qr-cell-textarea:focus {
          border-color: #5a57fb;
          background: #fff;
          box-shadow: 0 0 0 3px rgba(90, 87, 251, 0.15);
        }

        .qr-cell-input:disabled,
        .qr-cell-select:disabled {
          background: #f1f5f9;
          border-color: #e2e8f0;
          color: #cbd5e1;
          cursor: not-allowed;
        }

        .qr-cell-input:disabled:hover,
        .qr-cell-select:disabled:hover {
          border-color: #e2e8f0;
          background: #f1f5f9;
        }

        .qr-cell-select option {
          color: #1e293b;
          font-weight: 400;
        }

        .qr-action-btn {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background: #fff;
          color: #5138ee;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.15s ease, border-color 0.15s ease;
        }

        .qr-action-btn:hover {
          background: #eef0fe;
          border-color: #c7ccfb;
        }

        .qr-empty-state {
          text-align: center;
          padding: 40px 16px;
          color: #94a3b8;
          font-size: 14px;
        }

        .qr-pagination {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          padding: 16px;
          border-top: 1px solid #f1f5f9;
        }

        .qr-circle-btn {
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

        .qr-circle-btn:hover:not(:disabled) {
          opacity: 0.9;
        }

        .qr-circle-btn:disabled {
          background: #e2e8f0;
          color: #94a3b8;
          cursor: not-allowed;
        }

        .qr-page-label {
          font-size: 13px;
          font-weight: 600;
          color: #475569;
        }

        @media (max-width: 640px) {
          .qr-filters {
            flex-direction: column;
            align-items: stretch;
          }

          .qr-field {
            min-width: 0;
          }
        }
      `}</style>
    </>
  );
}

QueryResponse.getLayout = function getLayout(page, pageProps) {
  return <DashboardLayout role={pageProps?.role}>{page}</DashboardLayout>;
};

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  const rawCookies = ctx.req.headers.cookie || "";
  const isLegacyAdmin = rawCookies.includes("admin_auth=true");

  if (!session && !isLegacyAdmin) {
    return { redirect: { destination: "/dashboard/login", permanent: false } };
  }

  const role = session ? session.user.role : "admin";

  return {
    props: { role },
  };
}
