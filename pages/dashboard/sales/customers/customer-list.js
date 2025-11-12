      import Link from "next/link";
      import Dashnav from "../../../../components/Dashnav";
      import Leftbar from "../../../../components/Leftbar";
      import Head from "next/head";
      import React, { useState, useEffect } from "react";
      import CustomerProfileModal from "../../../../components/CustomerProfileModal";
      import { FaTrash, FaEye } from "react-icons/fa";

      import { confirmAlert } from "react-confirm-alert";
      import "react-confirm-alert/src/react-confirm-alert.css";
      import { toast } from "react-toastify";
      import "react-toastify/dist/ReactToastify.css";
      import { ToastContainer } from "react-toastify";

      export default function CustomerList() {
        const [customers, setCustomers] = useState([]);
        const [selectedCustomer, setSelectedCustomer] = useState(null);
        const [showModal, setShowModal] = useState(false);
        const [page, setPage] = useState(1);
        const ROWS_PER_PAGE = 10;
        const [search, setSearch] = useState("");

        useEffect(() => {
          fetch("/api/sales/customers/customer")
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                setCustomers(data.data);
              }
            })
            .catch((error) => console.error("Error fetching customers:", error));
        }, []);

        const openModal = (customer) => {
          setSelectedCustomer(customer);
          setShowModal(true);
        };

        const closeModal = () => {
          setSelectedCustomer(null);
          setShowModal(false);
        };

        // ----------------------------- for delete ------------------------

        const confirmDelete = (id, formType) => {
          confirmAlert({
            title: "Confirm Delete",
            message: `Are you sure you want to delete this ${formType}?`,
            buttons: [
              {
                label: "Yes",
                onClick: async () => {
                  const endpoint = `/api/sales/customers/delete?id=${id}`;

                  try {
                    const res = await fetch(endpoint, { method: "DELETE" });
                    const data = await res.json();

                    if (data.success) {
                      toast.success(`${formType} deleted successfully.`);
                      setCustomers((prev) => prev.filter((c) => c._id !== id));
                    } else {
                      toast.error(`Failed to delete ${formType}. Please try again.`);
                    }
                  } catch (err) {
                    console.error(`Error deleting ${formType}:`, err);
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

        const filtered = customers.filter((c) => {
          const fullName = `${c.firstName} ${c.lastName}`.toLowerCase();
          return (
            fullName.includes(search.toLowerCase()) ||
            c.email?.toLowerCase().includes(search.toLowerCase()) ||
            c.companyName?.toLowerCase().includes(search.toLowerCase())
          );
        });

        const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));
        const pageRows = [...filtered]
          .reverse()
          .slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

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
                        Active Clients
                        <small className="text-muted">Welcome to Viralon</small>
                      </h2>
                    </div>
                    <div className="col-lg-5 col-md-6 col-sm-12">
                      <div className="add-customer-btn d-flex justify-content-end mb-3">
                        <Link
                          href="/dashboard/sales/customers/new-customer"
                          type="button"
                          className="btn btn-primary"
                          data-toggle="tooltip"
                          data-placement="top"
                          title="Add New Clients"
                        >
                          <i className="zmdi zmdi-plus mr-1"></i> New
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="row g-3 mb-3 filters">
                    <div className="col-md-4">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name, email or company..."
                        value={search}
                        onChange={(e) => {
                          setPage(1); // reset to first page
                          setSearch(e.target.value);
                        }}
                        style={{ maxWidth: "300px" }}
                      />
                    </div>
                  </div>

                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>Business Type</th>
                        <th>Salutation</th>
                        <th>Full Name</th>
                        <th>Company Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>GST</th>
                        <th>Actions</th> {/* Add a heading for action buttons */}
                      </tr>
                    </thead>
                    <tbody>
                      {/* {customers.map((customer, idx) => ( */}
                      {/* {[...customers].reverse().map((customer, idx) => (

                        
                        <tr key={idx}>
                          <td>{customer.customerType}</td>
                          <td>{customer.salutation}</td>
                          <td>
                            {customer.firstName} {customer.lastName}
                          </td>
                          <td>{customer.companyName}</td>
                          <td>{customer.email}</td>
                          <td>{customer.mobile}</td>
                          <td>{customer.gst}</td>

                          <td className="d-flex">
                            <button
                              onClick={() => openModal(customer)} 
                              className="btn-delete"
                              title="View Clients"
                            >
                              <FaEye color="rgb(84 110 122);" />
                            </button>
                          
                          </td>
                        </tr>
                      ))} */}

                      {pageRows.map((customer, idx) => (
                        <tr key={idx}>
                          <td>{customer.customerType}</td>
                          <td>{customer.salutation}</td>
                          <td>
                            {customer.firstName} {customer.lastName}
                          </td>
                          <td>{customer.companyName}</td>
                          <td>{customer.email}</td>
                          <td>{customer.mobile}</td>
                          <td>{customer.gst}</td>
                          <td className="d-flex">
                            <button
                              onClick={() => openModal(customer)}
                              className="btn-delete"
                              title="View Clients"
                            >
                              <FaEye color="rgb(84 110 122)" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <CustomerProfileModal
                    customer={selectedCustomer}
                    show={!!selectedCustomer}
                    onClose={() => setSelectedCustomer(null)}
                  />
                </div>

                {/* pagination controls */}
                {customers.length > ROWS_PER_PAGE && (
                  <div className="pagination-controls mt-3 d-flex justify-content-center align-items-center">
                    <button
                      className="circle-btn me-3"
                      disabled={page === 1}
                      onClick={() => setPage((p) => Math.max(p - 1, 1))}
                    >
                      <i className="zmdi zmdi-chevron-left"></i>
                    </button>
                    <span>
                      Page {page} / {totalPages}
                    </span>
                    <button
                      className="circle-btn ms-3"
                      disabled={page === totalPages}
                      onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                    >
                      <i className="zmdi zmdi-chevron-right"></i>
                    </button>
                  </div>
                )}
              </section>
            </div>
            <ToastContainer />
          </div>
        );
      }
