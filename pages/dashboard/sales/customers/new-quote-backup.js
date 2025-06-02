// import React from "react";
// import Link from "next/link";
// import Dashnav from "../../../../components/Dashnav";
// import Leftbar from "../../../../components/Leftbar";
// import Head from "next/head";
// import { useState, useEffect } from "react";

// import "react-confirm-alert/src/react-confirm-alert.css";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { ToastContainer } from "react-toastify";

// export default function NewQuote() {
//   const [selectedCustomerId, setSelectedCustomerId] = useState("");
//   // const [reference, setReference] = useState("");
//   const [referenceNumber, setReferenceNumber] = useState("");

//   const [quoteDate, setQuoteDate] = useState("");
//   const [expiryDate, setExpiryDate] = useState("");
//   const [subject, setSubject] = useState("");

//   const [customerNotes, setCustomerNotes] = useState(
//     "Looking forward for your business."
//   );
//   // const [discount, setDiscount] = useState(0);
//   // const [gst, setGst] = useState(0);
//   // const [adjustment, setAdjustment] = useState(0);
//   const [terms, setTerms] = useState("sdfsf");
//   const [attachments, setAttachments] = useState([]);

//   const handleFileChange = (e) => {
//     setAttachments(Array.from(e.target.files));
//   };

//   // const handleSelect = (e) => {
//   //   const selectedId = e.target.value;
//   //   setSelectedCustomerId(selectedId);
//   //   const foundCustomer = customers.find(c => c._id === selectedId);
//   //   setSelectedCustomer(foundCustomer || null);
//   // };

//   const [rows, setRows] = useState([
//     { _id: Date.now(), item: "", quantity: 0, rate: 0 },
//   ]);

//   const [discount, setDiscount] = useState(0); // %
//   const [gst, setGst] = useState(0); // %
//   const [adjustment, setAdjustment] = useState(0);

//   const [subtotal, setSubtotal] = useState(0);
//   const [total, setTotal] = useState(0);

//   // const [rows, setRows] = useState([]);

//   const [customers, setCustomers] = useState([]);
//   const [selectedCustomer, setSelectedCustomer] = useState(null);

//   const [quoteNumber, setQuoteNumber] = useState("");

//   useEffect(() => {
//     // Fetch active customers from your API
//     const fetchCustomers = async () => {
//       try {
//         const res = await fetch("/api/sales/customers/customer");
//         const data = await res.json();
//         if (data.success) {
//           setCustomers(data.data);
//         }
//       } catch (err) {
//         console.error("Failed to load customers", err);
//       }
//     };

//     fetchCustomers();
//   }, []);

//   const handleSelect = (e) => {
//     const selectedId = e.target.value;
//     const customer = customers.find((c) => c._id === selectedId);
//     setSelectedCustomer(customer);
//   };

//   // Fetch rows on mount
//   useEffect(() => {
//     fetchRows();
//   }, []);

//   const fetchRows = async () => {
//     try {
//       const res = await fetch("/api/sales/customers/items/item");
//       const data = await res.json();
//       setRows(data);
//     } catch (err) {
//       console.error("Failed to fetch rows", err);
//     }
//   };

//   const addRow = async () => {
//     const newRow = {
//       item: "",
//       quantity: 0,
//       rate: 0,
//     };

//     try {
//       const res = await fetch("/api/sales/customers/items/item", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newRow),
//       });

//       const data = await res.json();
//       setRows([data, ...rows]); // Add new row on top
//     } catch (err) {
//       console.error("Failed to add row", err);
//     }
//   };

//   //   ---- for delete items --------------

//   const removeRow = async (id) => {
//     try {
//       const res = await fetch(`/api/sales/customers/items/delete?id=${id}`, {
//         method: "DELETE",
//       });

//       const data = await res.json();

//       if (data.success) {
//         setRows((prevRows) => prevRows.filter((row) => row._id !== id));
//       } else {
//         alert("Failed to delete item.");
//       }
//     } catch (err) {
//       console.error("Delete error:", err);
//       alert("Server error during delete.");
//     }
//   };

//   const handleChange = (id, field, value) => {
//     setRows((prevRows) =>
//       prevRows.map((row) => (row._id === id ? { ...row, [field]: value } : row))
//     );
//   };

