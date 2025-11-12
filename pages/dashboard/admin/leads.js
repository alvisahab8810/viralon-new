// "use client";
// import React, { useEffect, useState } from "react";
// import Head from "next/head";
// import Dashnav from "@/components/Dashnav";
// import Leftbar from "@/components/Leftbar";
// import toast from "react-hot-toast";
// import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";

// export default function LeadsAdmin({ role }) {
//   const [leads, setLeads] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Filters
//   const [fromDate, setFromDate] = useState("");
//   const [toDate, setToDate] = useState("");
//   const [formTypeFilter, setFormTypeFilter] = useState("");

//   // Pagination
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 10;

//   useEffect(() => {
//     fetchLeads();
//   }, [formTypeFilter]);

//   const fetchLeads = async () => {
//     setLoading(true);
//     try {
//       const url = formTypeFilter
//         ? `/api/admin/getLeads?form=${formTypeFilter}`
//         : "/api/admin/getLeads";
//       const res = await fetch(url);
//       const data = await res.json();

//       if (data.success) {
//         setLeads(data.leads);
//       } else {
//         toast.error("Failed to fetch leads");
//       }
//     } catch (err) {
//       console.error("Error fetching leads:", err);
//       toast.error("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filter by date range
//   const filteredLeads = leads.filter((lead) => {
//     const createdAt = new Date(lead.createdAt);
//     const afterFromDate = !fromDate || createdAt >= new Date(fromDate);
//     const beforeToDate = !toDate || createdAt <= new Date(toDate);
//     return afterFromDate && beforeToDate;
//   });

//   // Pagination logic
//   const indexOfLast = currentPage * rowsPerPage;
//   const indexOfFirst = indexOfLast - rowsPerPage;
//   const currentLeads = filteredLeads.slice(indexOfFirst, indexOfLast);
//   const totalPages = Math.ceil(filteredLeads.length / rowsPerPage);

//   // Export Excel
//   const exportToExcel = () => {
//     if (filteredLeads.length === 0) {
//       toast.error("No leads to export");
//       return;
//     }

//     const exportData = filteredLeads.map((lead) => ({
//       "Form Name": lead.formName || lead.formIdentifier,
//       "Full Name": lead.fullName || lead.full_name || lead.fname || "—",
//       Email: lead.email || lead.email_address || lead.femail || "—",
//       Phone:
//         lead.mobileNumber || lead.phone_number || lead.fphone || "—",
//       "Business Name":
//         lead.businessName ||
//         lead.your_message ||
//         lead.fbusinessName ||
//         "—",
//       Date: new Date(lead.createdAt).toLocaleString("en-IN", {
//         dateStyle: "medium",
//         timeStyle: "short",
//       }),
//     }));

//     const worksheet = XLSX.utils.json_to_sheet(exportData);
//     const workbook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(workbook, worksheet, "Landing Leads");

//     const excelBuffer = XLSX.write(workbook, {
//       bookType: "xlsx",
//       type: "array",
//     });

//     const blob = new Blob([excelBuffer], {
//       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//     });

//     saveAs(blob, "landing_leads.xlsx");
//     toast.success("Leads exported successfully!");
//   };

//   const clearFilters = () => {
//     setFromDate("");
//     setToDate("");
//     setFormTypeFilter("");
//   };

//   return (
//     <div className="career-response">
//       <Head>
//         <title>Landing Leads</title>
//         <link rel="stylesheet" href="/asets/css/bootstrap.min.css" />
//         <link rel="stylesheet" href="/asets/css/main.css" />
//       </Head>

//       <div className="main-nav">
//         <Dashnav />
//         <Leftbar role={role} />

//         <section className="content home">
//           <div className="block-header">

//             <div className="row ptb-50">
//               <div className="col-lg-7 col-md-6 col-sm-12">
//                 <h2>
//                   Landing Leads
//                   <small className="text-muted">Welcome to Viralon Dashboard</small>
//                 </h2>
//               </div>
//               <div className="col-lg-5 col-md-6 col-sm-12 text-end">
//                 <button
//                   className="btn btn-success btn-export"
//                   onClick={exportToExcel}
//                 >
//                   Export to Excel
//                 </button>
//               </div>
//             </div>

