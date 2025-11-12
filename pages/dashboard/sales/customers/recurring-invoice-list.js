
import Link from "next/link";
import Dashnav from "../../../../components/Dashnav";
import Leftbar from "../../../../components/Leftbar";
import Head from "next/head";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function RecurringInvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;
  const [filter, setFilter] = useState({ name: "", frequency: "" });

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        const res = await fetch("/api/sales/invoice/recurring-list");
        const data = await res.json();
        if (data.success) {
          setInvoices(data.data);
        } else {
          toast.error("Failed to fetch invoices.");
        }
      } catch (error) {
        toast.error("Server error while fetching data.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices();
  }, []);

  const startIndex = (currentPage - 1) * rowsPerPage;
  const filteredInvoices = invoices.filter((inv) => {
    return (
      inv.customerName.toLowerCase().includes(filter.name.toLowerCase()) &&
      inv.frequency.toLowerCase().includes(filter.frequency.toLowerCase())
    );
  });

  const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + rowsPerPage);

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
                  All Recurring Invoices
                  <small className="text-muted">Manage your recurring billing</small>
                </h2>
              </div>
              <div className="col-lg-5 col-md-6 col-sm-12">
                <div className="add-customer-btn d-flex justify-content-end mb-3">
                  <Link
                    href="/dashboard/sales/customers/recurring-invoice"
                    className="btn btn-primary"
                  >
                    <i className="zmdi zmdi-plus mr-1"></i> New
                  </Link>
                </div>
              </div>
            </div>

            <div className="row g-3 mb-3 filters">
              <div className="col-md-6">
                <input
                  type="text"
                  placeholder="Filter by Customer Name"
                  className="form-control"
                  value={filter.name}
                  onChange={(e) => setFilter({ ...filter, name: e.target.value })}
                />
              </div>
              <div className="col-md-6">
                <select
                  className="form-control"
                  value={filter.frequency}
                  onChange={(e) => setFilter({ ...filter, frequency: e.target.value })}
                >
                  <option value="">All Frequencies</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
            </div>

            <div className="table-responsive mt-4">
              <table className="table table-bordered table-striped">
                <thead className="bg-gray-100">
                  <tr>
                    <th>Customer Name</th>
                    <th>Frequency</th>
                    <th>Last Invoice Date</th>
                    <th>Next Invoice Date</th>
                    {/* <th>Status</th> */}
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        Loading...
                      </td>
                    </tr>
                  ) : paginatedInvoices.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="text-center py-4">
                        No recurring invoices found.
                      </td>
                    </tr>
                  ) : (
                    paginatedInvoices.map((inv) => (
                      <tr key={inv._id}>
                        <td>{inv.customerName}</td>
                        <td>{inv.frequency}</td>
                        <td>{inv.lastInvoiceDate}</td>
                        <td>{inv.nextInvoiceDate}</td>
                        {/* <td className="text-success fw-bold">{inv.status}</td> */}
                        <td>₹{inv.amount?.toLocaleString()}</td>
                      </tr>
                    ))
                  )}
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
                Page {currentPage} of {Math.ceil(filteredInvoices.length / rowsPerPage)}
              </span>

              <button
                className="circle-btn ms-3"
                onClick={() =>
                  setCurrentPage((prev) =>
                    Math.min(prev + 1, Math.ceil(filteredInvoices.length / rowsPerPage))
                  )
                }
                disabled={currentPage === Math.ceil(filteredInvoices.length / rowsPerPage)}
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