//   // ------ for quotation --------------------

//   useEffect(() => {
//     const fetchQuoteNumber = async () => {
//       try {
//         const res = await fetch("/api/sales/customers/quote-number");
//         const data = await res.json();
//         if (data.success) {
//           setQuoteNumber(data.quoteNumber);
//         }
//       } catch (err) {
//         console.error("Failed to fetch quote number:", err);
//       }
//     };

//     fetchQuoteNumber();
//   }, []);

//   // ----------  Calculate Subtotal and Total --------------------

//   useEffect(() => {
//     const sub = rows.reduce((acc, row) => acc + row.quantity * row.rate, 0);

//     const discountAmount = (sub * discount) / 100;
//     const gstAmount = ((sub - discountAmount) * gst) / 100;

//     const finalTotal = sub - discountAmount + gstAmount + Number(adjustment);

//     setSubtotal(sub.toFixed(2));
//     setTotal(finalTotal.toFixed(2));
//   }, [rows, discount, gst, adjustment]);

//   // ------------- Handle submit -------------------

//  const handleSubmit = async (e) => {
//   e.preventDefault();

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
//   };

//   try {
//     const res = await fetch("/api/sales/quotation/create", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     });

//     const result = await res.json();

//     if (result.success) {
//       toast.success("Quotation saved successfully!");
//       // optionally reset form or redirect
//     } else {
//       toast.error("Failed to save quotation.");
//     }
//   } catch (err) {
//     console.error(err);
//     toast.error("An error occurred while saving.");
//   }
// };


//   return (
//     <>
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
//                   New Quote
//                   <small className="text-muted">Welcome to Viralon</small>
//                 </h2>
//               </div>
//               <div className="col-lg-5 col-md-6 col-sm-12">
//                 <ul className="breadcrumb float-md-right">
//                   <li className="breadcrumb-item">
//                     <Link href="/dashboard/dashboard">
//                       <i className="zmdi zmdi-home"></i> Viralon
//                     </Link>
//                   </li>
//                   <li className="breadcrumb-item active">New Quote</li>
//                 </ul>
//               </div>
//             </div>

//             <div className="admin">
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="customerName" className="form-label">
//                     Customer Name<span className="text-danger">*</span>
//                   </label>
//                   <select
//                     className="form-control"
//                     id="customerName"
//                     onChange={handleSelect}
//                     defaultValue=""
//                   >
//                     <option value="">Select an active customer</option>
//                     {customers.map((cust) => (
//                       <option key={cust._id} value={cust._id}>
//                         {cust.salutation} {cust.firstName} {cust.lastName} (
//                         {cust.companyName})
//                       </option>
//                     ))}
//                   </select>

//                   {selectedCustomer?.billingAddress && (
//                     <div className="mt-2 p-2 border rounded bg-light">
//                       <strong>Billing Address:</strong>
//                       <p className="mb-0">
//                         {selectedCustomer.billingAddress.attention && (
//                           <>
//                             {selectedCustomer.billingAddress.attention}
//                             <br />
//                           </>
//                         )}
//                         {selectedCustomer.billingAddress.address1}
//                         <br />
//                         {selectedCustomer.billingAddress.address2 && (
//                           <>
//                             {selectedCustomer.billingAddress.address2}
//                             <br />
//                           </>
//                         )}
//                         {selectedCustomer.billingAddress.city},{" "}
//                         {selectedCustomer.billingAddress.state}
//                         <br />
//                         {selectedCustomer.billingAddress.country} -{" "}
//                         {selectedCustomer.billingAddress.pincode}
//                         <br />
//                         Phone: {selectedCustomer.billingAddress.phone}
//                         <br />
//                         {selectedCustomer.billingAddress.fax && (
//                           <>Fax: {selectedCustomer.billingAddress.fax}</>
//                         )}
//                       </p>
//                     </div>
//                   )}
//                 </div>

