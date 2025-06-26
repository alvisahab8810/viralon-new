import React, { useEffect, useState } from "react";
import Head from "next/head";
import Leftbar from "../../components/Leftbar";
import Dashnav from "../../components/Dashnav";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
export default function CareerResponse() {
  const [applications, setApplications] = useState([]);

  // for filter -------------------

  const [filteredApps, setFilteredApps] = useState([]);
  const [positions, setPositions] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [appliedPosition, setAppliedPosition] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  //   for pagination ------

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  //  delete api ------------------------------
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`/api/careers/delete/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.success) {
        setApplications((prev) => prev.filter((app) => app._id !== id));
      } else {
        alert("Failed to delete application");
      }
    } catch (error) {
      alert("Error deleting application");
    }
  };

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm to delete",

      message: "Are you sure you want to delete this response?",
      buttons: [
        {
          label: "Yes",
          onClick: () => handleDelete(id),
        },
        {
          label: "No",
          onClick: () => {}, // Do nothing on cancel
        },
      ],
    });
  };

  useEffect(() => {
    const fetchApplications = async () => {
      const res = await fetch("/api/careers/list");
      const data = await res.json();
      if (data.success) {
        setApplications(data.data);
        setFilteredApps(data.data);

        // Get unique positions for dropdown
        const uniquePositions = [
          ...new Set(data.data.map((app) => app.appliedPosition)),
        ];
        setPositions(uniquePositions);
      }
    };

    fetchApplications();
  }, []);

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
  return (
    <div className="main-nav">
      <Head>
        <link rel="stylesheet" href="/asets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/asets/css/main.css" />
      </Head>
      <Dashnav />
      <Leftbar />
      <section className="content home career-response">
        <div className="block-header">
          <div className="row ptb-50">
            <div className="col-lg-7 col-md-6 col-sm-12">
              <h2>
                Career Response
                <small className="text-muted">Welcome to Viralon</small>
              </h2>
            </div>
            <div className="col-lg-5 col-md-6 col-sm-12 text-end">
              <button
                className="btn btn-success btn-export"
                onClick={exportToExcel}
              >
                Export to Excel
              </button>
            </div>
          </div>

          <div className="filters row mb-3">
            <div className="col-md-3">
              <label>Search</label>
              <input
                type="text"
                className="form-control"
                placeholder="Search by name or email"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label>Applied For</label>
              <select
                className="form-control"
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

            <div className="col-md-3">
              <label>From Date</label>
              <input
                type="date"
                className="form-control"
                value={dateRange.from}
                onChange={(e) =>
                  setDateRange({ ...dateRange, from: e.target.value })
                }
              />
            </div>

            <div className="col-md-3">
              <label>To Date</label>
              <input
                type="date"
                className="form-control"
                value={dateRange.to}
                onChange={(e) =>
                  setDateRange({ ...dateRange, to: e.target.value })
                }
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Portfolio</th>
                  <th>Applied For</th>
                  <th>Resume</th>
                  <th>Applied On</th> {/* ✅ New column */}
                  {/* <th>Action</th> */}
                </tr>
              </thead>
              {/* <tbody>
                {applications
                  .slice(
                    (currentPage - 1) * rowsPerPage,
                    currentPage * rowsPerPage
                  )
                  .map((app) => (
                    <tr key={app._id}>
                      <td>{app.name}</td>
                      <td>{app.email}</td>
                      <td>{app.mobile}</td>
                      <td>
                        {app.portfolioLink ? (
                          <a
                            href={app.portfolioLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td>{app.appliedPosition}</td>
                      <td>
                        {app.resumePath ? (
                          <a
                            href={app.resumePath}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button className="download-btn btn btn-sm btn-primary">
                              Download <i class="zmdi zmdi-download"></i>
                            </button>
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>

                        <td>
                          {new Date(app.createdAt).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </td>

                      <td>
                        <button
                          className="btn-delete"
                          onClick={() => confirmDelete(app._id)}
                          title="Delete Application"
                        >
                          <i className="zmdi zmdi-delete"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody> */}

              <tbody>
                {filteredApps
                  .slice(
                    (currentPage - 1) * rowsPerPage,
                    currentPage * rowsPerPage
                  )
                  .map((app) => (
                    <tr key={app._id}>
                      <td>{app.name}</td>
                      <td>{app.email}</td>
                      <td>{app.mobile}</td>
                      <td>
                        {app.portfolioLink ? (
                          <a
                            href={app.portfolioLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View
                          </a>
                        ) : (
                          "—"
                        )}
                      </td>
                      <td>{app.appliedPosition}</td>
                      {/* <td>
                        {app.resumePath ? (
                          <a
                            href={app.resumePath}
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <button className="download-btn btn btn-sm btn-primary">
                              Download <i class="zmdi zmdi-download"></i>
                            </button>
                          </a>
                        ) : (
                          "—"
                        )}
                      </td> */}

                      <td>
                          {app.resumePath ? (
                            <a
                              href={encodeURI(app.resumePath)} // ✅ This encodes spaces as %20
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button className="download-btn btn btn-sm btn-primary">
                                Download <i className="zmdi zmdi-download"></i>
                              </button>
                            </a>
                          ) : (
                            "—"
                          )}
                        </td>

                      <td>
                        {new Date(app.createdAt).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </td>
                      <td>
                        {/* <button
                          className="btn-delete"
                          onClick={() => confirmDelete(app._id)}
                          title="Delete Application"
                        >
                          <i className="zmdi zmdi-delete"></i>
                        </button> */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            <div className="pagination-controls mt-3 d-flex justify-content-center align-items-center">
              <button
                className="circle-btn me-3circle-btn me-3"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <i className="zmdi zmdi-chevron-left"></i>
              </button>
              <span>
                Page {currentPage} of{" "}
                {Math.ceil(applications.length / rowsPerPage)}
              </span>
              <button
                className="circle-btn ms-3"
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(
                      prev + 1,
                      Math.ceil(applications.length / rowsPerPage)
                    )
                  )
                }
                disabled={
                  currentPage === Math.ceil(applications.length / rowsPerPage)
                }
              >
                <i className="zmdi zmdi-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
