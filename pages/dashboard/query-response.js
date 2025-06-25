// import { getSession } from "next-auth/react";   // (put with your other imports)

//   import React from "react";
//   import Link from "next/link";
//   import Dashnav from "../../components/Dashnav";
//   import Leftbar from "../../components/Leftbar";
//   import Head from "next/head";
//   import { useEffect, useState } from "react";

//   import { confirmAlert } from "react-confirm-alert";
//   import "react-confirm-alert/src/react-confirm-alert.css";
//   import { toast } from "react-toastify";

//   import * as XLSX from "xlsx";
//   import { saveAs } from "file-saver";
//   import { useRouter } from "next/router";

//   // export default function QueryResponse() {
//   export default function QueryResponse({ role }) {

//   const router = useRouter(); // make sure this is inside your component

//     const [loading, setLoading] = useState(true);

//     const [contactData, setContactData] = useState([]);
//     // ------------- for custom fields-------
//     // const [newColumnName, setNewColumnName] = useState("");

//     const [customFieldData, setCustomFieldData] = useState({});

//     // for resizing column----------

//     const [columnWidths, setColumnWidths] = useState({});
//     const userId = "some-unique-id"; // Could be from user auth, or a generated session id

//     // Fetch saved widths
//     useEffect(() => {
//       async function fetchWidths() {
//         const res = await fetch(`/api/queries/column-width-get?userId=${userId}`);
//         if (res.ok) {
//           const data = await res.json();
//           if (data.widths) {
//             setColumnWidths(data.widths);
//           }
//         }
//       }
//       fetchWidths();
//     }, []);

//     async function saveWidths(newWidths) {
//       await fetch("/api/queries/column-width-save", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ userId, widths: newWidths }),
//       });
//     }

//     function initResize(e, columnId) {
//       e.preventDefault();
//       const startX = e.clientX;
//       const startWidth = columnWidths[columnId] || 120;

//       function onMouseMove(e) {
//         const newWidth = Math.max(startWidth + e.clientX - startX, 50);
//         setColumnWidths((prev) => {
//           const updated = { ...prev, [columnId]: newWidth };
//           saveWidths(updated);
//           return updated;
//         });
//       }

//       function onMouseUp() {
//         window.removeEventListener("mousemove", onMouseMove);
//         window.removeEventListener("mouseup", onMouseUp);
//       }

//       window.addEventListener("mousemove", onMouseMove);
//       window.addEventListener("mouseup", onMouseUp);
//     }

//     const [customFields, setCustomFields] = useState([
//       "First contact date",
//       "Connect counts",
//       "Requirement meet", // Dropdown
//       "Requirement Meet date",
//       "Contacted by",
//       "Lead Level", // Dropdown
//       "Requirement brief",
//       "Proposal sent",
//       "Proposal date",
//       "Objections",
//       "Revised proposal date",
//       "Decision date",
//       "Status", // Dropdown
//       "Reason (if lost)",
//       "Final status", // Dropdown
//     ]);

//     useEffect(() => {
//       const fetchData = async () => {
//         const res = await fetch("/api/queries/getCustomFields");
//         const data = await res.json();
//         setCustomFieldData(data);
//       };

//       fetchData();
//     }, []);

//     const handleSave = async (updatedRow) => {
//       try {
//         const res = await fetch("/api/queries/saveCustomFields", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(updatedRow),
//         });

//         const result = await res.json();
//         console.log("Auto-saved:", result.message);
//       } catch (error) {
//         console.error("Auto-save failed:", error);
//       }
//     };

//     //  for filters ----------------
//     const [fromDate, setFromDate] = useState("");
//     const [toDate, setToDate] = useState("");
//     const [formTypeFilter, setFormTypeFilter] = useState("");

//     const [queries, setQueries] = useState([]);

//     //   for pagination ------
//     const [currentPage, setCurrentPage] = useState(1);
//     const rowsPerPage = 10;

//     useEffect(() => {
//       const fetchAllResponses = async () => {
//         try {
//           const [queryRes, contactRes] = await Promise.all([
//             fetch("/api/queries/query"),
//             fetch("/api/queries/contact"),
//           ]);

//           const queryData = await queryRes.json();
//           const contactData = await contactRes.json();

//           const formattedQueries = queryData.success
//             ? queryData.data.map((item) => ({
//                 ...item,
//                 formType: "Query",
//                 businessName: item.businessName || "-", // already present
//               }))
//             : [];