//             {/* Filters Section */}
//             <div className="row mb-3 filters">
//               <div className="col-md-3">
//                 <label>From Date</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   value={fromDate}
//                   onChange={(e) => setFromDate(e.target.value)}
//                 />
//               </div>

//               <div className="col-md-3">
//                 <label>To Date</label>
//                 <input
//                   type="date"
//                   className="form-control"
//                   value={toDate}
//                   onChange={(e) => setToDate(e.target.value)}
//                 />
//               </div>

//               <div className="col-md-3">
//                 <label>Form Type</label>
//                 <select
//                   className="form-control"
//                   value={formTypeFilter}
//                   onChange={(e) => setFormTypeFilter(e.target.value)}
//                 >
//                   <option value="">All</option>
//                   <option value="form1">Query Form</option>
//                   <option value="form2">Contact Form</option>
//                   <option value="form3">Popup Form</option>
//                 </select>
//               </div>

//               <div className="filters-btns col-md-3 d-flex align-items-end">
//                 <button
//                   className="circle-btn"
//                   onClick={clearFilters}
//                   title="Clear Filters"
//                 >
//                   <i className="zmdi zmdi-refresh zmdi-hc-lg"></i>
//                 </button>
//               </div>
//             </div>

//             {/* Table Section */}
//             <div className="table-responsive-custom">
//               {loading ? (
//                 <p>Loading leads...</p>
//               ) : currentLeads.length === 0 ? (
//                 <p>No leads found.</p>
//               ) : (
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th>#</th>
//                       <th>Form Name</th>
//                       <th>Full Name</th>
//                       <th>Email</th>
//                       <th>Phone</th>
//                       <th>Business</th>
//                       <th>Date</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {currentLeads.map((lead, index) => (
//                       <tr key={lead._id}>
//                         <td>{index + 1}</td>
//                         <td>{lead.formName || lead.formIdentifier}</td>
//                         <td>
//                           {lead.fullName ||
//                             lead.full_name ||
//                             lead.fname ||
//                             "—"}
//                         </td>
//                         <td>
//                           {lead.email ||
//                             lead.email_address ||
//                             lead.femail ||
//                             "—"}
//                         </td>
//                         <td>
//                           {lead.mobileNumber ||
//                             lead.phone_number ||
//                             lead.fphone ||
//                             "—"}
//                         </td>
//                         <td>
//                           {lead.businessName ||
//                             lead.your_message ||
//                             lead.fbusinessName ||
//                             "—"}
//                         </td>
//                         <td>
//                           {new Date(lead.createdAt).toLocaleString("en-IN", {
//                             dateStyle: "medium",
//                             timeStyle: "short",
//                           })}
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               )}
//             </div>

//             {/* Pagination Controls */}
//             {totalPages > 1 && (
//               <div className="pagination-controls mt-3 d-flex justify-content-center align-items-center">
//                 <button
//                   className="circle-btn me-3"
//                   onClick={() =>
//                     setCurrentPage((prev) => Math.max(prev - 1, 1))
//                   }
//                   disabled={currentPage === 1}
//                 >
//                   <i className="zmdi zmdi-chevron-left"></i>
//                 </button>
//                 <span>
//                   Page {currentPage} of {totalPages}
//                 </span>
//                 <button
//                   className="circle-btn ms-3"
//                   onClick={() =>
//                     setCurrentPage((prev) =>
//                       Math.min(prev + 1, totalPages)
//                     )
//                   }
//                   disabled={currentPage === totalPages}
//                 >
//                   <i className="zmdi zmdi-chevron-right"></i>
//                 </button>
//               </div>
//             )}
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }






