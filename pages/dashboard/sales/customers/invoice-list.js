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
                  Invoices
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

            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Invoice Number</th>
                  <th>Customer Name</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices
                  .slice(
                    (currentPage - 1) * rowsPerPage,
                    currentPage * rowsPerPage
                  )
                  .map((invoice, idx) => (
                    <tr key={idx}>
                      <td>{invoice.invoiceNumber || "-"}</td>
                      <td>
                        {invoice.customerId
                          ? `${invoice.customerId.salutation || ""} ${invoice.customerId.firstName || ""} ${invoice.customerId.lastName || ""}`
                          : "-"}
                      </td>
                      <td>
                        {invoice.invoiceDate
                          ? new Date(invoice.invoiceDate).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })
                          : "-"}
                      </td>
                      <td>{invoice.total || "0.00"}</td>
                      <td>{invoice.status || "Sent"}</td>
                      <td>
                        <button
                          onClick={() => confirmDelete(invoice._id)}
                          className="btn-delete ml-2"
                          title="Delete Invoice"
                        >
                          <FaTrash color="#FF6F61" />
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
          </div>
        </section>
      </div>

      <ToastContainer />
    </div>
  );
}