//           const formattedContacts = contactData.success
//             ? contactData.data.map((item) => ({
//                 _id: item._id,
//                 name: item.name,
//                 email: item.email,
//                 phone: item.phone || "-",
//                 businessName: item.businessName,
//                 createdAt: item.createdAt,
//                 formType: "Contact", // so your table shows "Contact"
//               }))
//             : [];

//           const combined = [...formattedQueries, ...formattedContacts].sort(
//             (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
//           );

//           setQueries(combined);
//         } catch (error) {
//           console.error("Error fetching responses", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       fetchAllResponses();
//     }, []);

//     const confirmDelete = (id, formType) => {
//       confirmAlert({
//         title: "Confirm Delete",
//         message: `Are you sure you want to delete this ${formType === "Contact" ? "contact" : "query"}?`,
//         buttons: [
//           {
//             label: "Yes",
//             onClick: async () => {
//               const endpoint =
//                 formType === "Contact"
//                   ? `/api/queries/delete/contact?id=${id}`
//                   : `/api/queries/delete/query?id=${id}`;

//               try {
//                 const res = await fetch(endpoint, {
//                   method: "DELETE",
//                 });
//                 const data = await res.json();

//                 if (data.success) {
//                   toast.success(`${formType} deleted successfully.`);
//                   setQueries((prev) => prev.filter((q) => q._id !== id));
//                 } else {
//                   toast.error(
//                     `Failed to delete ${formType.toLowerCase()}. Please try again.`
//                   );
//                 }
//               } catch (err) {
//                 console.error(`Error deleting ${formType}:`, err);
//                 toast.error("Server error during deletion.");
//               }
//             },
//           },
//           {
//             label: "No",
//             onClick: () => {
//               toast.info("Deletion cancelled.");
//             },
//           },
//         ],
//       });
//     };

//     //   ---------- for export excell----------

//     const exportToExcel = () => {
//       const exportData = queries.map((q) => ({
//         Name: q.name,
//         Email: q.email,
//         Phone: q.phone,
//         Business: q.businessName || "—",
//         "Form Type": q.formType || "Query Form",
//         "Submitted On": new Date(q.createdAt).toLocaleString("en-IN", {
//           dateStyle: "medium",
//           timeStyle: "short",
//         }),
//       }));

//       const worksheet = XLSX.utils.json_to_sheet(exportData);
//       const workbook = XLSX.utils.book_new();
//       XLSX.utils.book_append_sheet(workbook, worksheet, "Query Responses");

//       const excelBuffer = XLSX.write(workbook, {
//         bookType: "xlsx",
//         type: "array",
//       });

//       const blob = new Blob([excelBuffer], {
//         type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
//       });

//       saveAs(blob, "query_responses.xlsx");
//     };

//     // ----------------- for filters ----------

//     const filteredQueries = queries.filter((q) => {
//       const createdAt = new Date(q.createdAt);
//       const matchesDate =
//         (!fromDate || new Date(fromDate) <= createdAt) &&
//         (!toDate || new Date(toDate) >= createdAt);

//       const matchesFormType =
//         !formTypeFilter || q.formType?.toLowerCase() === formTypeFilter;

//       return matchesDate && matchesFormType;
//     });

//     // ============== for convert client ====================

//     const handleConvertToClient = (queryData) => {
//       // Pass queryData to form page via URL query params
//       router.push({
//         pathname: "/dashboard/sales/customers/new-customer",
//         query: {
//           name: queryData.name || "",
//           email: queryData.email || "",
//           phone: queryData.phone || "",
//           businessName: queryData.businessName || "",
//         },
//       });
//     };

//     return (
//       <div className="career-response">
//         <Head>
//           <link rel="stylesheet" href="/asets/css/bootstrap.min.css" />
//           <link rel="stylesheet" href="/asets/css/main.css" />
//         </Head>

//         <div className="main-nav">
//           <Dashnav />
//           {/* <Leftbar /> */}

//           <Leftbar role={role} />
//           <section className="content home">
//             <div className="block-header">
//               <div className="row ptb-50">
//                 <div className="col-lg-7 col-md-6 col-sm-12">
//                   <h2>
//                     Query Response
//                     <small className="text-muted">Welcome to Viralon</small>
//                   </h2>
//                 </div>
//                 <div className="col-lg-5 col-md-6 col-sm-12 text-end">
//                   <button
//                     className="btn btn-success btn-export"
//                     onClick={exportToExcel}
//                   >
//                     Export to Excel
//                   </button>
//                 </div>
//               </div>

