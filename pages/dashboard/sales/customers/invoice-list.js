// import Link from "next/link";
// import Dashnav from "../../../../components/Dashnav";
// import Leftbar from "../../../../components/Leftbar";
// import Head from "next/head";
// import React, { useState, useEffect } from "react";
// import { FaTrash, FaEye } from "react-icons/fa";
// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function InvoiceList() {
//   const [filter, setFilter] = useState({
//     invoiceId: "",
//     name: "",
//     email: "",
//   });

//   const [selectedInvoice, setSelectedInvoice] = useState(null);

//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [amount, setAmount] = useState("");
//   const [method, setMethod] = useState("Cash");
//   const [note, setNote] = useState("");
//   const handlePaymentSubmit = async (e) => {
//     e.preventDefault();

//     const res = await fetch("/api/payments/receive", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         invoiceId: selectedInvoice._id,
//         amount,
//         method,
//         note,
//       }),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       alert("Payment recorded successfully");
//       setShowPaymentModal(false);
//       // Optional: refresh data
//     } else {
//       alert(data.message || "Failed to record payment");
//     }
//   };

//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 10;

//   const [invoices, setInvoices] = useState([]);

//   useEffect(() => {
//     fetch("/api/sales/invoice/invoice-list")
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setInvoices(data.data);
//         }
//       })
//       .catch((error) => console.error("Error fetching invoices:", error));
//   }, []);

//   const confirmDelete = (id) => {
//     confirmAlert({
//       title: "Confirm Delete",
//       message: "Are you sure you want to delete this invoice?",
//       buttons: [
//         {
//           label: "Yes",
//           onClick: async () => {
//             try {
//               const res = await fetch(`/api/sales/invoice/delete?id=${id}`, {
//                 method: "DELETE",
//               });
//               const data = await res.json();

//               if (data.success) {
//                 toast.success("Invoice deleted successfully.");
//                 setInvoices((prev) => prev.filter((inv) => inv._id !== id));
//               } else {
//                 toast.error("Failed to delete invoice.");
//               }
//             } catch (err) {
//               console.error("Error deleting invoice:", err);
//               toast.error("Server error during deletion.");
//             }
//           },
//         },
//         {
//           label: "No",
//           onClick: () => toast.info("Deletion cancelled."),
//         },
//       ],
//     });
//   };
//   const filteredInvoices = invoices.filter((invoice) => {
//     const fullName =
//       `${invoice.customerId?.firstName || ""} ${invoice.customerId?.lastName || ""}`.toLowerCase();
//     return (
//       invoice.invoiceNumber
//         .toLowerCase()
//         .includes(filter.invoiceId.toLowerCase()) &&
//       fullName.includes(filter.name.toLowerCase()) &&
//       (invoice.customerEmail || "")
//         .toLowerCase()
//         .includes(filter.email.toLowerCase())
//     );
//   });
//   return (
//     <div className="career-response">
//       <Head>
//         <link rel="stylesheet" href="/asets/css/bootstrap.min.css" />
//         <link rel="stylesheet" href="/asets/css/main.css" />
//         <link rel="stylesheet" href="/asets/css/admin.css" />
//       </Head>

//       <div className="main-nav">
//         <Dashnav />
//         <Leftbar />

//         <section className="content home">
//           <div className="block-header">
//             <div className="row ptb-50">
//               <div className="col-lg-7 col-md-6 col-sm-12">
//                 <h2>
//                   Invoices Payment History
//                   <small className="text-muted">Manage your invoices</small>
//                 </h2>
//               </div>
//               <div className="col-lg-5 col-md-6 col-sm-12">
//                 <div className="add-customer-btn d-flex justify-content-end mb-3">
//                   <Link
//                     href="/dashboard/sales/customers/new-invoice"
//                     className="btn btn-primary"
//                   >
//                     <i className="zmdi zmdi-plus mr-1"></i> New Invoice
//                   </Link>
//                 </div>
//               </div>
//             </div>

