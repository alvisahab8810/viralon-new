import React from "react";
import Link from "next/link";
import Dashnav from "../../../../components/Dashnav";
import Leftbar from "../../../../components/Leftbar";
import Head from "next/head";
import { useState, useEffect } from "react";
import { FaTrash, FaEye } from "react-icons/fa";
import "react-confirm-alert/src/react-confirm-alert.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

import dynamic from "next/dynamic";
import 'react-quill/dist/quill.snow.css';

export default function NewQuote() {


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
  // const [emailData, setEmailData] = useState({
  //   to: "",
  //   subject: "",
  //   message: "",
  // });


  const [emailData, setEmailData] = useState({
  to: "",
  cc: "",
  bcc: "",
  subject: "",
  message: "", // this holds HTML from ReactQuill
});
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [quoteDate, setQuoteDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [subject, setSubject] = useState("");

  const [customerNotes, setCustomerNotes] = useState(
    "Looking forward for your business."
  );

  const [terms, setTerms] = useState("sdfsf");
  const [attachments, setAttachments] = useState([]);

  const handleFileChange = (e) => {
    setAttachments(Array.from(e.target.files));
  };

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

  const [quoteNumber, setQuoteNumber] = useState("");

  // Fetch active customers from your API

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const res = await fetch("/api/sales/customers/customer");
        const data = await res.json();
        if (data.success) {
          setCustomers(data.data);
        }
      } catch (err) {
        console.error("Failed to load customers", err);
      }
    };

    fetchCustomers();
  }, []);

  const handleSelect = (e) => {
    const selectedId = e.target.value;
    const customer = customers.find((c) => c._id === selectedId);
    setSelectedCustomer(customer);
  };

  // Fetch rows on mount
  useEffect(() => {
    fetchRows();
  }, []);

  const fetchRows = async () => {
    try {
      const res = await fetch("/api/sales/customers/items/item");
      const data = await res.json();
      setRows(data);
    } catch (err) {
      console.error("Failed to fetch rows", err);
    }
  };

  const addRow = async () => {
    const newRow = {
      item: "",
      quantity: 0,
      rate: 0,
    };

    try {
      const res = await fetch("/api/sales/customers/items/item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newRow),
      });

      const data = await res.json();
      setRows([data, ...rows]); // Add new row on top
    } catch (err) {
      console.error("Failed to add row", err);
    }
  };

  //   ---- for delete items --------------

  const removeRow = async (id) => {
    try {
      const res = await fetch(`/api/sales/customers/items/delete?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        setRows((prevRows) => prevRows.filter((row) => row._id !== id));
      } else {
        alert("Failed to delete item.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Server error during delete.");
    }
  };

  const handleChange = (id, field, value) => {
    setRows((prevRows) =>
      prevRows.map((row) => (row._id === id ? { ...row, [field]: value } : row))
    );
  };

  // ------ for quotation --------------------

  useEffect(() => {
    const fetchQuoteNumber = async () => {
      try {
        const res = await fetch("/api/sales/customers/quote-number");
        const data = await res.json();
        if (data.success) {
          setQuoteNumber(data.quoteNumber);
        }
      } catch (err) {
        console.error("Failed to fetch quote number:", err);
      }
    };

    fetchQuoteNumber();
  }, []);

  // ----------  Calculate Subtotal and Total --------------------

  useEffect(() => {
    const sub = rows.reduce((acc, row) => acc + row.quantity * row.rate, 0);

    const discountAmount = (sub * discount) / 100;
    const gstAmount = ((sub - discountAmount) * gst) / 100;

    const finalTotal = sub - discountAmount + gstAmount + Number(adjustment);

    setSubtotal(sub.toFixed(2));
    setTotal(finalTotal.toFixed(2));
  }, [rows, discount, gst, adjustment]);

  // ------------- Handle submit -------------------

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const previewHtml = document.getElementById(
  //     "quote-preview-content"
  //   ).innerHTML;

  //   const payload = {
  //     customerId: selectedCustomer._id,
  //     quoteNumber,
  //     referenceNumber,
  //     quoteDate,
  //     expiryDate,
  //     subject,
  //     items: rows.map((row) => ({
  //       item: row.item,
  //       quantity: row.quantity,
  //       rate: row.rate,
  //       amount: row.quantity * row.rate,
  //     })),
  //     subtotal,
  //     discount,
  //     gst,
  //     adjustment,
  //     total,
  //     customerNotes,
  //     terms,
  //     attachedFiles: [],
  //     customerEmail: selectedCustomer.email, // make sure email exists
  //     previewHTML: `
  //     <html>
  //       <head>
  //         <style>
  //           body { font-family: Arial, sans-serif; font-size: 13px; }
  //           table { width: 100%; border-collapse: collapse; }
  //           th, td { border: 1px solid #ddd; padding: 8px; }
  //           th { background-color: #f2f2f2; }
  //         </style>
  //       </head>
  //       <body>${previewHtml}</body>
  //     </html>
  //   `,
  //   };

  //   try {
  //     const res = await fetch("/api/sales/quotation/create", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });

  //     const result = await res.json();

  //     if (result.success) {
  //       toast.success("Quotation saved and emailed successfully!");
  //     } else {
  //       toast.error("Failed to save/send quotation.");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("An error occurred.");
  //   }
  // };

  // ------------------ for preview pdf -------------------

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

  // --- Frontend: handleSubmit ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    const previewHtml = document.getElementById(
      "quote-preview-content"
    ).innerHTML;

    const payload = {
      customerId: selectedCustomer._id,
      quoteNumber,
      referenceNumber,
      quoteDate,
      expiryDate,
      subject,
      items: rows.map((row) => ({
        item: row.item,
        quantity: row.quantity,
        rate: row.rate,
        amount: row.quantity * row.rate,
      })),
      subtotal,
      discount,
      gst,
      adjustment,
      total,
      customerNotes,
      terms,
      attachedFiles: [],
      customerEmail: selectedCustomer.email,
      previewHTML: `<!DOCTYPE html><html><body>${previewHtml}</body></html>`,
    };

    const res = await fetch("/api/sales/quotation/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const result = await res.json();
    if (result.success) {
      setPdfId(result.pdfId);
      setEmailData({
        to: selectedCustomer.email,
        subject: `Quotation #${quoteNumber} - Awaiting Your Approval`,
        message: `Dear Customer,\n\nPlease find attached your quote #${quoteNumber}.\n\nTotal: ₹${total}`,
      });
      setEmailModalOpen(true);
      toast.success("Quotation saved. Customize your email.");
    } else {
      toast.error("Failed to save quotation.");
    }
  };

  // --- Frontend: sendEmail ---

  // const sendEmail = async () => {
  //   setSending(true);

  //   const previewHtml = document.getElementById(
  //     "quote-preview-content"
  //   ).innerHTML;

  //   const response = await fetch("/api/sales/quotation/email", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       to: emailData.to,
  //       subject: emailData.subject,
  //       htmlBody: emailData.message.replace(/\n/g, "<br>"),
  //       pdfId,
  //       previewHTML: `<!DOCTYPE html><html><body>${previewHtml}</body></html>`, // 👈 pass this
  //     }),
  //   });

  //   const result = await response.json();
  //   if (result.success) {
  //     toast.success("Email sent successfully.");
  //     setEmailModalOpen(false);
  //   } else {
  //     toast.error("Failed to send email: " + result.error);
  //   }

  //   setSending(false);
  // };


  const sendEmail = async () => {
  setSending(true);

  const previewHtml = document.getElementById("quote-preview-content").innerHTML;

  const response = await fetch("/api/sales/quotation/email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      to: emailData.to,
      cc: emailData.cc,        // ✅ Add this
      bcc: emailData.bcc,      // ✅ Add this (optional)
      subject: emailData.subject,
      htmlBody: emailData.message.replace(/\n/g, "<br>"),
      pdfId,
      previewHTML: `<!DOCTYPE html><html><body>${previewHtml}</body></html>`,
    }),
  });

  const result = await response.json();
  if (result.success) {
    toast.success("Email sent successfully.");
    setEmailModalOpen(false);
  } else {
    toast.error("Failed to send email: " + result.error);
  }

  setSending(false);
};


  useEffect(() => {
    if (emailModalOpen) {
      document.body.style.overflow = "hidden"; // freeze scroll
    } else {
      document.body.style.overflow = "auto"; // restore scroll
    }

    // Clean up on unmount
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [emailModalOpen]);

  return (
    <>
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
                <h2 className="new-invoice-heading">
                 <i className="zmdi zmdi-file-text col-blue"></i>
                  New Quote
                  <small className="text-muted">Welcome to Viralon</small>
                </h2>
              </div>
              <div className="col-lg-5 col-md-6 col-sm-12">
                <ul className="breadcrumb float-md-right">
                  <li className="breadcrumb-item">
                    <Link href="/dashboard/dashboard">
                      <i className="zmdi zmdi-home"></i> Viralon
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">New Quote</li>
                </ul>
              </div>
            </div>

            <div className="admin">
              <form onSubmit={handleSubmit} className="mb-5">
                <div className="mb-3">
                  <label htmlFor="customerName" className="form-label">
                    Client Name<span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    id="customerName"
                    onChange={handleSelect}
                    defaultValue=""
                  >
                    <option value="">Select an active client</option>
                    {customers.map((cust) => (
                      <option key={cust._id} value={cust._id}>
                        {cust.salutation} {cust.firstName} {cust.lastName} (
                        {cust.companyName})
                      </option>
                    ))}
                  </select>

                  {selectedCustomer?.billingAddress && (
                    <div className="mt-2 p-2 border rounded bg-light">
                      <strong>Billing Address:</strong>
                      <p className="mb-0">
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

                <div className="row mb-3">
                  <div className="col-md-3">
                    <label htmlFor="quoteNumber" className="form-label">
                      Quote#
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="quoteNumber"
                      name="quoteNumber"
                      value={quoteNumber}
                      onChange={(e) => setQuoteNumber(e.target.value)}
                    />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="reference" className="form-label">
                      Reference#
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="referenceNumber"
                      value={referenceNumber}
                      onChange={(e) => setReferenceNumber(e.target.value)}
                    />
                  </div>

                  {/* <div className="mb-3">
                    <label htmlFor="referenceNumber" className="form-label">
                      Reference Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="referenceNumber"
                      value={referenceNumber}
                      onChange={(e) => setReferenceNumber(e.target.value)}
                    />
                  </div> */}

                  <div className="col-md-3">
                    <label htmlFor="quoteDate" className="form-label">
                      Quote Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="quoteDate"
                      name="quoteDate"
                      value={quoteDate}
                      onChange={(e) => setQuoteDate(e.target.value)}
                    />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="expiryDate" className="form-label">
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      className="form-control"
                      id="expiryDate"
                      name="expiryDate"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="subject"
                    name="subject"
                    placeholder="Let your customer know what this Quote is for"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required // ❗ remove this if Subject is not mandatory
                  />
                </div>

                <div className="table-responsive mb-3">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Item Details</th>
                        <th>Quantity</th>
                        <th>Rate</th>
                        <th>Amount</th>
                        <th></th>
                      </tr>
                    </thead>

                    <tbody>
                      {rows.map((row) => (
                        <tr key={row._id}>
                          <td>
                            <input
                              type="text"
                              name="item"
                              className="form-control"
                              value={row.item}
                              onChange={(e) =>
                                handleChange(row._id, "item", e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="quantity"
                              min="0"
                              step="any"
                              className="form-control"
                              value={row.quantity}
                              onChange={(e) =>
                                handleChange(
                                  row._id,
                                  "quantity",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="number"
                              name="rate"
                              min="0"
                              step="any"
                              className="form-control"
                              value={row.rate}
                              onChange={(e) =>
                                handleChange(
                                  row._id,
                                  "rate",
                                  parseFloat(e.target.value) || 0
                                )
                              }
                            />
                          </td>
                          <td>{(row.quantity * row.rate).toFixed(2)}</td>
                          <td className="remove-btn">
                            <button
                              type="button"
                              className="btn btn-link text-danger"
                              onClick={() => removeRow(row._id)}
                            >
                              &times;
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="add-row-btn mb-3">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-sm me-2"
                      onClick={(e) => {
                        e.preventDefault();
                        addRow();
                      }}
                    >
                      <i className="zmdi zmdi-plus mr-1"></i> Add New Row
                    </button>
                  </div>
                </div>

                <div className="row mb-4">
                  <div className="col-md-6">
                    <div className="mb-3">
                      <label htmlFor="customerNotes" className="form-label">
                        Customer Notes
                      </label>
                      <textarea
                        className="form-control"
                        id="customerNotes"
                        name="customerNotes"
                        rows="3"
                        value={customerNotes}
                        onChange={(e) => setCustomerNotes(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="border p-3 bg-white">
                      <div className="mb-2 d-flex justify-content-between total-price mb-3">
                        <span>Sub Total</span>
                        <span>{subtotal}</span>
                      </div>

                      <div className="row mb-3 d-flex align-items-center">
                        <div className="col-sm-2">
                          <label className="me-2">Discount</label>
                        </div>
                        <div className="col-sm-10 d-flex align-items-center text-dark">
                          <input
                            type="number"
                            className="form-control w-100 me-2"
                            name="discount"
                            value={discount}
                            onChange={(e) =>
                              setDiscount(parseFloat(e.target.value) || 0)
                            }
                          />
                          %
                        </div>
                      </div>

                      <div className="row mb-3 d-flex align-items-center">
                        <div className="col-sm-2">
                          <label className="me-2">GST</label>
                        </div>
                        <div className="col-sm-10 d-flex align-items-center text-dark">
                          <input
                            type="number"
                            className="form-control w-100 me-2"
                            name="gst"
                            value={gst}
                            onChange={(e) =>
                              setGst(parseFloat(e.target.value) || 0)
                            }
                          />
                          %
                        </div>
                      </div>

                      <div className="row mb-3 d-flex align-items-center">
                        <div className="col-sm-2">
                          <label className="me-2">Adjustment</label>
                        </div>
                        <div className="col-sm-10">
                          <input
                            type="number"
                            className="form-control w-100"
                            name="adjustment"
                            value={adjustment}
                            onChange={(e) =>
                              setAdjustment(parseFloat(e.target.value) || 0)
                            }
                          />
                        </div>
                      </div>

                      <div className="mt-4 d-flex justify-content-between fw-bold total-price">
                        <span>Total (₹)</span>
                        <span>{total}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="terms" className="form-label">
                    Terms & Conditions
                  </label>
                  <textarea
                    className="form-control"
                    id="terms"
                    name="terms"
                    rows="3"
                    value={terms}
                    onChange={(e) => setTerms(e.target.value)}
                  />
                </div>

                {/* <div className="mb-3">
                  <label className="form-label">Attach File(s) to Quote</label>
                  <input
                    type="file"
                    className="form-control"
                    name="attachments"
                    multiple
                    onChange={handleFileChange}
                  />
                  <small className="text-muted">
                    You can upload a maximum of 5 files, 10MB each
                  </small>
                </div> */}

                <div className="d-flex justify-content-end add-row-btn">
                  {/* <button
                    type="button"
                    className="btn btn-outline-secondary me-2"
                  >
                    Save as Draft
                  </button> */}
                  <button type="submit" className="btn btn-primary me-2">
                    Save and Send
                  </button>
                  {/* <button type="button" className="btn btn-danger">
                    Cancel
                  </button> */}
                </div>
              </form>
              <div className="preview-pdf-section add-row-btn">
                <button
                  type="submit"
                  className="btn btn-outline-secondary mb-3"
                  onClick={handlePreviewPDF}
                >
                  {" "}
                  <FaEye color="#fff" />
                  Preview PDF
                </button>
              </div>
            </div>

            {/* {emailModalOpen && (
              <>
         
                <div
                  className="modal-backdrop"
                  onClick={() => !sending && setEmailModalOpen(false)}
                ></div>

                <div
                  className="email-panel"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="modal-title"
                >
                  <h2
                    id="modal-title"
                    className="mb-3 text-2xl font-bold mb-6 text-gray-800"
                  >
                    Send Quotation
                  </h2>

                  <div className="space-y-4">
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        To Email
                      </label>
                      <input
                        type="email"
                        value={emailData.to}
                        onChange={(e) =>
                          setEmailData({ ...emailData, to: e.target.value })
                        }
                        className="form-control w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        autoFocus
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject
                      </label>
                      <input
                        type="text"
                        value={emailData.subject}
                        onChange={(e) =>
                          setEmailData({
                            ...emailData,
                            subject: e.target.value,
                          })
                        }
                        className="form-control w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>

                    <div className="mb-3 textarea-message">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        rows={5}
                        value={emailData.message}
                        onChange={(e) =>
                          setEmailData({
                            ...emailData,
                            message: e.target.value,
                          })
                        }
                        className="form-control w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="add-row-btn flex justify-end space-x-3 mt-6">
                    <button
                      onClick={() => setEmailModalOpen(false)}
                      disabled={sending}
                      className="btn btn-outline-secondary"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={sendEmail}
                      disabled={sending}
                      className={`btn btn-outline-secondary ml-2 transition ${
                        sending
                          ? "cursor-not-allowed"
                          : "bg-blue-600 hover:bg-blue-700"
                      }`}
                    >
                      {sending ? "Sending..." : "Send"}
                    </button>
                  </div>
                </div>
              </>
            )} */}


 {emailModalOpen && (
  <>
    {/* Backdrop */}
    <div
      className="modal-backdrop"
      onClick={() => !sending && setEmailModalOpen(false)}
    ></div>

    {/* Modal Panel */}
    <div
      className="email-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2
        id="modal-title"
        className="text-2xl font-bold text-gray-800 mb-4"
      >
         Send Quotation
      </h2>

      <div className="space-y-4">
        {/* To */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To Email
          </label>
          <input
            type="email"
            value={emailData.to}
            onChange={(e) => setEmailData({ ...emailData, to: e.target.value })}
            className="form-control w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            autoFocus
          />
        </div>

        {/* CC & BCC Toggles */}
        <div className="mb-3 cc-toggles flex space-x-4">
          <button
            type="button"
            className="text-blue-600 hover:underline text-sm"
            onClick={() => setShowCC(!showCC)}
          >
            {showCC ? "Hide CC" : "Add CC"}
          </button>
          <button
            type="button"
            className="ml-2 text-blue-600 hover:underline text-sm"
            onClick={() => setShowBCC(!showBCC)}
          >
            {showBCC ? "Hide BCC" : "Add BCC"}
          </button>
        </div>

        {/* CC */}
        {showCC && (
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              CC
            </label>
            <input
              type="email"
              value={emailData.cc || ""}
              onChange={(e) =>
                setEmailData({ ...emailData, cc: e.target.value })
              }
              className="form-control w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        )}

        {/* BCC */}
        {showBCC && (
          <div  className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              BCC
            </label>
            <input
              type="email"
              value={emailData.bcc || ""}
              onChange={(e) =>
                setEmailData({ ...emailData, bcc: e.target.value })
              }
              className="form-control w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
        )}

        {/* Subject */}
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subject
          </label>
          <input
            type="text"
            value={emailData.subject}
            onChange={(e) =>
              setEmailData({ ...emailData, subject: e.target.value })
            }
            className="form-control w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Rich Text Editor for Message */}
 <div className="mb-3">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Message
  </label>
  {quillLoaded && (
    <ReactQuill
      key="email-editor"
      theme="snow"
      value={emailData.message}
      onChange={(value) =>
        setEmailData({ ...emailData, message: value })
      }
      className="bg-white rounded-md border border-gray-300"
    />
  )}
</div>


       

      </div>

      {/* Actions */}
      <div className="add-row-btn flex justify-end space-x-3 mt-6">
        <button
          onClick={() => setEmailModalOpen(false)}
          disabled={sending}
          className="btn btn-outline-secondary px-5 py-2 rounded-md bg-gray-300 text-gray-800 hover:bg-gray-400 transition disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={sendEmail}
          disabled={sending}
          className={`px-5 btn btn-outline-secondary ml-2 py-2 rounded-md text-white transition ${
            sending ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  </>
)}

          </div>
        </section>
      </div>

      <div
        id="quote-preview-content"
        className="d-none"
        style={{
          // display: "none",
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
                Quotation
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
                <strong>Quote Number:</strong> {quoteNumber || "—"}
              </p>
              <p>
                <strong>Reference:</strong> {referenceNumber || "—"}
              </p>
              <p>
                <strong>Quote Date:</strong> {quoteDate || "—"}
              </p>
              <p>
                <strong>Expiry Date:</strong> {expiryDate || "—"}
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

          {/* Quotation Items */}
          <h3
            style={{
              marginTop: "30px",
              marginBottom: "15px",
              color: "#f96332",
            }}
          >
            Quotation Items
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
                  <td style={{ padding: "8px",  border: "1px solid #dee2e6", }}>
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
                  <td style={{ padding: "8px", border: "1px solid #dee2e6",}}>
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
                    {Number(discount)}%
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px", border: "1px solid #dee2e6", }}>
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
                    {Number(gst)}%
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px" , border: "1px solid #dee2e6"}}>
                    <strong style={{ fontSize: "12px" }}>Adjustment</strong>
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "right",
                      fontSize: "12px",
                       border: "1px solid #dee2e6",
                    }}
                  >
                    ₹ {Number(adjustment).toFixed(2)}
                  </td>
                </tr>
                <tr style={{ backgroundColor: "#f1f1f1" }}>
                  <td style={{ padding: "12px",  border: "1px solid #dee2e6", }}>
                    <h4 style={{ margin: 0, fontSize: "12px" }}>
                      <strong>Total</strong>
                    </h4>
                  </td>
                  <td style={{ padding: "13px", textAlign: "right",  border: "1px solid #dee2e6", }}>
                    <h4 style={{ margin: 0, fontSize: "13px" }}>
                      ₹ {Number(total).toFixed(2)}
                    </h4>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

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

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