//               <div className="row mb-3 filters">
//                 <div className="col-md-3">
//                   <label>From Date</label>
//                   <input
//                     type="date"
//                     className="form-control"
//                     value={fromDate}
//                     onChange={(e) => setFromDate(e.target.value)}
//                   />
//                 </div>

//                 <div className="col-md-3">
//                   <label>To Date</label>
//                   <input
//                     type="date"
//                     className="form-control"
//                     value={toDate}
//                     onChange={(e) => setToDate(e.target.value)}
//                   />
//                 </div>

//                 <div className="col-md-3">
//                   <label>Form Type</label>
//                   <select
//                     className="form-control"
//                     value={formTypeFilter}
//                     onChange={(e) => setFormTypeFilter(e.target.value)}
//                   >
//                     <option value="">All</option>
//                     <option value="query">Query Form</option>
//                     <option value="contact">Contact Form</option>

//                     {/* Add other form types as needed */}
//                   </select>
//                 </div>

//                 <div className="filters-btns col-md-3 d-flex align-items-end">
//                   <button
//                     className="circle-btn"
//                     onClick={() => {
//                       setFromDate("");
//                       setToDate("");
//                       setFormTypeFilter("");
//                     }}
//                     title="Clear Filters"
//                   >
//                     <i className="zmdi zmdi-refresh zmdi-hc-lg"></i>
//                   </button>
//                 </div>
//               </div>
//               <div className="table-responsive-custom">
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th>Name</th>
//                       <th>Email</th>
//                       <th>Phone</th>
//                       <th>Business</th>
//                       <th>Date</th>
//                       <th>Form Type</th>

//                       {customFields.map((field) => (
//                         <th
//                           key={field}
//                           style={{
//                             position: "relative",
//                             minWidth: columnWidths[field] || 120,
//                             width: columnWidths[field] || 120,
//                           }}
//                         >
//                           {field}
//                           <div
//                             style={{
//                               position: "absolute",
//                               right: 0,
//                               top: 0,
//                               height: "100%",
//                               width: "5px",
//                               cursor: "col-resize",
//                               userSelect: "none",
//                             }}
//                             onMouseDown={(e) => initResize(e, field)}
//                           />
//                         </th>
//                       ))}

//                       <th>Action</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {filteredQueries
//                       .slice(
//                         (currentPage - 1) * rowsPerPage,
//                         currentPage * rowsPerPage
//                       )
//                       .map((q) => (
//                         <tr key={q._id}>
//                           <td>{q.name}</td>
//                           <td>{q.email}</td>
//                           <td>{q.phone}</td>
//                           <td>{q.businessName}</td>
//                           <td>
//                             {new Date(q.createdAt).toLocaleString("en-IN", {
//                               dateStyle: "medium",
//                               timeStyle: "short",
//                             })}
//                           </td>
//                           <td>
//                             {q.formType && q.formType.toLowerCase() === "query"
//                               ? "Query Form"
//                               : q.formType}
//                           </td>

//                           {/* {customFields.map((field) => (
//                             <td key={field}>
//                               {[
//                                 "Requirement meet",
//                                 "Lead Level",
//                                 "Status",
//                                 "Final status",
//                               ].includes(field) ? (
//                                 <select
//                                   className="form-select"
//                                   value={customFieldData[q._id]?.[field] || ""}
//                                   onChange={(e) => {
//                                     const updated = { ...customFieldData };
//                                     if (!updated[q._id]) updated[q._id] = {};
//                                     updated[q._id][field] = e.target.value;
//                                     setCustomFieldData(updated);
//                                     handleSave({ [q._id]: updated[q._id] });
//                                   }}
//                                 >
//                                   <option value="">Select</option>
//                                   {field === "Requirement meet" &&
//                                     ["G Meet", "Personal Meet", "Calls"].map(
//                                       (opt) => <option key={opt}>{opt}</option>
//                                     )}
//                                   {field === "Lead Level" &&
//                                     ["Hot", "Warm", "Cold"].map((opt) => (
//                                       <option key={opt}>{opt}</option>
//                                     ))}
//                                   {field === "Status" &&
//                                     ["Won", "Lost"].map((opt) => (
//                                       <option key={opt}>{opt}</option>
//                                     ))}
//                                   {field === "Final status" &&
//                                     [
//                                       "Closed",
//                                       "Contact after week",
//                                       "Contact after 3 months",
//                                       "Contact after 6 months",
//                                     ].map((opt) => (
//                                       <option key={opt}>{opt}</option>
//                                     ))}
//                                 </select>
//                               ) : (
//                                 <textarea
//                                   className="form-control resize-none overflow-hidden"
//                                   style={{
//                                     width: "100%",
//                                     minHeight: "32px",
//                                     lineHeight: "1.5",
//                                     padding: "6px 10px",
//                                   }}
//                                   rows={1}
//                                   value={customFieldData[q._id]?.[field] || ""}
//                                   onChange={(e) => {
//                                     const updated = { ...customFieldData };
//                                     if (!updated[q._id]) updated[q._id] = {};
//                                     updated[q._id][field] = e.target.value;
//                                     setCustomFieldData(updated);

