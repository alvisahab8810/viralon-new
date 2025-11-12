"use client";

import { useEffect, useState, useMemo } from "react";

import Head from "next/head";
import Link from "next/link";
import Dashnav from "@/components/Dashnav";
import Leftbar from "@/components/Leftbar";
import { toast } from "react-toastify";

export default function LeaveAttendanceOverview() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [summary, setSummary] = useState({
    total: 0,
    checkedIn: 0,
    yetToCheckIn: 0,
    leaveTaken: 0,
  });
  const [pendingLeaves, setPendingLeaves] = useState([]);
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingHolidays, setLoadingHolidays] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch all data on load
  useEffect(() => {
    fetchAttendanceOverview();
    fetchPendingLeaves();
    fetchHolidays();
  }, []);

  /** ✅ Fetch Attendance Summary */
  const fetchAttendanceOverview = async () => {
    try {
      const res = await fetch("/api/payroll/attendance/overview");
      const data = await res.json();
      if (data.success) setSummary(data.summary);
    } catch (error) {
      console.error("Error fetching overview:", error);
    }
  };

  /** ✅ Fetch Pending Leaves */
  const fetchPendingLeaves = async () => {
    try {
      const res = await fetch("/api/payroll/leave/pending");
      const data = await res.json();
      if (data.success) setPendingLeaves(data.data);
    } catch (error) {
      console.error("Error fetching pending leaves:", error);
    }
  };

  /** ✅ Fetch Upcoming Holidays */
  const fetchHolidays = async () => {
    try {
      setLoadingHolidays(true);
      const res = await fetch("/api/payroll/holidays/upcoming");
      const data = await res.json();

      if (data.success) {
        setHolidays(data.data);
      } else {
        setError("Failed to load holidays.");
      }
    } catch (err) {
      console.error("Error fetching holidays:", err);
      setError("Something went wrong while fetching holidays.");
    } finally {
      setLoadingHolidays(false);
    }
  };

  useEffect(() => {
    fetchHolidays();
  }, []);

  /** ✅ Approve or Reject Leave */
  // const handleAction = async (leaveId, action) => {
  //   setLoading(true);
  //   try {
  //     const res = await fetch("/api/payroll/leave/action", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({ leaveId, action }),
  //     });

  //     const data = await res.json();
  //     if (data.success) {
  //       toast.success(`Leave ${action} successfully`);

  //       // ✅ Update status in UI without removing row
  //       setPendingLeaves((prev) =>
  //         prev.map((leave) =>
  //           leave._id === leaveId ? { ...leave, status: action } : leave
  //         )
  //       );
  //     } else {
  //       toast.error(data.message || "Action failed");
  //     }
  //   } catch (err) {
  //     console.error("Action error:", err);
  //     toast.error("Server error");
  //   }
  //   setLoading(false);
  // };

  const handleAction = async (leaveId, action) => {
    setLoading(true);
    try {
      const res = await fetch("/api/payroll/leave/action", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leaveId, action }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Leave marked as ${action}`);
        // ✅ Update state (only status changes, row stays)
        setPendingLeaves((prev) =>
          prev.map((leave) =>
            leave._id === leaveId ? { ...leave, status: action } : leave
          )
        );
      } else {
        toast.error(data.message || "Action failed");
      }
    } catch (err) {
      console.error("Action error:", err);
      toast.error("Server error");
    }
    setLoading(false);
  };

  const filteredLeaves = useMemo(() => {
    return pendingLeaves.filter((leave) => {
      const fullName = `${leave.employeeId?.firstName || ""} ${
        leave.employeeId?.lastName || ""
      }`.toLowerCase();
      const matchName = fullName.includes(search.toLowerCase());
      const matchStatus =
        statusFilter === "All" || leave.status === statusFilter;
      return matchName && matchStatus;
    });
  }, [pendingLeaves, search, statusFilter]);

  const totalPages = Math.ceil(filteredLeaves.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentLeaves = filteredLeaves.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);
  return (
    <div className="career-response add-employee">
      <Head>
        <link rel="stylesheet" href="/asets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/asets/css/main.css" />
        <link rel="stylesheet" href="/asets/css/admin.css" />
      </Head>

      <div className="main-nav">
        <Dashnav />
        <Leftbar />

        <section className="content home">
          <div className="block-header">
            <div className="row pt-50 pb-20">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>
                  Leave & Attendance Overview
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
                  <li className="breadcrumb-item active">
                    Leave & Attendance Overview
                  </li>
                </ul>
              </div>
            </div>

            {/* ✅ Attendance Summary */}
            <div className="container-emp mt-4">
              <div className="row">
                <div className="col-md-8">
                  <div className="card shadow-sm p-4 mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                      <h5 className="fw-bold mb-0">Attendance Summary</h5>
                      <span className="text-muted">
                        <i className="bi bi-calendar"></i> Today
                      </span>
                    </div>
                    <hr />
                    <p className="mb-2">
                      Total Employees: <strong>{summary.total}</strong>
                    </p>
                    <div className="progress mb-3" style={{ height: "8px" }}>
                      <div
                        className="progress-bar bg-success"
                        style={{
                          width: `${(summary.checkedIn / summary.total) * 100}%`,
                        }}
                      ></div>
                      <div
                        className="progress-bar bg-warning"
                        style={{
                          width: `${(summary.yetToCheckIn / summary.total) * 100}%`,
                        }}
                      ></div>
                      <div
                        className="progress-bar bg-danger"
                        style={{
                          width: `${(summary.leaveTaken / summary.total) * 100}%`,
                        }}
                      ></div>
                    </div>
                    <div className="d-flex justify-content-between small">
                      <span className="text-success">
                        Checked In: {summary.checkedIn}
                      </span>
                      <span className="text-warning">
                        Yet to Check-in: {summary.yetToCheckIn}
                      </span>
                      <span className="text-danger">
                        Leave Taken: {summary.leaveTaken}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ✅ Upcoming Holidays */}
                <div className="col-md-4 ">
                  <div className="card shadow border-0 rounded-4 p-4">
                    {/* Header */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-bold text-primary mb-0">
                        Upcoming Holidays ({new Date().getFullYear()})
                      </h5>
                      <span className="badge bg-light text-primary fw-semibold">
                        {holidays.length}
                      </span>
                    </div>

                    {/* Content */}
                    {loadingHolidays ? (
                      <div className="text-center py-4">
                        <div
                          className="spinner-border text-primary"
                          role="status"
                        ></div>
                        <p className="mt-2 text-muted small">
                          Loading holidays...
                        </p>
                      </div>
                    ) : error ? (
                      <p className="text-danger text-center">{error}</p>
                    ) : holidays.length === 0 ? (
                      <div className="text-center py-4">
                        <img
                          src="/no-holidays.png"
                          alt="No Holidays"
                          style={{ width: "90px", opacity: 0.8 }}
                        />
                        <p className="mt-2 text-muted">No holidays available</p>
                      </div>
                    ) : (
                      <ul className="list-group list-group-flush">
                        {holidays.slice(0, 5).map((holiday, idx) => {
                          const isToday =
                            new Date(holiday.date).toDateString() ===
                            new Date().toDateString();
                          return (
                            <li
                              key={idx}
                              className="list-group-item border-0 d-flex justify-content-between align-items-center px-0 py-3"
                              style={{
                                backgroundColor: isToday
                                  ? "#f1f8ff"
                                  : "transparent",
                                borderRadius: "8px",
                              }}
                            >
                              <div>
                                <h6 className="mb-0 fw-semibold text-dark">
                                  {holiday.name}
                                </h6>
                                {holiday.description && (
                                  <small className="text-muted">
                                    {holiday.description}
                                  </small>
                                )}
                              </div>
                              <span
                                className={`badge ${
                                  isToday
                                    ? "bg-primary text-white"
                                    : "bg-light text-dark border"
                                } px-3 py-2`}
                              >
                                {new Date(holiday.date).toLocaleDateString(
                                  "en-IN",
                                  {
                                    day: "numeric",
                                    month: "short",
                                  }
                                )}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    )}

                    {/* Footer Link */}
                    {holidays.length > 5 && (
                      <div className="text-center mt-3">
                        <a
                          href="/dashboard/admin/holidays"
                          className="text-primary fw-semibold text-decoration-none"
                        >
                          View All Holidays →
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="row">
                {/* ✅ Pending Requests */}

                <div className="col-md-12">
                  <div className="card shadow-sm p-4 mb-4">
                    {/* Header with Filters */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-semibold">Approval Requests</h5>
                      <div className="d-flex gap-2 filters-name">
                        {/* ✅ Search Filter */}
                        <input
                          type="text"
                          className="form-control form-control-sm"
                          placeholder="Search by name"
                          style={{ width: 200 }}
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                        />
                        {/* ✅ Status Filter */}
                        <select
                          className="form-select form-select-sm"
                          value={statusFilter}
                          onChange={(e) => setStatusFilter(e.target.value)}
                        >
                          <option value="All">All</option>
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                    </div>

                    {/* Table Section */}
                    {filteredLeaves.length === 0 ? (
                      <p className="text-center text-muted py-3">
                        No requests found
                      </p>
                    ) : (
                      <div
                        className="table-responsive"
                        style={{ overflowX: "auto" }}
                      >
                        <table className="table table-hover align-middle table-striped">
                          <thead className="table-light">
                            <tr>
                              <th>Employee</th>
                              <th>Type</th>
                              <th>From</th>
                              <th>To</th>
                              <th style={{ minWidth: "200px" }}>Reason</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {currentLeaves.map((leave, idx) => (
                              <tr key={idx}>
                                <td>
                                  <strong>
                                    {leave.employeeId
                                      ? `${leave.employeeId.firstName} ${leave.employeeId.lastName}`
                                      : "Unknown"}
                                  </strong>
                                </td>
                                <td>
                                  <span className="badge bg-info text-dark">
                                    {leave.type}
                                  </span>
                                </td>
                                <td>
                                  {new Date(leave.from).toLocaleDateString()}
                                </td>
                                <td>
                                  {new Date(leave.to).toLocaleDateString()}
                                </td>
                                <td>{leave.reason || "-"}</td>
                                <td>
                                  <span
                                    className={`badge ${
                                      leave.status === "Approved"
                                        ? "bg-success"
                                        : leave.status === "Rejected"
                                          ? "bg-danger"
                                          : "bg-warning text-dark"
                                    }`}
                                  >
                                    {leave.status}
                                  </span>
                                </td>
                                <td>
                                  <button
                                    className={`btn btn-success btn-sm me-2 ${
                                      leave.status === "Approved"
                                        ? "active"
                                        : ""
                                    }`}
                                    disabled={loading}
                                    onClick={() =>
                                      handleAction(leave._id, "Approved")
                                    }
                                  >
                                    {leave.status === "Approved"
                                      ? "✓ Approved"
                                      : "Approve"}
                                  </button>
                                  <button
                                    className={`btn btn-danger btn-sm ${
                                      leave.status === "Rejected"
                                        ? "active"
                                        : ""
                                    }`}
                                    disabled={loading}
                                    onClick={() =>
                                      handleAction(leave._id, "Rejected")
                                    }
                                  >
                                    {leave.status === "Rejected"
                                      ? "✗ Rejected"
                                      : "Reject"}
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* ✅ Pagination */}
                    {totalPages > 1 && (
                      <nav className="mt-3">
                        <ul className="pagination justify-content-center">
                          {Array.from({ length: totalPages }, (_, i) => (
                            <li
                              key={i}
                              className={`page-item ${
                                currentPage === i + 1 ? "active" : ""
                              }`}
                            >
                              <button
                                className="page-link"
                                onClick={() => handlePageChange(i + 1)}
                              >
                                {i + 1}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </nav>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