//             <div className="row g-3 mb-3 filters">
//               <div className="col-md-4">
//                 <input
//                   type="text"
//                   placeholder="Filter by Invoice ID"
//                   className="form-control"
//                   value={filter.invoiceId}
//                   onChange={(e) =>
//                     setFilter({ ...filter, invoiceId: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="col-md-4">
//                 <input
//                   type="text"
//                   placeholder="Filter by Customer Name"
//                   className="form-control"
//                   value={filter.name}
//                   onChange={(e) =>
//                     setFilter({ ...filter, name: e.target.value })
//                   }
//                 />
//               </div>
//               <div className="col-md-4">
//                 <input
//                   type="text"
//                   placeholder="Filter by Email"
//                   className="form-control"
//                   value={filter.email}
//                   onChange={(e) =>
//                     setFilter({ ...filter, email: e.target.value })
//                   }
//                 />
//               </div>
//             </div>

//             <table className="table table-bordered table-striped">
//               <thead className="bg-gray-100">
//                 <tr>
//                   <th>Invoice</th>
//                   <th>Name</th>
//                   <th>Total</th>
//                   <th>Customer Email</th>
//                   <th>Payments</th>
//                   <th>Balance Due</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredInvoices.map((invoice) => (
//                   <React.Fragment key={invoice._id}>
//                     {/* Main Invoice Row */}
//                     <tr className="border-t">
//                       <td className="px-4 py-2 font-medium">
//                         {invoice.invoiceNumber}
//                       </td>
//                       <td className="px-4 py-2">
//                         {invoice.customerId?.firstName}{" "}
//                         {invoice.customerId?.lastName}
//                       </td>
//                       <td className="px-4 py-2">
//                         ₹{invoice.total.toLocaleString()}
//                       </td>
//                       <td className="px-4 py-2">{invoice.customerEmail}</td>
//                       <td className="px-4 py-2">
//                         {invoice.payments?.length || 0}
//                       </td>
//                       <td className="px-4 py-2 text-red-600">
//                         ₹{invoice.balanceDue.toLocaleString()}
//                       </td>
//                       <td className="px-4 py-2">
//                         <button
//                           className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
//                           onClick={() => {
//                             setSelectedInvoice(invoice);
//                             setShowPaymentModal(true);
//                           }}
//                         >
//                           Record Payment
//                         </button>
//                       </td>
//                     </tr>

//                     {/* Payment History Rows */}
//                     {invoice.payments?.map((p, i) => (
//                       <tr
//                         key={`${invoice._id}-p${i}`}
//                         className="bg-gray-50 text-sm text-gray-700"
//                       >
//                         <td className="px-4 py-1 text-gray-500" colSpan={1}>
//                           ↳ Payment {i + 1}
//                         </td>
//                         <td className="px-4 py-1" colSpan={2}>
//                           {new Date(p.date).toLocaleDateString()}
//                         </td>
//                         <td className="px-4 py-1">
//                           ₹{p.amount.toLocaleString()}
//                         </td>
//                         <td className="px-4 py-1">{p.method}</td>
//                         <td className="px-4 py-1" colSpan={2}>
//                           {p.note || "-"}
//                         </td>
//                       </tr>
//                     ))}
//                   </React.Fragment>
//                 ))}
//               </tbody>
//             </table>

//             <div className="pagination-controls mt-3 d-flex justify-content-center align-items-center">
//               <button
//                 className="circle-btn me-3"
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//               >
//                 <i className="zmdi zmdi-chevron-left"></i>
//               </button>

//               <span>
//                 Page {currentPage} of {Math.ceil(invoices.length / rowsPerPage)}
//               </span>

//               <button
//                 className="circle-btn ms-3"
//                 onClick={() =>
//                   setCurrentPage((prev) =>
//                     Math.min(prev + 1, Math.ceil(invoices.length / rowsPerPage))
//                   )
//                 }
//                 disabled={
//                   currentPage === Math.ceil(invoices.length / rowsPerPage)
//                 }
//               >
//                 <i className="zmdi zmdi-chevron-right"></i>
//               </button>
//             </div>

//             {showPaymentModal && (
//               <>
//                 {/* Overlay */}
//                 <div
//                   onClick={() => setShowPaymentModal(false)}
//                   style={{
//                     position: "fixed",
//                     inset: 0,
//                     backgroundColor: "rgba(0, 0, 0, 0.4)",
//                     zIndex: 1040,
//                   }}
//                 />