//                                     // Auto-expand height
//                                     e.target.style.height = "auto";
//                                     e.target.style.height =
//                                       e.target.scrollHeight + "px";

//                                     // Auto-save this row’s update
//                                     handleSave({ [q._id]: updated[q._id] });
//                                   }}
//                                   onInput={(e) => {
//                                     e.target.style.height = "auto";
//                                     e.target.style.height =
//                                       e.target.scrollHeight + "px";
//                                   }}
//                                 />
//                               )}
//                             </td>
//                           ))} */}

//                           {customFields.map((field) => (
//                             <td key={field}>
//                               {[
//                                 "Requirement meet",
//                                 "Lead Level",
//                                 "Status",
//                                 "Final status",
//                               ].includes(field) ? (
//                                 <select
//                                   className="form-select"
//                                   value={customFieldData[q._id]?.[field] || ""}
//                                   onChange={(e) => {
//                                     const updated = { ...customFieldData };
//                                     if (!updated[q._id]) updated[q._id] = {};
//                                     updated[q._id][field] = e.target.value;
//                                     setCustomFieldData(updated);
//                                     handleSave({ [q._id]: updated[q._id] });
//                                   }}
//                                 >
//                                   <option value="">Select</option>
//                                   {field === "Requirement meet" &&
//                                     ["G Meet", "Personal Meet", "Calls"].map(
//                                       (opt) => <option key={opt}>{opt}</option>
//                                     )}
//                                   {field === "Lead Level" &&
//                                     ["Hot", "Warm", "Cold"].map((opt) => (
//                                       <option key={opt}>{opt}</option>
//                                     ))}
//                                   {field === "Status" &&
//                                     ["Won", "Lost"].map((opt) => (
//                                       <option key={opt}>{opt}</option>
//                                     ))}
//                                   {field === "Final status" &&
//                                     [
//                                       "Closed",
//                                       "Contact after week",
//                                       "Contact after 3 months",
//                                       "Contact after 6 months",
//                                     ].map((opt) => (
//                                       <option key={opt}>{opt}</option>
//                                     ))}
//                                 </select>
//                               ) : [
//                                   "First contact date",
//                                   "Proposal date",
//                                   "Revised proposal date",
//                                   "Decision date",
//                                   "Requirement Meet date", // ✅ Include it here
//                                 ].includes(field) ? (
//                                 <input
//                                   type="date"
//                                   className="form-control"
//                                   value={customFieldData[q._id]?.[field] || ""}
//                                   onChange={(e) => {
//                                     const updated = { ...customFieldData };
//                                     if (!updated[q._id]) updated[q._id] = {};
//                                     updated[q._id][field] = e.target.value;
//                                     setCustomFieldData(updated);
//                                     handleSave({ [q._id]: updated[q._id] });
//                                   }}
//                                 />
//                               ) : (
//                                 <textarea
//                                   className="form-control resize-none overflow-hidden"
//                                   style={{
//                                     width: "100%",
//                                     minHeight: "32px",
//                                     lineHeight: "1.5",
//                                     padding: "6px 10px",
//                                   }}
//                                   rows={1}
//                                   value={customFieldData[q._id]?.[field] || ""}
//                                   onChange={(e) => {
//                                     const updated = { ...customFieldData };
//                                     if (!updated[q._id]) updated[q._id] = {};
//                                     updated[q._id][field] = e.target.value;
//                                     setCustomFieldData(updated);

//                                     e.target.style.height = "auto";
//                                     e.target.style.height =
//                                       e.target.scrollHeight + "px";

