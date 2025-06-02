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

export default function QuoteList() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10; // Change to desired rows per page

  const [quotes, setQuotes] = useState([]);
  const [selectedQuote, setSelectedQuote] = useState(null);

  useEffect(() => {
    fetch("/api/sales/quotation/quote-list")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setQuotes(data.data);
        }
      })
      .catch((error) => console.error("Error fetching quotes:", error));
  }, []);

  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm Delete",
      message: "Are you sure you want to delete this quote?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const res = await fetch(`/api/sales/quotation/delete?id=${id}`, {
                method: "DELETE",
              });
              const data = await res.json();

              if (data.success) {
                toast.success("Quote deleted successfully.");
                setQuotes((prev) => prev.filter((q) => q._id !== id));
              } else {
                toast.error("Failed to delete quote.");
              }
            } catch (err) {
              console.error("Error deleting quote:", err);
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
                  Quotations
                  <small className="text-muted">Manage your quotes</small>
                </h2>
              </div>
              <div className="col-lg-5 col-md-6 col-sm-12">
                <div className="add-customer-btn d-flex justify-content-end mb-3">
                  <Link
                    href="/dashboard/sales/customers/new-quote"
                    className="btn btn-primary"
                  >
                    <i className="zmdi zmdi-plus mr-1"></i> New Quote
                  </Link>
                </div>
              </div>
            </div>

            <table className="table table-bordered table-striped">
              <thead>
                <tr>
                  <th>Quote Number</th>
                  <th>Customer Name</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {quotes
                  .slice(
                    (currentPage - 1) * rowsPerPage,
                    currentPage * rowsPerPage
                  )
                  .map((quote, idx) => (
                    <tr key={idx}>
                      <td>{quote.quoteNumber || "-"}</td>
                      <td>
                        {quote.customerId
                          ? `${quote.customerId.salutation || ""} ${quote.customerId.firstName || ""} ${quote.customerId.lastName || ""}`
                          : "-"}
                      </td>

                      {/* <td>{quote.quoteDate ? new Date(quote.quoteDate).toLocaleDateString() : "-"}</td> */}
                      <td>
                        {quote.quoteDate
                          ? new Date(quote.quoteDate).toLocaleDateString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              }
                            )
                          : "-"}
                      </td>

                      <td>{quote.total || "0.00"}</td>
                      <td>{quote.status || "Sent"}</td>
                      <td>
                        {/* <Link
                          href={`/dashboard/sales/customers/view-quote/${quote._id}`}
                          className="btn-delete"
                          title="View Quote"
                        >
                          <FaEye color="rgb(84 110 122)" />
                        </Link> */}

                        {/* <a
                          href={`/api/sales/quotation/pdf/${quote._id}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-delete"
                          title="View Quote"
                        >
                          <FaEye color="rgb(84 110 122)" />
                        </a> */}

                        <button
                          onClick={() => confirmDelete(quote._id)}
                          className="btn-delete ml-2"
                          title="Delete Quote"
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
                Page {currentPage} of {Math.ceil(quotes.length / rowsPerPage)}
              </span>

              <button
                className="circle-btn ms-3"
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, Math.ceil(quotes.length / rowsPerPage))
                  )
                }
                disabled={
                  currentPage === Math.ceil(quotes.length / rowsPerPage)
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