//                 {/* Drawer Panel */}
//                 <div
//                   style={{
//                     position: "fixed",
//                     top: 0,
//                     right: 0,
//                     height: "100vh",
//                     width: "400px",
//                     maxWidth: "100%",
//                     backgroundColor: "#fff",
//                     boxShadow: "-3px 0 8px rgba(0,0,0,0.2)",
//                     zIndex: 1050,
//                     padding: "20px",
//                     display: "flex",
//                     flexDirection: "column",
//                     overflowY: "auto",
//                     transition: "transform 0.3s ease-out",
//                     transform: "translateX(0)", // Visible
//                   }}
//                   role="dialog"
//                   aria-modal="true"
//                 >
//                   {/* Header */}
//                   <div
//                     style={{
//                       display: "flex",
//                       justifyContent: "space-between",
//                       alignItems: "center",
//                       marginBottom: "1rem",
//                     }}
//                   >
//                     <h5 style={{ marginTop: "70px" }}>Record Payment</h5>
//                     <button
//                       onClick={() => setShowPaymentModal(false)}
//                       style={{
//                         border: "none",
//                         background: "transparent",
//                         fontSize: "24px",
//                         cursor: "pointer",
//                         color: "#6c757d",
//                         lineHeight: "1",
//                       }}
//                     >
//                       &times;
//                     </button>
//                   </div>

//                   {/* Form */}
//                   <form
//                     onSubmit={handlePaymentSubmit}
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: "1rem",
//                       flex: 1,
//                     }}
//                   >
//                     <div>
//                       <label className="form-label">Amount</label>
//                       <input
//                         type="number"
//                         value={amount}
//                         onChange={(e) => setAmount(parseFloat(e.target.value))}
//                         className="form-control"
//                         required
//                       />
//                     </div>

//                     <div>
//                       <label className="form-label">Method</label>
//                       <select
//                         value={method}
//                         onChange={(e) => setMethod(e.target.value)}
//                         className="form-select"
//                         required
//                       >
//                         <option value="Cash">Cash</option>
//                         <option value="Bank Transfer">Bank Transfer</option>
//                         <option value="UPI">UPI</option>
//                         <option value="Card">Card</option>
//                       </select>
//                     </div>

//                     <div>
//                       <label className="form-label">Note</label>
//                       <textarea
//                         value={note}
//                         onChange={(e) => setNote(e.target.value)}
//                         className="form-control"
//                         rows={3}
//                       />
//                     </div>

//                     {/* Footer */}
//                     <div
//                       style={{
//                         marginTop: "auto",
//                         paddingTop: "1rem",
//                         borderTop: "1px solid #dee2e6",
//                         display: "flex",
//                         justifyContent: "flex-end",
//                         gap: "0.5rem",
//                       }}
//                     >
//                       <button
//                         type="button"
//                         onClick={() => setShowPaymentModal(false)}
//                         className="btn btn-secondary"
//                       >
//                         Cancel
//                       </button>
//                       <button type="submit" className="btn btn-primary">
//                         Save
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               </>
//             )}
//           </div>
//         </section>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// }