//                 {/* <div className="mb-3">
//                   <label htmlFor="customerName" className="form-label">
//                     Customer Name<span className="text-danger">*</span>
//                   </label>
//                   <select
//                     className="form-control"
//                     id="customerName"
//                     name="customerId"
//                     value={selectedCustomerId}
//                     onChange={handleSelect}
//                     required
//                   >
//                     <option value="">Select an active customer</option>
//                     {customers.map((cust) => (
//                       <option key={cust._id} value={cust._id}>
//                         {cust.salutation} {cust.firstName} {cust.lastName} (
//                         {cust.companyName})
//                       </option>
//                     ))}
//                   </select>

                
//                   {selectedCustomer?.billingAddress && (
//                     <div className="mt-2 p-2 border rounded bg-light">
//                       <strong>Billing Address:</strong>
//                       <p className="mb-0">
//                         {selectedCustomer.billingAddress.attention && (
//                           <>
//                             {selectedCustomer.billingAddress.attention}
//                             <br />
//                           </>
//                         )}
//                         {selectedCustomer.billingAddress.address1}
//                         <br />
//                         {selectedCustomer.billingAddress.address2 && (
//                           <>
//                             {selectedCustomer.billingAddress.address2}
//                             <br />
//                           </>
//                         )}
//                         {selectedCustomer.billingAddress.city},{" "}
//                         {selectedCustomer.billingAddress.state}
//                         <br />
//                         {selectedCustomer.billingAddress.country} -{" "}
//                         {selectedCustomer.billingAddress.pincode}
//                         <br />
//                         Phone: {selectedCustomer.billingAddress.phone}
//                         <br />
//                         {selectedCustomer.billingAddress.fax && (
//                           <>Fax: {selectedCustomer.billingAddress.fax}</>
//                         )}
//                       </p>
//                     </div>
//                   )}
//                 </div> */}

//                 {/* <div className="row mb-3">
//                   <div className="col-md-3">
//                     <label htmlFor="quoteNumber" className="form-label">
//                       Quote#
//                     </label>

//                     <input
//                       type="text"
//                       className="form-control"
//                       id="quoteNumber"
//                       value={quoteNumber}
//                       onChange={(e) => setQuoteNumber(e.target.value)} // ✅ editable
//                     />
//                   </div>
//                   <div className="col-md-3">
//                     <label htmlFor="reference" className="form-label">
//                       Reference#
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="reference"
//                     />
//                   </div>
//                   <div className="col-md-3">
//                     <label htmlFor="quoteDate" className="form-label">
//                       Quote Date
//                     </label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       id="quoteDate"
//                     />
//                   </div>
//                   <div className="col-md-3">
//                     <label htmlFor="expiryDate" className="form-label">
//                       Expiry Date
//                     </label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       id="expiryDate"
//                     />
//                   </div>
//                 </div> */}

//                 <div className="row mb-3">
//                   <div className="col-md-3">
//                     <label htmlFor="quoteNumber" className="form-label">
//                       Quote#
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="quoteNumber"
//                       name="quoteNumber"
//                       value={quoteNumber}
//                       onChange={(e) => setQuoteNumber(e.target.value)}
//                     />
//                   </div>

//                   <div className="col-md-3">
//                     <label htmlFor="reference" className="form-label">
//                       Reference#
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="referenceNumber"
//                       value={referenceNumber}
//                       onChange={(e) => setReferenceNumber(e.target.value)}
//                     />
//                   </div>

//                   {/* <div className="mb-3">
//                     <label htmlFor="referenceNumber" className="form-label">
//                       Reference Number
//                     </label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       id="referenceNumber"
//                       value={referenceNumber}
//                       onChange={(e) => setReferenceNumber(e.target.value)}
//                     />
//                   </div> */}

//                   <div className="col-md-3">
//                     <label htmlFor="quoteDate" className="form-label">
//                       Quote Date
//                     </label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       id="quoteDate"
//                       name="quoteDate"
//                       value={quoteDate}
//                       onChange={(e) => setQuoteDate(e.target.value)}
//                     />
//                   </div>

//                   <div className="col-md-3">
//                     <label htmlFor="expiryDate" className="form-label">
//                       Expiry Date
//                     </label>
//                     <input
//                       type="date"
//                       className="form-control"
//                       id="expiryDate"
//                       name="expiryDate"
//                       value={expiryDate}
//                       onChange={(e) => setExpiryDate(e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 {/* <div className="mb-3">
//                   <label htmlFor="subject" className="form-label">
//                     Subject
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="subject"
//                     placeholder="Let your customer know what this Quote is for"
//                   />
//                 </div> */}