"use client";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import Dashnav from "@/components/Dashnav";
import Leftbar from "@/components/Leftbar";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function LeadsAdmin({ role }) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [formTypeFilter, setFormTypeFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    fetchLeads();
  }, [formTypeFilter]);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const url = formTypeFilter
        ? `/api/admin/getLeads?form=${formTypeFilter}`
        : "/api/admin/getLeads";
      const res = await fetch(url);
      const data = await res.json();

      if (data.success) {
        setLeads(data.leads);
      } else {
        toast.error("Failed to fetch leads");
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
      toast.error("Server error");
    } finally {
      setLoading(false);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    const createdAt = new Date(lead.createdAt);
    const afterFromDate = !fromDate || createdAt >= new Date(fromDate);
    const beforeToDate = !toDate || createdAt <= new Date(toDate);
    return afterFromDate && beforeToDate;
  });

  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredLeads.length / rowsPerPage);

  const clearFilters = () => {
    setFromDate("");
    setToDate("");
    setFormTypeFilter("");
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  // ✅ Export to Excel (with country_code)
  const exportToExcel = () => {
    if (filteredLeads.length === 0) {
      toast.error("No leads to export");
      return;
    }

    const exportData = filteredLeads.map((lead) => ({
     
      "Full Name": lead.fullName || lead.full_name || lead.fname || "—",
      
      Email: lead.email || lead.email_address || lead.femail || "—",
      "Country Code": lead.country_code || "—",
      Phone:
        lead.mobileNumber || lead.phone_number || lead.fphone || "—",
      "Business Name":
        lead.businessName ||
        lead.your_message ||
        lead.fbusinessName ||
        "—",
      Date: formatDate(lead.createdAt),

       "Form Name": lead.formName || lead.formIdentifier,
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Landing Leads");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(blob, "landing_leads.xlsx");
    toast.success("Leads exported successfully!");
  };

  return (
    <div className="career-response">
      <Head>
        <title>Landing Leads</title>
        <link rel="stylesheet" href="/asets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/asets/css/main.css" />
      </Head>

      <div className="main-nav">
        <Dashnav />
        <Leftbar role={role} />

        <section className="content home">
          <div className="block-header">

            <div className="row ptb-50">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>
                  Landing Leads
                  <small className="text-muted">
                    Welcome to Viralon Dashboard
                  </small>
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

            {/* Filters */}
            <div className="row mb-3 filters">
              <div className="col-md-3">
                <label>From Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <label>To Date</label>
                <input
                  type="date"
                  className="form-control"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                />
              </div>

              <div className="col-md-3">
                <label>Form Type</label>
                <select
                  className="form-control"
                  value={formTypeFilter}
                  onChange={(e) => setFormTypeFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="form1">Query Form</option>
                  <option value="form2">Contact Form</option>
                  <option value="form3">Popup Form</option>
                </select>
              </div>

              <div className="filters-btns col-md-3 d-flex align-items-end">
                <button
                  className="circle-btn"
                  onClick={clearFilters}
                  title="Clear Filters"
                >
                  <i className="zmdi zmdi-refresh zmdi-hc-lg"></i>
                </button>
              </div>
            </div>

            {/* ✅ Table with Country Code */}
            <div className="table-responsive-custom">
              {loading ? (
                <p>Loading leads...</p>
              ) : currentLeads.length === 0 ? (
                <p>No leads found.</p>
              ) : (
                <table className="table">
                  <thead>
                    <tr>
                      <th>#</th>
                     
                      <th>Full Name</th>
                      
                      <th>Email</th>
                      <th>Country Code</th>
                      <th>Phone</th>
                      <th>Business</th>
                      <th>Date</th>
                       <th>Form Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentLeads.map((lead, index) => (
                      <tr key={lead._id}>
                        <td>{index + 1}</td>
                       
                        <td>
                          {lead.fullName ||
                            lead.full_name ||
                            lead.fname ||
                            "—"}
                        </td>
                       
                        <td>
                          {lead.email ||
                            lead.email_address ||
                            lead.femail ||
                            "—"}
                        </td>

                         <td>+{lead.country_code || "—"}</td>
                        <td>
                          {lead.mobileNumber ||
                            lead.phone_number ||
                            lead.fphone ||
                            "—"}
                        </td>
                        <td>
                          {lead.businessName ||
                            lead.your_message ||
                            lead.fbusinessName ||
                            "—"}
                        </td>
                        <td>{formatDate(lead.createdAt)}</td>

                         <td>{lead.formName || lead.formIdentifier}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination-controls mt-3 d-flex justify-content-center align-items-center">
                <button
                  className="circle-btn me-3"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  <i className="zmdi zmdi-chevron-left"></i>
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  className="circle-btn ms-3"
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages}
                >
                  <i className="zmdi zmdi-chevron-right"></i>
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