//                                     handleSave({ [q._id]: updated[q._id] });
//                                   }}
//                                   onInput={(e) => {
//                                     e.target.style.height = "auto";
//                                     e.target.style.height =
//                                       e.target.scrollHeight + "px";
//                                   }}
//                                 />
//                               )}
//                             </td>
//                           ))}

//                           <td className="d-flex">
//                             {/* <button
//                               className="btn-delete"

//                               onClick={() => confirmDelete(q._id, q.formType)}
//                               title="Delete Query"
//                             >
//                               <i className="zmdi zmdi-delete"></i>
//                             </button> */}

//                             <button
//                               onClick={() => handleConvertToClient(q)}
//                               className="btn-delete "
//                               title="Convert to Client"
//                             >
//                               <i className="zmdi zmdi-account-add"></i>
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                   </tbody>
//                 </table>
//               </div>

//               <div className="pagination-controls mt-3 d-flex justify-content-center align-items-center">
//                 <button
//                   className="circle-btn me-3"
//                   onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                   disabled={currentPage === 1}
//                 >
//                   <i className="zmdi zmdi-chevron-left"></i>
//                 </button>
//                 <span>
//                   Page {currentPage} of{" "}
//                   {Math.ceil(filteredQueries.length / rowsPerPage)}
//                 </span>
//                 <button
//                   className="circle-btn ms-3"
//                   onClick={() =>
//                     setCurrentPage((prev) =>
//                       Math.min(prev + 1, Math.ceil(queries.length / rowsPerPage))
//                     )
//                   }
//                   disabled={
//                     currentPage === Math.ceil(queries.length / rowsPerPage)
//                   }
//                 >
//                   <i className="zmdi zmdi-chevron-right"></i>
//                 </button>
//               </div>
//             </div>
//           </section>
//         </div>
//       </div>
//     );
//   }

//   export async function getServerSideProps(ctx) {
//   const session = await getSession(ctx);

//   /* ---------- 1 Allow legacy‑admin cookie ---------- */
//   const rawCookies = ctx.req.headers.cookie || "";
//   const isLegacyAdmin = rawCookies.includes("admin_auth=true");

//   if (!session && !isLegacyAdmin) {
//     // neither NextAuth session nor admin cookie → send to login
//     return { redirect: { destination: "/login", permanent: false } };
//   }

//   /* ---------- 2 Return a role for the component ---------- */
//   const role = session ? session.user.role : "admin"; // legacy admin

//   return {
//     props: { role },     // "admin" or "salesperson"
//   };
// }

import { getSession } from "next-auth/react"; // (put with your other imports)

import React from "react";
import Link from "next/link";
import Dashnav from "../../components/Dashnav";
import Leftbar from "../../components/Leftbar";
import Head from "next/head";
import { useEffect, useState } from "react";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { useRouter } from "next/router";
import ReminderNotifications from "@/components/ReminderNotifications";