//                 <div className="mb-3">
//                   <label htmlFor="subject" className="form-label">
//                     Subject
//                   </label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="subject"
//                     name="subject"
//                     placeholder="Let your customer know what this Quote is for"
//                     value={subject}
//                     onChange={(e) => setSubject(e.target.value)}
//                     required // ❗ remove this if Subject is not mandatory
//                   />
//                 </div>

//                 <div className="table-responsive mb-3">
//                   <table className="table table-bordered">
//                     <thead>
//                       <tr>
//                         <th>Item Details</th>
//                         <th>Quantity</th>
//                         <th>Rate</th>
//                         <th>Amount</th>
//                         <th></th>
//                       </tr>
//                     </thead>
//                     {/* <tbody>
//                       {rows.map((row) => (
//                         <tr key={row._id}>
//                           <td>
//                             <input
//                               type="text"
//                               className="form-control"
//                               value={row.item}
//                               onChange={(e) =>
//                                 handleChange(row._id, "item", e.target.value)
//                               }
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="number"
//                               className="form-control"
//                               value={row.quantity}
//                               onChange={(e) =>
//                                 handleChange(
//                                   row._id,
//                                   "quantity",
//                                   parseFloat(e.target.value) || 0
//                                 )
//                               }
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="number"
//                               className="form-control"
//                               value={row.rate}
//                               onChange={(e) =>
//                                 handleChange(
//                                   row._id,
//                                   "rate",
//                                   parseFloat(e.target.value) || 0
//                                 )
//                               }
//                             />
//                           </td>
//                           <td>{(row.quantity * row.rate).toFixed(2)}</td>
//                           <td className="remove-btn">
//                             <button
//                               type="button"
//                               className="btn btn-link text-danger"
//                               onClick={() => removeRow(row._id)}
//                             >
//                               &times;
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody> */}

//                     <tbody>
//                       {rows.map((row) => (
//                         <tr key={row._id}>
//                           <td>
//                             <input
//                               type="text"
//                               name="item"
//                               className="form-control"
//                               value={row.item}
//                               onChange={(e) =>
//                                 handleChange(row._id, "item", e.target.value)
//                               }
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="number"
//                               name="quantity"
//                               min="0"
//                               step="any"
//                               className="form-control"
//                               value={row.quantity}
//                               onChange={(e) =>
//                                 handleChange(
//                                   row._id,
//                                   "quantity",
//                                   parseFloat(e.target.value) || 0
//                                 )
//                               }
//                             />
//                           </td>
//                           <td>
//                             <input
//                               type="number"
//                               name="rate"
//                               min="0"
//                               step="any"
//                               className="form-control"
//                               value={row.rate}
//                               onChange={(e) =>
//                                 handleChange(
//                                   row._id,
//                                   "rate",
//                                   parseFloat(e.target.value) || 0
//                                 )
//                               }
//                             />
//                           </td>
//                           <td>{(row.quantity * row.rate).toFixed(2)}</td>
//                           <td className="remove-btn">
//                             <button
//                               type="button"
//                               className="btn btn-link text-danger"
//                               onClick={() => removeRow(row._id)}
//                             >
//                               &times;
//                             </button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>

//                   <div className="add-row-btn mb-3">
//                     <button
//                       type="button" // 👈 Important!
//                       className="btn btn-outline-primary btn-sm me-2"
//                       onClick={(e) => {
//                         e.preventDefault(); // 👈 Prevent form submission
//                         addRow();
//                       }}
//                     >
//                       Add New Row
//                     </button>
//                   </div>
//                 </div>

//                 {/* <div className="row mb-4">
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label htmlFor="customerNotes" className="form-label">
//                         Customer Notes
//                       </label>
//                       <textarea
//                         className="form-control"
//                         id="customerNotes"
//                         rows="3"
//                       >
//                         Looking forward for your business.
//                       </textarea>
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="border p-3 bg-white">
//                       <div className="mb-2 d-flex justify-content-between total-price mb-3">
//                         <span>Sub Total</span>
//                         <span>{subtotal}</span>
//                       </div>
//                       <div className="row mb-3 d-flex align-items-center">
//                         <div className="col-sm-2">
//                           <label className="me-2">Discount</label>
//                         </div>

