import Link from "next/link";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

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
  // const hydratePreview = (invoice) => {
  //   setInvoiceNumber(invoice.invoiceNumber);
  //   setSelectedCustomer(invoice.customerId); // ensure this is populated
  //   setRows(invoice.items);
  //   setSubtotal(invoice.subtotal);
  //   setTotal(invoice.total);
  //   setSubject(invoice.subject);
  //   setInvoiceDate(invoice.invoiceDate);
  //   setDueDate(invoice.dueDate);
  //   setDiscount(invoice.discount);
  //   setGst(invoice.gst);
  //   setSacCode(invoice.sacCode);
  //   setCustomerNotes(invoice.customerNotes);
  //   setTerms(invoice.terms);

  //   // Optional: If you show payment info in preview
  //   setPaidAmount(invoice.paidAmount || 0);
  // };

  const [paymentHistory, setPaymentHistory] = useState([]);

  function hydratePreview(invoice) {
    setInvoiceNumber(invoice.invoiceNumber);
    setReferenceNumber(invoice.referenceNumber);
    setInvoiceDate(invoice.invoiceDate);
    setDueDate(invoice.dueDate);
    setSubject(invoice.subject || "");
    setSubtotal(invoice.subtotal || 0);
    setDiscount(invoice.discount || 0);
    setGst(invoice.gst || 0);
    setTotal(invoice.total || 0);
    setPaidAmount(invoice.amountPaid || 0);
    setCustomerNotes(invoice.customerNotes || "");
    setTerms(invoice.terms || "");
    setSacCode(invoice.sacCode || "");
    setRows(invoice.items || []);
    setSelectedCustomer(invoice.customerDetails); // or fetch it using customerId

    // ✅ Add this block to hydrate payment + refund history
    const combined = [
      ...(invoice.payments?.map((p) => ({ ...p, refunded: false })) || []),
      ...(invoice.refunds?.map((r) => ({ ...r, refunded: true })) || []),
    ].sort((a, b) => new Date(a.date) - new Date(b.date));

    setPaymentHistory(combined);
  }

  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  // const [paymentHistory, setpaymentHistory] = useState("");

  const [paidAmount, setPaidAmount] = useState(0);

  const [isSending, setIsSending] = useState(false);

  const [sacCode, setSacCode] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");

  const [tempCustomerNotes, setTempCustomerNotes] = useState("");

  const [tempTerms, setTempTerms] = useState("");

  const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

  const [quillLoaded, setQuillLoaded] = useState(false);

  useEffect(() => {
    setQuillLoaded(true);
  }, []);

  const [showCC, setShowCC] = useState(false);
  const [showBCC, setShowBCC] = useState(false);

  const [pdfId, setPdfId] = useState(null);
  const [sending, setSending] = useState(false);

  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [pdfBase64, setPdfBase64] = useState("");

  const [emailData, setEmailData] = useState({
    to: "",
    cc: "",
    bcc: "",
    subject: "",
    message: "", // this holds HTML from ReactQuill
  });
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  // const [invoiceDate, setinvoiceDate] = useState("");
  // const [dueDate, setdueDate] = useState("");
  const [subject, setSubject] = useState("");

  // const [customerNotes, setCustomerNotes] = useState(
  //   "Looking forward for your business."
  // );

  const [terms, setTerms] = useState(``);

  const [attachments, setAttachments] = useState([]);

  const [rows, setRows] = useState([
    { _id: Date.now(), item: "", quantity: 0, rate: 0 },
  ]);
  const [discount, setDiscount] = useState(0); // %
  const [gst, setGst] = useState(0); // %
  const [adjustment, setAdjustment] = useState(0);

  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const [invoiceNumber, setInvoiceNumber] = useState("");

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

  const handlePreviewPDF = async () => {
    const input = document.getElementById("quote-preview-content");
    if (!input) return;

    // 1. Show the preview temporarily
    input.classList.remove("d-none");

    // 2. Wait for DOM to update
    await new Promise((resolve) => setTimeout(resolve, 100)); // slight delay to render

    // 3. Capture the preview
    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

    // 4. Hide the preview again
    input.classList.add("d-none");

    // 5. Show PDF in a new tab
    window.open(pdf.output("bloburl"), "_blank");
  };

  // ------ for invoice number --------------------

  // useEffect(() => {
  //   const fetchInvoiceNumber = async () => {
  //     try {
  //       const res = await fetch("/api/sales/invoice/invoice-number");
  //       const data = await res.json();
  //       if (data.success) {
  //         setInvoiceNumber(data.invoiceNumber);
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch invoice number:", err);
  //     }
  //   };

  //   fetchInvoiceNumber();
  // }, []);

  useEffect(() => {
    if (selectedInvoice) {
      setPaidAmount(selectedInvoice.paidAmount || 0);
      // setTotal(selectedInvoice.total || 0);
    }
  }, [selectedInvoice]);

  const handleSendUpdatedInvoice = async (invoice) => {
    // Step 1: Fill your preview DOM with invoice data
    hydratePreview(invoice); // implement this

    await new Promise((resolve) => setTimeout(resolve, 300));

    const html = document.getElementById("quote-preview-content").innerHTML;

    const response = await fetch("/api/sales/invoice/send-updated", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        invoiceId: invoice._id,
        previewHTML: `<!DOCTYPE html><html><body>${html}</body></html>`,
      }),
    });

    const result = await response.json();

    if (result.success) {
      toast.success("Updated invoice sent successfully.");
    } else {
      toast.error("Failed: " + result.error);
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
                        className="btn download-btn btn-primary btn-sm"
                        onClick={() => handleSendUpdatedInvoice(invoice)}
                      >
                        Send Updated Invoice
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
                                      {isRefund
                                        ? "Refund Issued"
                                        : "Payment Received"}
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
                                <span className="badge bg-success mt-2">
                                  Refunded
                                </span>
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

         {/* <div
        id="quote-preview-content"
        className="d-none"
        style={{
    
          padding: "40px",
          backgroundColor: "#fff",
          color: "#000",
          border: "1px solid #dee2e6",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          fontFamily: "Arial, sans-serif",
          fontSize: "12px",
        }}
      >
        <div
          style={{
            border: "1px solid #dee2e6",
            padding: "25px",
            borderRadius: "6px",
          }}
        >

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "30px",
            }}
          >
            <div>
              <h1
                style={{
                  color: "#f96332",
                  marginBottom: "40px",
                  fontSize: "30px",
                  fontFamily: "Arial, sans-serif",
                }}
              >
                Invoice
              </h1>

     
              {selectedCustomer && (
                <>
                  <p
                    style={{
                      fontSize: "17px",
                      marginBottom: "0",
                      fontWeight: "bold",
                    }}
                  >
                    {selectedCustomer.salutation} {selectedCustomer.firstName}{" "}
                    {selectedCustomer.lastName}
                  </p>
                  <p
                    style={{
                      fontSize: "12px",
                      color: "#f96332",
                      marginTop: "0",
                    }}
                  >
                    {selectedCustomer.companyName}
                  </p>
                </>
              )}

              <p>
                <strong>Invoice Number:</strong> {invoiceNumber || "—"}
              </p>
              <p>
                <strong>Reference:</strong> {referenceNumber || "—"}
              </p>
              <p>
                <strong>Invoice Date:</strong> {invoiceDate || "—"}
              </p>
              {sacCode && (
                <p>
                  <strong>SAC Code:</strong> {sacCode}
                </p>
              )}

              <p>
                <strong>Expiry Date:</strong> {dueDate || "—"}
              </p>
            </div>


            {selectedCustomer?.billingAddress && (
              <div
                style={{
                  backgroundColor: "#f8f9fa",
                  padding: "15px",
                  border: "1px solid #dee2e6",
                  borderRadius: "8px",
                  minWidth: "250px",
                }}
              >
                <h4 style={{ marginBottom: "10px", color: "#6c757d" }}>
                  Billing Address
                </h4>
                <p style={{ margin: 0, fontSize: "12px" }}>
                  {selectedCustomer.billingAddress.attention && (
                    <>
                      {selectedCustomer.billingAddress.attention}
                      <br />
                    </>
                  )}
                  {selectedCustomer.billingAddress.address1}
                  <br />
                  {selectedCustomer.billingAddress.address2 && (
                    <>
                      {selectedCustomer.billingAddress.address2}
                      <br />
                    </>
                  )}
                  {selectedCustomer.billingAddress.city},{" "}
                  {selectedCustomer.billingAddress.state}
                  <br />
                  {selectedCustomer.billingAddress.country} -{" "}
                  {selectedCustomer.billingAddress.pincode}
                  <br />
                  Phone: {selectedCustomer.billingAddress.phone}
                  <br />
                  {selectedCustomer.billingAddress.fax && (
                    <>Fax: {selectedCustomer.billingAddress.fax}</>
                  )}
                </p>
              </div>
            )}
          </div>

          <div style={{ marginBottom: "15px" }}>
            <p style={{ margin: 0 }}>
              <strong>Subject:</strong> {subject || "—"}
            </p>
          </div>

          <hr />


          <h3
            style={{
              marginTop: "30px",
              marginBottom: "15px",
              color: "#f96332",
            }}
          >
            Invoice Items
          </h3>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginBottom: "1rem",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#f1f1f1", textAlign: "left" }}>
                  <th
                    style={{
                      padding: "10px",
                      border: "1px solid #dee2e6",
                      fontSize: "13px",
                    }}
                  >
                    Item
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      border: "1px solid #dee2e6",
                      fontSize: "13px",
                    }}
                  >
                    Qty
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      border: "1px solid #dee2e6",
                      fontSize: "13px",
                    }}
                  >
                    Rate
                  </th>
                  <th
                    style={{
                      padding: "10px",
                      border: "1px solid #dee2e6",
                      fontSize: "13px",
                    }}
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #dee2e6",
                        fontSize: "12px",
                      }}
                    >
                      {row.item || "—"}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #dee2e6",
                        fontSize: "12px",
                      }}
                    >
                      {Number(row.quantity) || 0}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #dee2e6",
                        fontSize: "12px",
                      }}
                    >
                      ₹ {Number(row.rate).toFixed(2)}
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        border: "1px solid #dee2e6",
                        fontSize: "12px",
                      }}
                    >
                      ₹ {(Number(row.quantity) * Number(row.rate)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "30px",
            }}
          >
            <table style={{ width: "50%", borderCollapse: "collapse" }}>
              <tbody>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #dee2e6" }}>
                    <strong style={{ fontSize: "12px" }}>Subtotal</strong>
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "right",
                      fontSize: "12px",
                      border: "1px solid #dee2e6",
                    }}
                  >
                    ₹ {Number(subtotal).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #dee2e6" }}>
                    <strong style={{ fontSize: "12px" }}>Discount</strong>
                  </td>
               

                  <td
                    style={{
                      padding: "8px",
                      textAlign: "right",
                      fontSize: "12px",
                      border: "1px solid #dee2e6",
                    }}
                  >
                    {discount > 0
                      ? `${discount}% (- ₹${((subtotal * discount) / 100).toFixed(2)})`
                      : "—"}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #dee2e6" }}>
                    <strong style={{ fontSize: "12px" }}>GST</strong>
                  </td>
                 

                  <td
                    style={{
                      padding: "8px",
                      textAlign: "right",
                      fontSize: "12px",
                      border: "1px solid #dee2e6",
                    }}
                  >
                    {gst > 0 ? (
                      <>
                        <div>CGST: {(gst / 2).toFixed(2)}% (+ ₹{(((subtotal - (subtotal * discount) / 100) * (gst / 2)) / 100).toFixed(2)})</div>
                        <div>SGST: {(gst / 2).toFixed(2)}% (+ ₹{(((subtotal - (subtotal * discount) / 100) * (gst / 2)) / 100).toFixed(2)})</div>
                      </>
                    ) : (
                      "—"
                    )}
                  </td>

                </tr>
                
                <tr style={{ backgroundColor: "#f1f1f1" }}>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  <h4 style={{ margin: 0, fontSize: "12px" }}>
                    <strong>Total</strong>
                  </h4>
                </td>
                <td
                  style={{
                    padding: "13px",
                    textAlign: "right",
                    border: "1px solid #dee2e6",
                  }}
                >
                  <h4 style={{ margin: 0, fontSize: "13px" }}>
                    ₹ {Number(total).toFixed(2)}
                  </h4>
                </td>
              </tr>
              <tr>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  <strong style={{ fontSize: "12px" }}>Paid</strong>
                </td>
                <td
                  style={{
                    padding: "13px",
                    textAlign: "right",
                    border: "1px solid #dee2e6",
                    fontSize: "12px",
                  }}
                >
                  ₹ {Number(paidAmount || 0).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td style={{ padding: "12px", border: "1px solid #dee2e6" }}>
                  <strong style={{ fontSize: "12px" }}>Balance</strong>
                </td>
                <td
                  style={{
                    padding: "13px",
                    textAlign: "right",
                    border: "1px solid #dee2e6",
                    fontSize: "12px",
                  }}
                >
                  ₹ {(Number(total || 0) - Number(paidAmount || 0)).toFixed(2)}
                </td>
              </tr>


         
{(invoice?.payments?.length > 0 || invoice?.refunds?.length > 0) && (
  <div style={{ marginTop: "30px" }}>
    <h4 style={{ fontSize: "14px", marginBottom: "10px", color: "#f96332" }}>Payment History</h4>
    

    {invoice.payments.map((pay, i) => (
      <div key={`pay-${i}`} style={{ fontSize: "12px", marginBottom: "8px" }}>
        💰 <strong>Payment Received:</strong> ₹{pay.amount.toFixed(2)}<br />
        <strong>Method:</strong> {pay.method || "—"} | <strong>Date:</strong> {new Date(pay.date).toLocaleDateString()}<br />
        {pay.note && <><strong>Note:</strong> {pay.note}</>}
      </div>
    ))}


    {invoice.refunds.map((ref, i) => (
      <div key={`refund-${i}`} style={{ fontSize: "12px", marginBottom: "8px", color: "red" }}>
        🔁 <strong>Refund Issued:</strong> ₹{ref.amount.toFixed(2)}<br />
        <strong>Method:</strong> {ref.method || "—"} | <strong>Date:</strong> {new Date(ref.date).toLocaleDateString()}<br />
        {ref.note && <><strong>Note:</strong> {ref.note}</>}
      </div>
    ))}
  </div>
)}


              </tbody>
            </table>
          </div>


          {customerNotes?.trim() && (
            <div style={{ marginTop: "30px" }}>
              <h5
                style={{ color: "#111", fontSize: "14px", marginBottom: "0" }}
              >
                Customer Notes
              </h5>
              <p style={{ fontSize: "12px" }}>{customerNotes}</p>
            </div>
          )}

          <hr />

          {terms?.trim() && (
            <div style={{ marginTop: "20px" }}>
              <h5
                style={{ color: "#111", fontSize: "14px", marginBottom: "0" }}
              >
                Terms & Conditions
              </h5>
              <p style={{ fontSize: "12px" }}>{terms}</p>
            </div>
          )}
        </div>
         </div> */}
        <div
          id="quote-preview-content"
          className="d-none"
          style={{
            padding: "40px",
            backgroundColor: "#fff",
            color: "#000",
            border: "1px solid #dee2e6",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            fontFamily: "Arial, sans-serif",
            fontSize: "12px",
          }}
        >
          <div
            style={{
              border: "1px solid #dee2e6",
              padding: "25px",
              borderRadius: "6px",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "30px",
              }}
            >
              <div>
                <h1
                  style={{
                    color: "#f96332",
                    marginBottom: "40px",
                    fontSize: "30px",
                    fontFamily: "Arial, sans-serif",
                  }}
                >
                  Invoice
                </h1>

                {/* Customer Name & Company */}
                {selectedCustomer && (
                  <>
                    <p
                      style={{
                        fontSize: "17px",
                        marginBottom: "0",
                        fontWeight: "bold",
                      }}
                    >
                      {selectedCustomer.salutation} {selectedCustomer.firstName}{" "}
                      {selectedCustomer.lastName}
                    </p>
                    <p
                      style={{
                        fontSize: "12px",
                        color: "#f96332",
                        marginTop: "0",
                      }}
                    >
                      {selectedCustomer.companyName}
                    </p>
                  </>
                )}

                {/* Quote Info */}
                <p>
                  <strong>Invoice Number:</strong> {invoiceNumber || "—"}
                </p>
                <p>
                  <strong>Reference:</strong> {referenceNumber || "—"}
                </p>
                <p>
                  <strong>Invoice Date:</strong> {invoiceDate || "—"}
                </p>
                {sacCode && (
                  <p>
                    <strong>SAC Code:</strong> {sacCode}
                  </p>
                )}

                <p>
                  <strong>Expiry Date:</strong> {dueDate || "—"}
                </p>
              </div>

              {/* Billing Address */}
              {selectedCustomer?.billingAddress && (
                <div
                  style={{
                    backgroundColor: "#f8f9fa",
                    padding: "15px",
                    border: "1px solid #dee2e6",
                    borderRadius: "8px",
                    minWidth: "250px",
                  }}
                >
                  <h4 style={{ marginBottom: "10px", color: "#6c757d" }}>
                    Billing Address
                  </h4>
                  <p style={{ margin: 0, fontSize: "12px" }}>
                    {selectedCustomer.billingAddress.attention && (
                      <>
                        {selectedCustomer.billingAddress.attention}
                        <br />
                      </>
                    )}
                    {selectedCustomer.billingAddress.address1}
                    <br />
                    {selectedCustomer.billingAddress.address2 && (
                      <>
                        {selectedCustomer.billingAddress.address2}
                        <br />
                      </>
                    )}
                    {selectedCustomer.billingAddress.city},{" "}
                    {selectedCustomer.billingAddress.state}
                    <br />
                    {selectedCustomer.billingAddress.country} -{" "}
                    {selectedCustomer.billingAddress.pincode}
                    <br />
                    Phone: {selectedCustomer.billingAddress.phone}
                    <br />
                    {selectedCustomer.billingAddress.fax && (
                      <>Fax: {selectedCustomer.billingAddress.fax}</>
                    )}
                  </p>
                </div>
              )}
            </div>

            {/* Subject */}
            <div style={{ marginBottom: "15px" }}>
              <p style={{ margin: 0 }}>
                <strong>Subject:</strong> {subject || "—"}
              </p>
            </div>

            <hr />

            {/* Invoice Items */}
            <h3
              style={{
                marginTop: "30px",
                marginBottom: "15px",
                color: "#f96332",
              }}
            >
              Invoice Items
            </h3>
            <div style={{ overflowX: "auto" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  marginBottom: "1rem",
                }}
              >
                <thead>
                  <tr style={{ backgroundColor: "#f1f1f1", textAlign: "left" }}>
                    <th
                      style={{
                        padding: "10px",
                        border: "1px solid #dee2e6",
                        fontSize: "13px",
                      }}
                    >
                      Item
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        border: "1px solid #dee2e6",
                        fontSize: "13px",
                      }}
                    >
                      Qty
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        border: "1px solid #dee2e6",
                        fontSize: "13px",
                      }}
                    >
                      Rate
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        border: "1px solid #dee2e6",
                        fontSize: "13px",
                      }}
                    >
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row, index) => (
                    <tr key={index}>
                      <td
                        style={{
                          padding: "10px",
                          border: "1px solid #dee2e6",
                          fontSize: "12px",
                        }}
                      >
                        {row.item || "—"}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          border: "1px solid #dee2e6",
                          fontSize: "12px",
                        }}
                      >
                        {Number(row.quantity) || 0}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          border: "1px solid #dee2e6",
                          fontSize: "12px",
                        }}
                      >
                        ₹ {Number(row.rate).toFixed(2)}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          border: "1px solid #dee2e6",
                          fontSize: "12px",
                        }}
                      >
                        ₹ {(Number(row.quantity) * Number(row.rate)).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Financial Summary */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "30px",
              }}
            >
              <table style={{ width: "50%", borderCollapse: "collapse" }}>
                <tbody>
                  <tr>
                    <td style={{ padding: "8px", border: "1px solid #dee2e6" }}>
                      <strong style={{ fontSize: "12px" }}>Subtotal</strong>
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        textAlign: "right",
                        fontSize: "12px",
                        border: "1px solid #dee2e6",
                      }}
                    >
                      ₹ {Number(subtotal).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "8px", border: "1px solid #dee2e6" }}>
                      <strong style={{ fontSize: "12px" }}>Discount</strong>
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        textAlign: "right",
                        fontSize: "12px",
                        border: "1px solid #dee2e6",
                      }}
                    >
                      {discount > 0
                        ? `${discount}% (- ₹${((subtotal * discount) / 100).toFixed(2)})`
                        : "—"}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: "8px", border: "1px solid #dee2e6" }}>
                      <strong style={{ fontSize: "12px" }}>GST</strong>
                    </td>
                    <td
                      style={{
                        padding: "8px",
                        textAlign: "right",
                        fontSize: "12px",
                        border: "1px solid #dee2e6",
                      }}
                    >
                      {gst > 0 ? (
                        <>
                          <div>
                            CGST: {(gst / 2).toFixed(2)}% (+ ₹
                            {(
                              ((subtotal - (subtotal * discount) / 100) *
                                (gst / 2)) /
                              100
                            ).toFixed(2)}
                            )
                          </div>
                          <div>
                            SGST: {(gst / 2).toFixed(2)}% (+ ₹
                            {(
                              ((subtotal - (subtotal * discount) / 100) *
                                (gst / 2)) /
                              100
                            ).toFixed(2)}
                            )
                          </div>
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                  </tr>
                  <tr style={{ backgroundColor: "#f1f1f1" }}>
                    <td
                      style={{ padding: "12px", border: "1px solid #dee2e6" }}
                    >
                      <h4 style={{ margin: 0, fontSize: "12px" }}>
                        <strong>Total</strong>
                      </h4>
                    </td>
                    <td
                      style={{
                        padding: "13px",
                        textAlign: "right",
                        border: "1px solid #dee2e6",
                      }}
                    >
                      <h4 style={{ margin: 0, fontSize: "13px" }}>
                        ₹ {Number(total).toFixed(2)}
                      </h4>
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "12px", border: "1px solid #dee2e6" }}
                    >
                      <strong style={{ fontSize: "12px" }}>Paid</strong>
                    </td>
                    <td
                      style={{
                        padding: "13px",
                        textAlign: "right",
                        border: "1px solid #dee2e6",
                        fontSize: "12px",
                      }}
                    >
                      ₹ {Number(paidAmount || 0).toFixed(2)}
                    </td>
                  </tr>
                  <tr>
                    <td
                      style={{ padding: "12px", border: "1px solid #dee2e6" }}
                    >
                      <strong style={{ fontSize: "12px" }}>Balance</strong>
                    </td>
                    <td
                      style={{
                        padding: "13px",
                        textAlign: "right",
                        border: "1px solid #dee2e6",
                        fontSize: "12px",
                      }}
                    >
                      ₹{" "}
                      {(Number(total || 0) - Number(paidAmount || 0)).toFixed(
                        2
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* ✅ Payment & Refund History */}

            {paymentHistory.length > 0 && (
              <div style={{ marginTop: "30px" }}>
                <h4
                  style={{
                    fontSize: "14px",
                    marginBottom: "10px",
                    color: "#f96332",
                  }}
                >
                  Payment & Refund History
                </h4>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "12px",
                  }}
                >
                  <thead>
                    <tr style={{ backgroundColor: "#f1f1f1" }}>
                      <th
                        style={{ border: "1px solid #dee2e6", padding: "8px" }}
                      >
                        Type
                      </th>
                      <th
                        style={{ border: "1px solid #dee2e6", padding: "8px" }}
                      >
                        Amount
                      </th>
                      <th
                        style={{ border: "1px solid #dee2e6", padding: "8px" }}
                      >
                        Method
                      </th>
                      <th
                        style={{ border: "1px solid #dee2e6", padding: "8px" }}
                      >
                        Date
                      </th>
                      <th
                        style={{ border: "1px solid #dee2e6", padding: "8px" }}
                      >
                        Note
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentHistory.map((entry, i) => (
                      <tr
                        key={i}
                        style={{ color: entry.refunded ? "red" : "inherit" }}
                      >
                        <td
                          style={{
                            border: "1px solid #dee2e6",
                            padding: "8px",
                          }}
                        >
                          {entry.refunded
                            ? "Refund Issued 🔁"
                            : "Payment Received 💰"}
                        </td>
                        <td
                          style={{
                            border: "1px solid #dee2e6",
                            padding: "8px",
                          }}
                        >
                          ₹{entry.amount.toFixed(2)}
                        </td>
                        <td
                          style={{
                            border: "1px solid #dee2e6",
                            padding: "8px",
                          }}
                        >
                          {entry.method || "—"}
                        </td>
                        <td
                          style={{
                            border: "1px solid #dee2e6",
                            padding: "8px",
                          }}
                        >
                          {new Date(entry.date).toLocaleDateString()}
                        </td>
                        <td
                          style={{
                            border: "1px solid #dee2e6",
                            padding: "8px",
                          }}
                        >
                          {entry.note || "—"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Customer Notes */}
            {customerNotes?.trim() && (
              <div style={{ marginTop: "30px" }}>
                <h5
                  style={{ color: "#111", fontSize: "14px", marginBottom: "0" }}
                >
                  Customer Notes
                </h5>
                <p style={{ fontSize: "12px" }}>{customerNotes}</p>
              </div>
            )}

            <hr />

            {/* Terms & Conditions */}
            {terms?.trim() && (
              <div style={{ marginTop: "20px" }}>
                <h5
                  style={{ color: "#111", fontSize: "14px", marginBottom: "0" }}
                >
                  Terms & Conditions
                </h5>
                <p style={{ fontSize: "12px" }}>{terms}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