// export default function QueryResponse() {
export default function QueryResponse({ role }) {
  const [salespeople, setSalespeople] = useState([]);

  useEffect(() => {
    fetch("/api/admin/salespeople") // reuse existing endpoint
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => setSalespeople(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  const router = useRouter(); // make sure this is inside your component

  const [loading, setLoading] = useState(true);

  const [contactData, setContactData] = useState([]);
  // ------------- for custom fields-------
  // const [newColumnName, setNewColumnName] = useState("");

  const [customFieldData, setCustomFieldData] = useState({});

  // for resizing column----------

  const [columnWidths, setColumnWidths] = useState({});
  const userId = "some-unique-id"; // Could be from user auth, or a generated session id

  // Fetch saved widths
  useEffect(() => {
    async function fetchWidths() {
      const res = await fetch(`/api/queries/column-width-get?userId=${userId}`);
      if (res.ok) {
        const data = await res.json();
        if (data.widths) {
          setColumnWidths(data.widths);
        }
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
    const startWidth = columnWidths[columnId] || 120;

    function onMouseMove(e) {
      const newWidth = Math.max(startWidth + e.clientX - startX, 50);
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

  const [customFields, setCustomFields] = useState([
    "First contact date",
    "Connect counts",
    "Requirement meet", // Dropdown
    "Requirement Meet date",
    "Contacted by",
    "Lead Level", // Dropdown
    "Requirement brief",
    "Proposal sent",
    "Proposal date",
    "Objections",
    "Revised proposal date",
    "Decision date",
    "Status", // Dropdown
    "Deal Amount", // ✅ NEW FIELD
    "Reason (if lost)",
    "Final status", // Dropdown
  ]);

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

  //  for filters ----------------
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [formTypeFilter, setFormTypeFilter] = useState("");

  const [queries, setQueries] = useState([]);

  //   for pagination ------
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchAllResponses = async () => {
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
              businessName: item.businessName || "-", // already present
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
              formType: "Contact", // so your table shows "Contact"
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
      }
    };

    fetchAllResponses();
  }, []);

  const confirmDelete = (id, formType) => {
    confirmAlert({
      title: "Confirm Delete",
      message: `Are you sure you want to delete this ${formType === "Contact" ? "contact" : "query"}?`,
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const endpoint =
              formType === "Contact"
                ? `/api/queries/delete/contact?id=${id}`
                : `/api/queries/delete/query?id=${id}`;

            try {
              const res = await fetch(endpoint, {
                method: "DELETE",
              });
              const data = await res.json();

              if (data.success) {
                toast.success(`${formType} deleted successfully.`);
                setQueries((prev) => prev.filter((q) => q._id !== id));
              } else {
                toast.error(
                  `Failed to delete ${formType.toLowerCase()}. Please try again.`
                );
              }
            } catch (err) {
              console.error(`Error deleting ${formType}:`, err);
              toast.error("Server error during deletion.");
            }
          },
        },
        {
          label: "No",
          onClick: () => {
            toast.info("Deletion cancelled.");
          },
        },
      ],
    });
  };

  //   ---------- for export excell----------

  const exportToExcel = () => {
    const exportData = queries.map((q) => ({
      Name: q.name,
      Email: q.email,
      Phone: q.phone,
      Business: q.businessName || "—",
      "Form Type": q.formType || "Query Form",
      "Submitted On": new Date(q.createdAt).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
    }));

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Query Responses");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

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

    const matchesFormType =
      !formTypeFilter || q.formType?.toLowerCase() === formTypeFilter;

    return matchesDate && matchesFormType;
  });

  // ============== for convert client ====================

  const handleConvertToClient = (queryData) => {
    // Pass queryData to form page via URL query params
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

  return (
    <div className="career-response">
      <Head>
        <link rel="stylesheet" href="/asets/css/bootstrap.min.css" />
        <link rel="stylesheet" href="/asets/css/main.css" />
      </Head>

      <div className="main-nav">
        <Dashnav />
        {/* <Leftbar /> */}

        <Leftbar role={role} />
        <section className="content home">
          <div className="block-header">
            {/* Show notifications */}
            <ReminderNotifications />
            <div className="row ptb-50">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>
                  Query Response
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
                  <option value="query">Query Form</option>
                  <option value="contact">Contact Form</option>

                  {/* Add other form types as needed */}
                </select>
              </div>

              <div className="filters-btns col-md-3 d-flex align-items-end">
                <button
                  className="circle-btn"
                  onClick={() => {
                    setFromDate("");
                    setToDate("");
                    setFormTypeFilter("");
                  }}
                  title="Clear Filters"
                >
                  <i className="zmdi zmdi-refresh zmdi-hc-lg"></i>
                </button>
              </div>
            </div>
            <div className="table-responsive-custom">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Business</th>
                    <th>Date</th>
                    <th>Form Type</th>

                    {customFields.map((field) => (
                      <th
                        key={field}
                        style={{
                          position: "relative",
                          minWidth: columnWidths[field] || 120,
                          width: columnWidths[field] || 120,
                        }}
                      >
                        {field}
                        <div
                          style={{
                            position: "absolute",
                            right: 0,
                            top: 0,
                            height: "100%",
                            width: "5px",
                            cursor: "col-resize",
                            userSelect: "none",
                          }}
                          onMouseDown={(e) => initResize(e, field)}
                        />
                      </th>
                    ))}

                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQueries
                    .slice(
                      (currentPage - 1) * rowsPerPage,
                      currentPage * rowsPerPage
                    )
                    .map((q) => (
                      <tr key={q._id}>
                        <td>{q.name}</td>
                        <td>{q.email}</td>
                        <td>{q.phone}</td>
                        <td>{q.businessName}</td>
                        <td>
                          {new Date(q.createdAt).toLocaleString("en-IN", {
                            dateStyle: "medium",
                            timeStyle: "short",
                          })}
                        </td>
                        <td>
                          {q.formType && q.formType.toLowerCase() === "query"
                            ? "Query Form"
                            : q.formType}
                        </td>

                        {/* {customFields.map((field) => (
                          <td key={field}>
                            {[
                              "Requirement meet",
                              "Lead Level",
                              "Status",
                              "Final status",
                              "Contacted by", 
                            ].includes(field) ? (
                              <select
                                className="form-select"
                                value={customFieldData[q._id]?.[field] || ""}
                                onChange={(e) => {
                                  const updated = { ...customFieldData };
                                  if (!updated[q._id]) updated[q._id] = {};
                                  updated[q._id][field] = e.target.value;
                                  setCustomFieldData(updated);
                                  handleSave({ [q._id]: updated[q._id] });
                                }}
                              >
                                <option value="">Select</option>

                              
                                {field === "Requirement meet" &&
                                  ["G Meet", "Personal Meet", "Calls"].map(
                                    (opt) => <option key={opt}>{opt}</option>
                                  )}

                                {field === "Lead Level" &&
                                  ["Hot", "Warm", "Cold"].map((opt) => (
                                    <option key={opt}>{opt}</option>
                                  ))}

                                {field === "Status" &&
                                  ["Won", "Lost"].map((opt) => (
                                    <option key={opt}>{opt}</option>
                                  ))}

                                {field === "Final status" &&
                                  [
                                    "Closed",
                                    "Contact after week",
                                    "Contact after 3 months",
                                    "Contact after 6 months",
                                  ].map((opt) => (
                                    <option key={opt}>{opt}</option>
                                  ))}

                               
                                {field === "Contacted by" &&
                                  salespeople.map((rep) => (
                                    <option key={rep._id} value={rep._id}>
                                      {rep.name}
                                    </option>
                                  ))}
                              </select>
                            ) : [
                                "First contact date",
                                "Proposal date",
                                "Revised proposal date",
                                "Decision date",
                                "Requirement Meet date",
                              ].includes(field) ? (
                              <input
                                type="date"
                                className="form-control"
                                value={customFieldData[q._id]?.[field] || ""}
                                onChange={(e) => {
                                  const updated = { ...customFieldData };
                                  if (!updated[q._id]) updated[q._id] = {};
                                  updated[q._id][field] = e.target.value;
                                  setCustomFieldData(updated);
                                  handleSave({ [q._id]: updated[q._id] });
                                }}
                              />
                            ) : (
                              <textarea
                                className="form-control resize-none overflow-hidden"
                                style={{
                                  width: "100%",
                                  minHeight: "32px",
                                  lineHeight: "1.5",
                                  padding: "6px 10px",
                                }}
                                rows={1}
                                value={customFieldData[q._id]?.[field] || ""}
                                onChange={(e) => {
                                  const updated = { ...customFieldData };
                                  if (!updated[q._id]) updated[q._id] = {};
                                  updated[q._id][field] = e.target.value;
                                  setCustomFieldData(updated);

                                  e.target.style.height = "auto";
                                  e.target.style.height =
                                    e.target.scrollHeight + "px";

                                  handleSave({ [q._id]: updated[q._id] });
                                }}
                                onInput={(e) => {
                                  e.target.style.height = "auto";
                                  e.target.style.height =
                                    e.target.scrollHeight + "px";
                                }}
                              />
                            )}
                          </td>
                        ))} */}

                        {customFields.map((field) => (
                          <td key={field}>
                            {[
                              "Requirement meet",
                              "Lead Level",
                              "Status",
                              "Final status",
                              "Contacted by",
                            ].includes(field) ? (
                              <select
                                className="form-select"
                                value={customFieldData[q._id]?.[field] || ""}
                                onChange={(e) => {
                                  const updated = { ...customFieldData };
                                  if (!updated[q._id]) updated[q._id] = {};
                                  updated[q._id][field] = e.target.value;
                                  setCustomFieldData(updated);
                                  handleSave({ [q._id]: updated[q._id] });
                                }}
                              >
                                <option value="">Select</option>

                                {field === "Requirement meet" &&
                                  ["G Meet", "Personal Meet", "Calls"].map(
                                    (opt) => <option key={opt}>{opt}</option>
                                  )}

                                {field === "Lead Level" &&
                                  ["Hot", "Warm", "Cold"].map((opt) => (
                                    <option key={opt}>{opt}</option>
                                  ))}

                                {field === "Status" &&
                                  ["Won", "Lost"].map((opt) => (
                                    <option key={opt}>{opt}</option>
                                  ))}

                                {field === "Final status" &&
                                  [
                                    "Closed",
                                    "Contact after week",
                                    "Contact after 3 months",
                                    "Contact after 6 months",
                                  ].map((opt) => (
                                    <option key={opt}>{opt}</option>
                                  ))}

                                {field === "Contacted by" &&
                                  salespeople.map((rep) => (
                                    <option key={rep._id} value={rep._id}>
                                      {rep.name}
                                    </option>
                                  ))}
                              </select>
                            ) : [
                                "First contact date",
                                "Proposal date",
                                "Revised proposal date",
                                "Decision date",
                                "Requirement Meet date",
                              ].includes(field) ? (
                              <input
                                type="date"
                                className="form-control"
                                value={customFieldData[q._id]?.[field] || ""}
                                onChange={(e) => {
                                  const updated = { ...customFieldData };
                                  if (!updated[q._id]) updated[q._id] = {};
                                  updated[q._id][field] = e.target.value;
                                  setCustomFieldData(updated);
                                  handleSave({ [q._id]: updated[q._id] });
                                }}
                              />
                            ) : field === "Deal Amount" ? (
                              <input
                                type="number"
                                className="form-control"
                                placeholder="Enter amount"
                                value={customFieldData[q._id]?.[field] || ""}
                                onChange={(e) => {
                                  const updated = { ...customFieldData };
                                  if (!updated[q._id]) updated[q._id] = {};
                                  updated[q._id][field] = e.target.value;
                                  setCustomFieldData(updated);
                                  handleSave({ [q._id]: updated[q._id] });
                                }}
                                disabled={
                                  customFieldData[q._id]?.["Status"] !== "Won"
                                }
                              />
                            ) : (
                              <textarea
                                className="form-control resize-none overflow-hidden"
                                style={{
                                  width: "100%",
                                  minHeight: "32px",
                                  lineHeight: "1.5",
                                  padding: "6px 10px",
                                }}
                                rows={1}
                                value={customFieldData[q._id]?.[field] || ""}
                                onChange={(e) => {
                                  const updated = { ...customFieldData };
                                  if (!updated[q._id]) updated[q._id] = {};
                                  updated[q._id][field] = e.target.value;
                                  setCustomFieldData(updated);

                                  e.target.style.height = "auto";
                                  e.target.style.height =
                                    e.target.scrollHeight + "px";

                                  handleSave({ [q._id]: updated[q._id] });
                                }}
                                onInput={(e) => {
                                  e.target.style.height = "auto";
                                  e.target.style.height =
                                    e.target.scrollHeight + "px";
                                }}
                              />
                            )}
                          </td>
                        ))}

                        <td className="d-flex">
                          {/* <button
                              className="btn-delete"
                              

                              onClick={() => confirmDelete(q._id, q.formType)}
                              title="Delete Query"
                            >
                              <i className="zmdi zmdi-delete"></i>
                            </button> */}

                          <button
                            onClick={() => handleConvertToClient(q)}
                            className="btn-delete "
                            title="Convert to Client"
                          >
                            <i className="zmdi zmdi-account-add"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="pagination-controls mt-3 d-flex justify-content-center align-items-center">
              <button
                className="circle-btn me-3"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <i className="zmdi zmdi-chevron-left"></i>
              </button>
              <span>
                Page {currentPage} of{" "}
                {Math.ceil(filteredQueries.length / rowsPerPage)}
              </span>
              <button
                className="circle-btn ms-3"
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, Math.ceil(queries.length / rowsPerPage))
                  )
                }
                disabled={
                  currentPage === Math.ceil(queries.length / rowsPerPage)
                }
              >
                <i className="zmdi zmdi-chevron-right"></i>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  /* ---------- 1 Allow legacy‑admin cookie ---------- */
  const rawCookies = ctx.req.headers.cookie || "";
  const isLegacyAdmin = rawCookies.includes("admin_auth=true");

  if (!session && !isLegacyAdmin) {
    // neither NextAuth session nor admin cookie → send to login
    return { redirect: { destination: "/login", permanent: false } };
  }

  /* ---------- 2 Return a role for the component ---------- */
  const role = session ? session.user.role : "admin"; // legacy admin

  return {
    props: { role }, // "admin" or "salesperson"
  };
}