//                         <div className="col-sm-10  d-flex align-items-center text-dark">
//                           <input
//                             type="number"
//                             className="form-control w-100 me-2"
//                             value={discount}
//                             onChange={(e) =>
//                               setDiscount(parseFloat(e.target.value) || 0)
//                             }
//                           />
//                           %
//                         </div>
//                       </div>
//                       <div className="row mb-3 d-flex align-items-center">
//                         <div className="col-sm-2">
//                           <label className="me-2">GST</label>
//                         </div>
//                         <div className="col-sm-10 d-flex align-items-center text-dark">
//                           <input
//                             type="number"
//                             className="form-control w-100 me-2"
//                             value={gst}
//                             onChange={(e) =>
//                               setGst(parseFloat(e.target.value) || 0)
//                             }
//                           />
//                           %
//                         </div>
//                       </div>
//                       <div className="row mb-3 d-flex align-items-center">
//                         <div className="col-sm-2">
//                           <label className="me-2">Adjustment</label>
//                         </div>

//                         <div className="col-sm-10">
//                           <input
//                             type="number"
//                             className="form-control w-100"
//                             value={adjustment}
//                             onChange={(e) =>
//                               setAdjustment(parseFloat(e.target.value) || 0)
//                             }
//                           />
//                         </div>
//                       </div>
//                       <div className="mt-4 d-flex justify-content-between fw-bold total-price">
//                         <span>Total (₹)</span>
//                         <span>{total}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="terms" className="form-label">
//                     Terms & Conditions
//                   </label>
//                   <textarea className="form-control" id="terms" rows="3">
//                     sdfsf
//                   </textarea>
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">Attach File(s) to Quote</label>
//                   <input type="file" className="form-control" multiple />
//                   <small className="text-muted">
//                     You can upload a maximum of 5 files, 10MB each
//                   </small>
//                 </div> */}

//                 <div className="row mb-4">
//                   <div className="col-md-6">
//                     <div className="mb-3">
//                       <label htmlFor="customerNotes" className="form-label">
//                         Customer Notes
//                       </label>
//                       <textarea
//                         className="form-control"
//                         id="customerNotes"
//                         name="customerNotes"
//                         rows="3"
//                         value={customerNotes}
//                         onChange={(e) => setCustomerNotes(e.target.value)}
//                       />
//                     </div>
//                   </div>
//                   <div className="col-md-6">
//                     <div className="border p-3 bg-white">
//                       <div className="mb-2 d-flex justify-content-between total-price mb-3">
//                         <span>Sub Total</span>
//                         <span>{subtotal}</span>
//                       </div>

//                       <div className="row mb-3 d-flex align-items-center">
//                         <div className="col-sm-2">
//                           <label className="me-2">Discount</label>
//                         </div>
//                         <div className="col-sm-10 d-flex align-items-center text-dark">
//                           <input
//                             type="number"
//                             className="form-control w-100 me-2"
//                             name="discount"
//                             value={discount}
//                             onChange={(e) =>
//                               setDiscount(parseFloat(e.target.value) || 0)
//                             }
//                           />
//                           %
//                         </div>
//                       </div>

//                       <div className="row mb-3 d-flex align-items-center">
//                         <div className="col-sm-2">
//                           <label className="me-2">GST</label>
//                         </div>
//                         <div className="col-sm-10 d-flex align-items-center text-dark">
//                           <input
//                             type="number"
//                             className="form-control w-100 me-2"
//                             name="gst"
//                             value={gst}
//                             onChange={(e) =>
//                               setGst(parseFloat(e.target.value) || 0)
//                             }
//                           />
//                           %
//                         </div>
//                       </div>

//                       <div className="row mb-3 d-flex align-items-center">
//                         <div className="col-sm-2">
//                           <label className="me-2">Adjustment</label>
//                         </div>
//                         <div className="col-sm-10">
//                           <input
//                             type="number"
//                             className="form-control w-100"
//                             name="adjustment"
//                             value={adjustment}
//                             onChange={(e) =>
//                               setAdjustment(parseFloat(e.target.value) || 0)
//                             }
//                           />
//                         </div>
//                       </div>