import Link from "next/link";
import Dashnav from "../../../../components/Dashnav";
import Leftbar from "../../../../components/Leftbar";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { FaTrash, FaEye } from "react-icons/fa";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function InvoiceList() {

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [showInvoiceDetails, setShowInvoiceDetails] = useState(false);

  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundData, setRefundData] = useState(null);
  const [refundAmount, setRefundAmount] = useState("");
  const [refundMethod, setRefundMethod] = useState("Cash");
  const [refundNote, setRefundNote] = useState("");

  const [filter, setFilter] = useState({
    invoiceId: "",
    name: "",
    email: "",
  });

  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [amount, setAmount] = useState("");
  const [method, setMethod] = useState("Cash");
  const [note, setNote] = useState("");

  
  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/payments/receive", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        invoiceId: selectedInvoice._id,
        amount,
        method,
        note,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Payment recorded successfully");
      setShowPaymentModal(false);
      // Optional: refresh data
    } else {
      alert(data.message || "Failed to record payment");
    }
  };


  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch("/api/sales/invoice/invoice-list")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setInvoices(data.data);
        }
      })
      .catch((error) => console.error("Error fetching invoices:", error));
  }, []);

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this invoice?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const res = await fetch(`/api/sales/invoice/delete?id=${id}`, {
                method: "DELETE",
              });
              const data = await res.json();

              if (data.success) {
                toast.success("Invoice deleted successfully.");
                setInvoices((prev) => prev.filter((inv) => inv._id !== id));
              } else {
                toast.error("Failed to delete invoice.");
              }
            } catch (err) {
              console.error("Error deleting invoice:", err);
              toast.error("Server error during deletion.");
            }
          },
        },
        {
          label: "No",
          onClick: () => toast.info("Deletion cancelled."),
        },
      ],
    });
  };



   const startIndex = (currentPage - 1) * rowsPerPage;
  const filteredInvoices = invoices.filter((invoice) => {
    const fullName =
      `${invoice.customerId?.firstName || ""} ${invoice.customerId?.lastName || ""}`.toLowerCase();
    return (
      invoice.invoiceNumber
        .toLowerCase()
        .includes(filter.invoiceId.toLowerCase()) &&
      fullName.includes(filter.name.toLowerCase()) &&
      (invoice.customerEmail || "")
        .toLowerCase()
        .includes(filter.email.toLowerCase())
    );
  });

  // for refund ==============


 const endIndex = startIndex + rowsPerPage;
  const paginatedInvoices = filteredInvoices.slice(startIndex, endIndex);



  const handleRefundSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/payments/refund", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        invoiceId: selectedInvoice._id,
        originalPayment: refundData,
        refundAmount,
        refundMethod,
        refundNote,
        paymentIndex: refundData.paymentIndex, // ✅ THIS LINE MUST BE PRESENT
      }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Refund processed successfully.");
      setShowRefundModal(false);
      // Optional: refresh invoice data or trigger a reload
    } else {
      toast.error(data.message || "Failed to process refund");
    }
  };

  return (
    <div className="career-response">
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
            <div className="row ptb-50">
              <div className="col-lg-7 col-md-6 col-sm-12">
                <h2>
                  Invoices Payment History
                  <small className="text-muted">Manage your invoices</small>
                </h2>
              </div>
              <div className="col-lg-5 col-md-6 col-sm-12">
                <div className="add-customer-btn d-flex justify-content-end mb-3">
                  <Link
                    href="/dashboard/sales/customers/new-invoice"
                    className="btn btn-primary"
                  >
                    <i className="zmdi zmdi-plus mr-1"></i> New Invoice
                  </Link>
                </div>
              </div>
            </div>

            <div className="row g-3 mb-3 filters">
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Filter by Invoice ID"
                  className="form-control"
                  value={filter.invoiceId}
                  onChange={(e) =>
                    setFilter({ ...filter, invoiceId: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Filter by Customer Name"
                  className="form-control"
                  value={filter.name}
                  onChange={(e) =>
                    setFilter({ ...filter, name: e.target.value })
                  }
                />
              </div>
              <div className="col-md-4">
                <input
                  type="text"
                  placeholder="Filter by Email"
                  className="form-control"
                  value={filter.email}
                  onChange={(e) =>
                    setFilter({ ...filter, email: e.target.value })
                  }
                />
              </div>
            </div>

            <table className="table table-bordered table-striped">
              <thead className="bg-gray-100">
                <tr>
                  <th>Invoice</th>
                  <th>Name</th>
                  <th>Total</th>
                  <th>Customer Email</th>
                  <th>Payments</th>
                  <th>Balance Due</th>
                  <th>Actions</th>
                </tr>
              </thead>
            

              <tbody>
                {/* {filteredInvoices.map((invoice) => ( */}
                {paginatedInvoices.map((invoice) => (

                  <tr key={invoice._id} className="border-t">
                    <td className="px-4 py-2 font-medium">
                      {invoice.invoiceNumber}
                    </td>
                    <td className="px-4 py-2">
                      {invoice.customerId?.firstName}{" "}
                      {invoice.customerId?.lastName}
                    </td>
                    <td className="px-4 py-2">
                      ₹{invoice.total.toLocaleString()}
                    </td>
                    <td className="px-4 py-2">{invoice.customerEmail}</td>
                    <td className="px-4 py-2">
                      {invoice.payments?.length || 0}
                    </td>
                    <td className="px-4 py-2 text-red-600">
                      ₹{invoice.balanceDue.toLocaleString()}
                    </td>
                    <td className="px-4 py-2 d-flex gap-2">
                      <button
                        className="download-btn btn btn-sm btn-primary"
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setShowPaymentModal(true);
                        }}
                      >
                        Record Payment
                      </button>
                      <button
                        className="btn-delete"
                        onClick={() => {
                          setSelectedInvoice(invoice);
                          setShowInvoiceDetails(true);
                        }}
                        title="View Invoice"
                      >
                        <i className="fas fa-eye"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination-controls mt-3 d-flex justify-content-center align-items-center">
              <button
                className="circle-btn me-3"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <i className="zmdi zmdi-chevron-left"></i>
              </button>

              <span>
                Page {currentPage} of {Math.ceil(invoices.length / rowsPerPage)}
              </span>

              <button
                className="circle-btn ms-3"
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, Math.ceil(invoices.length / rowsPerPage))
                  )
                }
                disabled={
                  currentPage === Math.ceil(invoices.length / rowsPerPage)
                }
              >
                <i className="zmdi zmdi-chevron-right"></i>
              </button>
            </div>

            {showPaymentModal && (
              <>
                {/* Overlay */}
                <div
                  onClick={() => setShowPaymentModal(false)}
                  style={{
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    zIndex: 1040,
                  }}
                />

                {/* Drawer Panel */}
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    height: "100vh",
                    width: "400px",
                    maxWidth: "100%",
                    backgroundColor: "#fff",
                    boxShadow: "-3px 0 8px rgba(0,0,0,0.2)",
                    zIndex: 1050,
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto",
                    transition: "transform 0.3s ease-out",
                    transform: "translateX(0)", // Visible
                  }}
                  role="dialog"
                  aria-modal="true"
                >
                  {/* Header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "1rem",
                    }}
                  >
                    <h5 style={{ marginTop: "70px" }}>Record Payment</h5>
                    <button
                      onClick={() => setShowPaymentModal(false)}
                      style={{
                        border: "none",
                        background: "transparent",
                        fontSize: "24px",
                        cursor: "pointer",
                        color: "#6c757d",
                        lineHeight: "1",
                      }}
                    >
                      &times;
                    </button>
                  </div>

                  {/* Form */}
                  <form
                    onSubmit={handlePaymentSubmit}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                      flex: 1,
                    }}
                  >
                    <div>
                      <label className="form-label">Amount</label>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value))}
                        className="form-control"
                        required
                      />
                    </div>

                    <div>
                      <label className="form-label">Method</label>
                      <select
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className="form-select"
                        required
                      >
                        <option value="Cash">Cash</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="UPI">UPI</option>
                        <option value="Card">Card</option>
                      </select>
                    </div>

                    <div>
                      <label className="form-label">Note</label>
                      <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="form-control"
                        rows={3}
                      />
                    </div>

                    {/* Footer */}
                    <div
                      style={{
                        marginTop: "auto",
                        paddingTop: "1rem",
                        borderTop: "1px solid #dee2e6",
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "0.5rem",
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => setShowPaymentModal(false)}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}

            {/* -----------   refund modal---------- */}

            {showRefundModal && (
              <>
                <div
                  onClick={() => setShowRefundModal(false)}
                  style={{
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    zIndex: 1040,
                  }}
                />
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    height: "100vh",
                    width: "400px",
                    maxWidth: "100%",
                    backgroundColor: "#fff",
                    boxShadow: "-3px 0 8px rgba(0,0,0,0.2)",
                    zIndex: 1050,
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-3 mt-5">
                    <h5>Refund Payment</h5>
                    <button
                      onClick={() => setShowRefundModal(false)}
                      style={{
                        border: "none",
                        background: "transparent",
                        fontSize: "24px",
                        cursor: "pointer",
                        color: "#6c757d",
                      }}
                    >
                      &times;
                    </button>
                  </div>

                  <form
                    onSubmit={handleRefundSubmit}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: "1rem",
                    }}
                  >
                    <div>
                      <label className="form-label">Refund Amount</label>
                      <input
                        type="number"
                        className="form-control"
                        value={refundAmount}
                        onChange={(e) =>
                          setRefundAmount(parseFloat(e.target.value))
                        }
                        max={refundData?.amount || 0}
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Method</label>
                      <select
                        className="form-select"
                        value={refundMethod}
                        onChange={(e) => setRefundMethod(e.target.value)}
                        required
                      >
                        <option value="Cash">Cash</option>
                        <option value="Bank Transfer">Bank Transfer</option>
                        <option value="UPI">UPI</option>
                        <option value="Card">Card</option>
                      </select>
                    </div>
                    <div>
                      <label className="form-label">Note</label>
                      <textarea
                        className="form-control"
                        value={refundNote}
                        onChange={(e) => setRefundNote(e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div className="d-flex justify-content-end pt-2 border-top">
                      <button
                        type="button"
                        onClick={() => setShowRefundModal(false)}
                        className="btn btn-secondary me-2"
                      >
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-danger">
                        Refund
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}

            {/* -------------------- for detailed invoice ----------------- */}
            {showInvoiceDetails && selectedInvoice && (
              <>
                {/* Backdrop */}
                <div
                  onClick={() => setShowInvoiceDetails(false)}
                  style={{
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(0, 0, 0, 0.4)",
                    zIndex: 1040,
                  }}
                />

                {/* Right Panel */}
                <div
                  style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    height: "100vh",
                    width: "400px",
                    maxWidth: "100%",
                    backgroundColor: "#fff",
                    boxShadow: "-3px 0 8px rgba(0,0,0,0.2)",
                    zIndex: 1050,
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    overflowY: "auto",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center mb-3 mt-5">
                    <h5 className="mb-0">Invoice Details</h5>
                    <button
                      onClick={() => setShowInvoiceDetails(false)}
                      style={{
                        background: "none",
                        border: "none",
                        fontSize: "24px",
                        color: "#999",
                        cursor: "pointer",
                      }}
                    >
                      &times;
                    </button>
                  </div>

                  <div style={{ flex: 1 }}>
                    <p>
                      <strong>Invoice #:</strong>{" "}
                      {selectedInvoice.invoiceNumber}
                    </p>
                    <p>
                      <strong>Customer:</strong>{" "}
                      {selectedInvoice.customerId?.firstName}{" "}
                      {selectedInvoice.customerId?.lastName}
                    </p>
                    <p>
                      <strong>Email:</strong> {selectedInvoice.customerEmail}
                    </p>
                    <p>
                      <strong>Total:</strong> ₹
                      {selectedInvoice.total.toLocaleString()}
                    </p>
                    <p>
                      <strong>Balance Due:</strong> ₹
                      {selectedInvoice.balanceDue.toLocaleString()}
                    </p>

                   <hr />
<h6 className="text-muted fw-bold mb-3">Payment History</h6>

{selectedInvoice.payments?.length ? (
  <div className="list-group">
    {selectedInvoice.payments.map((p, i) => {
      const isRefund = p.amount < 0;
      return (
        <div
          key={i}
          className="list-group-item list-group-item-action mb-2 rounded shadow-sm"
          style={{
            borderLeft: `5px solid ${isRefund ? "#dc3545" : "#28a745"}`,
            backgroundColor: "#f8f9fa",
          }}
        >
          <div className="d-flex justify-content-between">
            <div className="d-flex align-items-center gap-2">
              <span style={{ fontSize: "1.2rem" }}>
                {isRefund ? "🔁" : "💰"}
              </span>
              <div>
                <strong className="d-block">
                  {isRefund ? "Refund Issued" : "Payment Received"}
                </strong>
                <small className="text-muted">
                  {new Date(p.date).toLocaleDateString()}
                </small>
              </div>
            </div>
            <div
              className={`fw-bold ${
                isRefund ? "text-danger" : "text-success"
              }`}
              style={{ fontSize: "1.1rem" }}
            >
              ₹{Math.abs(p.amount).toLocaleString()}
            </div>
          </div>

          <div className="mt-2">
            <small className="text-muted d-block">
              Method: <strong>{p.method || "-"}</strong>
            </small>
            <small className="text-muted d-block">
              Note: {p.note || "-"}
            </small>
          </div>

          {!p.refunded && !isRefund && (
            <button
              className="refund-btn mt-2"
              onClick={() => {
                setRefundData({ ...p, paymentIndex: i });
                setShowRefundModal(true);
                setShowInvoiceDetails(false);
              }}
            >
              Refund
            </button>
          )}

          {p.refunded && !isRefund && (
            <span className="badge bg-success mt-2">Refunded</span>
          )}
        </div>
      );
    })}
  </div>
) : (
  <p className="text-muted">No payments recorded.</p>
)}

                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>

      <ToastContainer />
    </div>
  );
}