//                       <div className="mt-4 d-flex justify-content-between fw-bold total-price">
//                         <span>Total (₹)</span>
//                         <span>{total}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mb-3">
//                   <label htmlFor="terms" className="form-label">
//                     Terms & Conditions
//                   </label>
//                   <textarea
//                     className="form-control"
//                     id="terms"
//                     name="terms"
//                     rows="3"
//                     value={terms}
//                     onChange={(e) => setTerms(e.target.value)}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">Attach File(s) to Quote</label>
//                   <input
//                     type="file"
//                     className="form-control"
//                     name="attachments"
//                     multiple
//                     onChange={handleFileChange}
//                   />
//                   <small className="text-muted">
//                     You can upload a maximum of 5 files, 10MB each
//                   </small>
//                 </div>

//                 <div className="d-flex justify-content-end add-row-btn">
//                   <button
//                     type="button"
//                     className="btn btn-outline-secondary me-2"
//                   >
//                     Save as Draft
//                   </button>
//                   <button type="submit" className="btn btn-primary me-2">
//                     Save and Send
//                   </button>
//                   <button type="button" className="btn btn-danger">
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </section>
//       </div>

//         <ToastContainer position="top-right" autoClose={3000} />
//     </>
//   );
// }



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

export default function NewQuote() {
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
  //   };

  //   try {
  //     const res = await fetch("/api/sales/quotation/create", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(payload),
  //     });

  //     const result = await res.json();

  //     if (result.success) {
  //       toast.success("Quotation saved successfully!");
  //       // optionally reset form or redirect
  //     } else {
  //       toast.error("Failed to save quotation.");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     toast.error("An error occurred while saving.");
  //   }
  // };

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
      customerEmail: selectedCustomer.email, // make sure email exists
      previewHTML: `
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; font-size: 13px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { background-color: #f2f2f2; }
          </style>
        </head>
        <body>${previewHtml}</body>
      </html>
    `,
    };

    try {
      const res = await fetch("/api/sales/quotation/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await res.json();

      if (result.success) {
        toast.success("Quotation saved and emailed successfully!");
      } else {
        toast.error("Failed to save/send quotation.");
      }
    } catch (err) {
      console.error(err);
      toast.error("An error occurred.");
    }
  };

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
                <h2>
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
                    Customer Name<span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-control"
                    id="customerName"
                    onChange={handleSelect}
                    defaultValue=""
                  >
                    <option value="">Select an active customer</option>
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

                <div className="mb-3">
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
                </div>

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
          </div>
        </section>
      </div>

      {/* <div
      
        id="quote-preview-content"
        className="d-none p-5 bg-white text-dark border rounded shadow-sm"
        style={{ fontFamily: "Arial, sans-serif", fontSize: "18px" }}
      >
        <div
          style={{
            border: "2px groove #888",
            padding: "25px",
            borderRadius: "6px",
          }}
        >
       
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
              <h1
                className="text-primary mb-5"
                style={{ fontFamily: "Arial, sans-serif", fontSize: "80px" }}
              >
                Quotation
              </h1>
          
              {selectedCustomer && (
                <p className="mb-1">
                  <p
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontSize: "35px",
                      marginBottom: "0",
                    }}
                  >
                    <strong>
                      {selectedCustomer.salutation} {selectedCustomer.firstName}{" "}
                      {selectedCustomer.lastName}
                    </strong>
                  </p>
                  <p
                    className="text-primary"
                    style={{
                      fontFamily: "Arial, sans-serif",
                      fontSize: "20px",
                    }}
                  >
                    <b>{selectedCustomer.companyName} </b>
                  </p>
                </p>
              )}

  

              <p className="mb-1">
                <strong>Quote Number:</strong> {quoteNumber || "—"}
              </p>
              <p className="mb-1">
                <strong>Reference:</strong> {referenceNumber || "—"}
              </p>
              <p className="mb-1">
                <strong>Quote Date:</strong> {quoteDate || "—"}
              </p>
              <p className="mb-1">
                <strong>Expiry Date:</strong> {expiryDate || "—"}
              </p>
            </div>

   
            {selectedCustomer?.billingAddress && (
              <div
                className="border rounded p-3"
                style={{ backgroundColor: "#f8f9fa", minWidth: "250px" }}
              >
                <h6 className="mb-2 text-secondary">Billing Address</h6>
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

      
          <div className="mb-3">
            <p className="mb-0">
              <strong>Subject:</strong> {subject || "—"}
            </p>
          </div>

          <hr />

     
          <h5 className="mt-4 mb-3 text-primary">Quotation Items</h5>
          <div className="table-responsive">
            <table className="table table-bordered align-middle">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "40%" }}>Item</th>
                  <th style={{ width: "15%" }}>Qty</th>
                  <th style={{ width: "20%" }}>Rate</th>
                  <th style={{ width: "25%" }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={index}>
                    <td>{row.item || "—"}</td>
                    <td>{Number(row.quantity) || 0}</td>
                    <td>₹ {Number(row.rate).toFixed(2)}</td>
                    <td>
                      ₹ {(Number(row.quantity) * Number(row.rate)).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex flex-column align-items-end mt-4">
            <table className="table w-50">
              <tbody>
                <tr>
                  <td>
                    <strong>Subtotal</strong>
                  </td>
                  <td className="text-end">₹ {Number(subtotal).toFixed(2)}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Discount</strong>
                  </td>
                  <td className="text-end">{Number(discount)}%</td>
                </tr>
                <tr>
                  <td>
                    <strong>GST</strong>
                  </td>
                  <td className="text-end">{Number(gst)}%</td>
                </tr>
                <tr>
                  <td>
                    <strong>Adjustment</strong>
                  </td>
                  <td className="text-end">
                    ₹ {Number(adjustment).toFixed(2)}
                  </td>
                </tr>
                <tr className="table-active">
                  <td>
                    <h5 className="mb-0">
                      <strong>Total</strong>
                    </h5>
                  </td>
                  <td className="text-end">
                    <h5 className="mb-0">₹ {Number(total).toFixed(2)}</h5>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

  
          {customerNotes?.trim() && (
            <div className="mt-4">
              <h6 className="text-secondary">Customer Notes</h6>
              <p>{customerNotes}</p>
            </div>
          )}

         
          {terms?.trim() && (
            <div className="mt-3">
              <h6 className="text-secondary">Terms & Conditions</h6>
              <p>{terms}</p>
            </div>
          )}
        </div>
      </div> */}

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
                  <td style={{ padding: "8px" }}>
                    <strong style={{ fontSize: "12px" }}>Subtotal</strong>
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "right",
                      fontSize: "12px",
                    }}
                  >
                    ₹ {Number(subtotal).toFixed(2)}
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px" }}>
                    <strong style={{ fontSize: "12px" }}>Discount</strong>
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "right",
                      fontSize: "12px",
                    }}
                  >
                    {Number(discount)}%
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px" }}>
                    <strong style={{ fontSize: "12px" }}>GST</strong>
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "right",
                      fontSize: "12px",
                    }}
                  >
                    {Number(gst)}%
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "8px" }}>
                    <strong style={{ fontSize: "12px" }}>Adjustment</strong>
                  </td>
                  <td
                    style={{
                      padding: "8px",
                      textAlign: "right",
                      fontSize: "12px",
                    }}
                  >
                    ₹ {Number(adjustment).toFixed(2)}
                  </td>
                </tr>
                <tr style={{ backgroundColor: "#f1f1f1" }}>
                  <td style={{ padding: "12px" }}>
                    <h4 style={{ margin: 0, fontSize: "12px" }}>
                      <strong>Total</strong>
                    </h4>
                  </td>
                  <td style={{ padding: "13px", textAlign: "right" }}>
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
              <h5 style={{ color: "#111", fontSize: "14px", marginBottom:"0" }}>
                Customer Notes
              </h5>
              <p style={{ fontSize: "12px" }}>{customerNotes}</p>
            </div>
          )}

          <hr/>

          {/* Terms & Conditions */}
          {terms?.trim() && (
            <div style={{ marginTop: "20px" }}>
              <h5 style={{ color: "#111", fontSize: "14px", marginBottom:"0" }}>
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
