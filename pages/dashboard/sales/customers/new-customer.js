import React from "react";
import Link from "next/link";
import Dashnav from "../../../../components/Dashnav";
import Leftbar from "../../../../components/Leftbar";
import Head from "next/head";
import { toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// for select dropdown -----

import Select from "react-select";
import { useState } from "react";
import { countryStateData } from "../../../../utils/countryStateData"; // adjust the path

export default function NewCustomers() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const countryOptions = Object.keys(countryStateData).map((country) => ({
    value: country,
    label: country,
  }));

  const stateOptions =
    selectedCountry && countryStateData[selectedCountry.value]
      ? countryStateData[selectedCountry.value].map((state) => ({
          value: state,
          label: state,
        }))
      : [];

  const customSelectStyles = {
    control: (provided, state) => ({
      ...provided,
      fontSize: "14px",
      color: "#6b7280",
      border: "1px solid #d1d5db",
      borderRadius: "6px",
      minHeight: "38px",
      height: "38px",
      backgroundColor: "white",
      boxShadow: state.isFocused ? "0 0 0 1px #3b82f6" : "none",
      "&:hover": {
        borderColor: "#a1a1aa",
      },
    }),
    valueContainer: (provided) => ({
      ...provided,
      height: "38px",
      padding: "0 12px",
      display: "flex",
      alignItems: "center",
    }),
    input: (provided) => ({
      ...provided,
      margin: "0px",
      padding: "0px",
      lineHeight: "1",
      height: "100%",
      display: "flex",
      alignItems: "center",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#6b7280",
      lineHeight: "1",
      display: "flex",
      alignItems: "center",
      height: "38px",
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af",
      fontSize: "14px",
      lineHeight: "38px",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "38px",
    }),
    menu: (provided) => ({
      ...provided,
      fontSize: "14px",
      zIndex: 100,
    }),
  };

  // const [files, setFiles] = useState([]);

  // ------- Customer Form -------------

  // const [formData, setFormData] = useState({
  //   customerType: "business",
  //   salutation: "",
  //   firstName: "",
  //   lastName: "",
  //   companyName: "",
  //   displayName: "",
  //   email: "",
  //   workPhone: "",
  //   mobile: "",
  //   pan: "",
  //   files: [], // for uploaded files

  //   billingAddress: {
  //     attention: "",
  //     country: "", // store country name or code
  //     address1: "",
  //     address2: "",
  //     city: "",
  //     state: "", // store state name or code
  //     pincode: "",
  //     phone: "",
  //     fax: "",
  //   },
  // });

  const initialFormData = {
    customerType: "business",
    salutation: "",
    firstName: "",
    lastName: "",
    companyName: "",
    displayName: "",
    email: "",
    workPhone: "",
    mobile: "",
    pan: "",
    files: [],
    billingAddress: {
      attention: "",
      country: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      pincode: "",
      phone: "",
      fax: "",
    },
  };

  const [formData, setFormData] = useState(initialFormData); // ✅ use initialFormData

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      files: Array.from(e.target.files), // convert FileList to array
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await fetch("/api/sales/customers/customer", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (!res.ok) {
  //       throw new Error(`Server error: ${res.status}`);
  //     }

  //     const data = await res.json();

  //     if (data.success) {
  //       alert("Customer saved successfully");

  //       // ✅ Reset form and dropdowns
  //       setFormData(initialFormData);
  //       setSelectedCountry(null);
  //       setSelectedState(null);
  //     } else {
  //       alert(data.message || "Error saving customer");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error saving customer");
  //   }
  // };




const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("/api/sales/customers/customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      throw new Error(`Server error: ${res.status}`);
    }

    const data = await res.json();

    if (data.success) {
      toast.success("Clients saved successfully");

      // ✅ Reset form and dropdowns
      setFormData(initialFormData);
      setSelectedCountry(null);
      setSelectedState(null);
    } else {
      toast.error(data.message || "Error saving Clients");
    }
  } catch (err) {
    console.error(err);
    toast.error("Error saving Clients");
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
                  New Customer
                  <small className="text-muted">Welcome to Viralon</small>
                </h2>
              </div>
              <div className="col-lg-5 col-md-6 col-sm-12">
                <ul className="breadcrumb float-md-right">
                  <li className="breadcrumb-item">
                    <Link href="/dashboard/dashboard">
                      <i className="zmdi zmdi-home"></i> Viralon /
                    </Link>
                  </li>
                  <li className="breadcrumb-item active">New Customer</li>
                </ul>
              </div>
            </div>

            <div className="admin">
              <form onSubmit={handleSubmit}>
                <div className="row align-items-center mb-3">
                  <div className="col-12 col-sm-2 d-flex align-items-center">
                    <label htmlFor="customer-type" className="mb-0">
                      Customer Type
                      <i
                        className="fas fa-info-circle info-icon"
                        title="Info"
                      ></i>
                    </label>
                  </div>
                  <div className="col-12 col-sm-9 radio-group d-flex align-items-center">
                    <label>
                      <input
                        type="radio"
                        name="customerType"
                        value="business"
                        checked={formData.customerType === "business"}
                        onChange={handleChange}
                      />
                      Business
                    </label>
                    <label>
                      <input
                        type="radio"
                        name="customerType"
                        value="individual"
                        checked={formData.customerType === "individual"}
                        onChange={handleChange}
                      />
                      Individual
                    </label>
                  </div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-12 col-sm-2 d-flex align-items-center">
                    <label htmlFor="primary-contact" className="mb-0">
                      Primary Contact
                      <i
                        className="fas fa-info-circle info-icon"
                        title="Info"
                      ></i>
                    </label>
                  </div>
                  <div className="col-12 col-sm-9 d-flex flex-wrap gap-3">
                    <select
                      name="salutation"
                      className="form-select f-select"
                      aria-label="Salutation"
                      value={formData.salutation}
                      onChange={handleChange}
                    >
                      <option value="">Salutation</option>
                      <option value="Mr.">Mr.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Miss">Miss</option>
                      <option value="Dr.">Dr.</option>
                    </select>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="form-control w-auto"
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      className="form-control w-auto"
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-12 col-sm-2 d-flex align-items-center">
                    <label htmlFor="company-name" className="mb-0">
                      Company Name
                    </label>
                  </div>
                  <div className="col-12 col-sm-9">
                    <input
                      type="text"
                      id="company-name"
                      name="companyName"
                      className="form-control"
                      value={formData.companyName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-12 col-sm-2 d-flex align-items-center">
                    <label
                      htmlFor="display-name"
                      className="mb-0 d-flex align-items-center gap-1"
                    >
                      <span className="text-red">Display Name*</span>
                      <i
                        className="fas fa-info-circle info-icon"
                        title="Info"
                      ></i>
                    </label>
                  </div>
                  <div className="col-12 col-sm-9">
                    <select
                      id="display-name"
                      name="displayName"
                      value={formData.displayName}
                      className="form-select "
                      aria-label="Display Name"
                      onChange={handleChange}
                    >
                      <option value="">Select or type to add</option>
                      <option
                        value={formData.firstName + " " + formData.lastName}
                      >
                        {formData.firstName + " " + formData.lastName}
                      </option>
                    </select>
                  </div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-12 col-sm-2 d-flex align-items-center">
                    <label htmlFor="email" className="mb-0">
                      Email Address
                      <i
                        className="fas fa-info-circle info-icon"
                        title="Info"
                      ></i>
                    </label>
                  </div>
                  <div className="col-12 col-sm-9 input-icon">
                    {/* <i className="far fa-envelope"></i> */}
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      aria-label="Email Address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row align-items-center mb-3">
                  <div className="col-12 col-sm-2 d-flex align-items-center">
                    <label htmlFor="phone" className="mb-0">
                      Phone
                      {/* <i
                      className="fas fa-info-circle info-icon"
                      title="Info"
                    ></i> */}
                    </label>
                  </div>
                  <div className="col-12 col-sm-9 d-flex flex-wrap gap-3">
                    <div className="input-icon w-auto">
                      {/* <i className="fas fa-phone"></i> */}
                      <input
                        type="text"
                        name="workPhone"
                        placeholder="Work Phone"
                        className="form-control"
                        aria-label="Work Phone"
                        value={formData.workPhone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input-icon w-auto">
                      {/* <i className="fas fa-mobile-alt"></i> */}
                      <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile"
                        className="form-control"
                        aria-label="Mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="other-info container py-4">
                  {/* <!-- Tabs nav --> */}
                  <ul
                    className="nav nav-tabs mb-4"
                    id="formTabs"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active fw-semibold"
                        id="other-details-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#other-details"
                        type="button"
                        role="tab"
                        aria-controls="other-details"
                        aria-selected="true"
                      >
                        Other Details
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="address-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#address"
                        type="button"
                        role="tab"
                        aria-controls="address"
                        aria-selected="false"
                      >
                        Address
                      </button>
                    </li>
                    {/* <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="contact-persons-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#contact-persons"
                        type="button"
                        role="tab"
                        aria-controls="contact-persons"
                        aria-selected="false"
                      >
                        Contact Persons
                      </button>
                    </li> */}
                  </ul>

                  <div className="tab-content" id="formTabsContent">
                    <div
                      className="tab-pane fade show active"
                      id="other-details"
                      role="tabpanel"
                      aria-labelledby="other-details-tab"
                      tabIndex="0"
                    >
                      <div className="row g-3 align-items-center mb-3">
                        <label
                          htmlFor="pan"
                          className="col-sm-2 col-form-label fw-normal"
                        >
                          PAN
                        </label>
                        <div className="col-sm-10 d-flex align-items-center">
                          <input
                            type="text"
                            id="pan"
                            name="pan"
                            className="form-control"
                            aria-describedby="panHelp"
                            autoComplete="off"
                            onChange={handleChange}
                          />
                          <span
                            className="info-icon"
                            title="Permanent Account Number"
                          >
                            i
                          </span>
                        </div>
                      </div>

                      {/* <div className="row g-3 align-items-start mb-3">
                        <label
                          htmlFor="fileUpload"
                          className="col-sm-2 col-form-label fw-normal pt-2"
                        >
                          Documents
                        </label>
                        <div className="col-sm-10 d-flex flex-column">
                          <label
                            htmlFor="fileUpload"
                            className="form-control btn btn-outline-secondary btn-upload w-auto mb-1"
                          >
                            <i className="fas fa-upload"></i> Upload File{" "}
                            <i className="fas fa-caret-down"></i>
                          </label>
                          <input
                            type="file"
                            id="fileUpload"
                            name="files"
                            className="d-none"
                            multiple
                            accept="*"
                            onChange={handleFileChange}
                          />
                          <small className="text-muted">
                            You can upload a maximum of 10 files, 10MB each
                          </small>
                        </div>
                      </div> */}
                    </div>

                    <div
                      className="tab-pane fade"
                      id="address"
                      role="tabpanel"
                      aria-labelledby="address-tab"
                      tabIndex="0"
                    >
                      <div className="other-info">
                        <h2>Billing Address</h2>

                        <div className="row g-3 align-items-center">
                          <label
                            htmlFor="attention"
                            className="col-sm-2 col-form-label"
                          >
                            Attention
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              id="attention"
                              className="form-control"
                              value={formData.billingAddress.attention}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  billingAddress: {
                                    ...formData.billingAddress,
                                    attention: e.target.value,
                                  },
                                })
                              }
                            />
                          </div>

                          <label
                            htmlFor="country"
                            className="col-sm-2 col-form-label"
                          >
                            Country/Region
                          </label>
                          {/* <div className="col-sm-10">
                            <Select
                              styles={customSelectStyles}
                              id="country"
                              options={countryOptions}
                              value={selectedCountry}
                              onChange={(option) => {
                                setSelectedCountry(option);
                                setSelectedState(null); // Reset state on country change
                              }}
                              placeholder="Select or search country"
                            />
                          </div> */}

                          <div className="col-sm-10">
                            <Select
                              styles={customSelectStyles}
                              id="country"
                              options={countryOptions}
                              value={
                                formData.billingAddress.country
                                  ? {
                                      label: formData.billingAddress.country,
                                      value: formData.billingAddress.country,
                                    }
                                  : null
                              }
                              onChange={(option) => {
                                setFormData((prev) => ({
                                  ...prev,
                                  billingAddress: {
                                    ...prev.billingAddress,
                                    country: option.label, // or option.value if you're using country codes
                                    state: "", // reset state on country change
                                  },
                                }));
                                setSelectedCountry(option);
                                setSelectedState(null); // Optional: reset local state if you're using it for UI
                              }}
                              placeholder="Select or search country"
                            />
                          </div>

                          <label
                            htmlFor="address1"
                            className="col-sm-2  col-form-label"
                          >
                            Address
                          </label>
                          {/* <div className="col-sm-10 ">
                            <textarea
                              id="address1"
                              rows="2"
                              placeholder="Street 1"
                              className="form-control"
                            ></textarea>
                          </div> */}

                          <div className="col-sm-10 ">
                            <textarea
                              id="address1"
                              rows="2"
                              placeholder="Street 1"
                              className="form-control"
                              value={formData.billingAddress.address1 || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  billingAddress: {
                                    ...prev.billingAddress,
                                    address1: e.target.value,
                                  },
                                }))
                              }
                            />
                          </div>

                          <label className="col-sm-2"></label>
                          {/* <div className="col-sm-10 ">
                            <textarea
                              id="address2"
                              rows="2"
                              placeholder="Street 2"
                              className="form-control"
                            ></textarea>
                          </div> */}

                          <div className="col-sm-10 ">
                            <textarea
                              id="address2"
                              rows="2"
                              placeholder="Street 2"
                              className="form-control"
                              value={formData.billingAddress.address2 || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  billingAddress: {
                                    ...prev.billingAddress,
                                    address2: e.target.value,
                                  },
                                }))
                              }
                            />
                          </div>

                          <label
                            htmlFor="city"
                            className="col-sm-2 col-form-label"
                          >
                            City
                          </label>
                          {/* <div className="col-sm-10">
                            <input type="text" id="city" className="form-control" />
                          </div> */}

                          <div className="col-sm-10">
                            <input
                              type="text"
                              id="city"
                              className="form-control"
                              value={formData.billingAddress.city || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  billingAddress: {
                                    ...prev.billingAddress,
                                    city: e.target.value,
                                  },
                                }))
                              }
                            />
                          </div>

                          <label
                            htmlFor="state"
                            className="col-sm-2 col-form-label"
                          >
                            State
                          </label>
                          {/* <div className="col-sm-10">
                            <Select
                              styles={customSelectStyles}
                              id="state"
                              options={stateOptions}
                              value={selectedState}
                              onChange={(option) => setSelectedState(option)}
                              placeholder="Select or search state"
                              isDisabled={!selectedCountry}
                            />
                          </div> */}

                          <div className="col-sm-10">
                            <Select
                              styles={customSelectStyles}
                              id="state"
                              options={stateOptions}
                              value={
                                formData.billingAddress.state
                                  ? {
                                      label: formData.billingAddress.state,
                                      value: formData.billingAddress.state,
                                    }
                                  : null
                              }
                              onChange={(option) => {
                                setFormData((prev) => ({
                                  ...prev,
                                  billingAddress: {
                                    ...prev.billingAddress,
                                    state: option.label, // or option.value, depending on your design
                                  },
                                }));
                                setSelectedState(option);
                              }}
                              placeholder="Select or search state"
                              isDisabled={!selectedCountry}
                            />
                          </div>

                          {/* 
                          <label htmlFor="pincode" className="col-sm-2 col-form-label">
                            Pin Code
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              id="pincode"
                              className="form-control"
                            />
                          </div>

                          <label htmlFor="phone" className="col-sm-2 col-form-label">
                            Phone
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              id="phone"
                              className="form-control"
                            />
                          </div>

                          <label htmlFor="fax" className="col-sm-2 col-form-label">
                            Fax Number
                          </label>
                          <div className="col-sm-10">
                            <input type="text" id="fax" className="form-control" />
                          </div> */}

                          <label
                            htmlFor="pincode"
                            className="col-sm-2 col-form-label"
                          >
                            Pin Code
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              id="pincode"
                              className="form-control"
                              value={formData.billingAddress.pincode || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  billingAddress: {
                                    ...prev.billingAddress,
                                    pincode: e.target.value,
                                  },
                                }))
                              }
                            />
                          </div>

                          <label
                            htmlFor="phone"
                            className="col-sm-2 col-form-label"
                          >
                            Phone
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              id="phone"
                              className="form-control"
                              value={formData.billingAddress.phone || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  billingAddress: {
                                    ...prev.billingAddress,
                                    phone: e.target.value,
                                  },
                                }))
                              }
                            />
                          </div>

                          <label
                            htmlFor="fax"
                            className="col-sm-2 col-form-label"
                          >
                            Fax Number
                          </label>
                          <div className="col-sm-10">
                            <input
                              type="text"
                              id="fax"
                              className="form-control"
                              value={formData.billingAddress.fax || ""}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  billingAddress: {
                                    ...prev.billingAddress,
                                    fax: e.target.value,
                                  },
                                }))
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* <div
                      className="tab-pane fade"
                      id="contact-persons"
                      role="tabpanel"
                      aria-labelledby="contact-persons-tab"
                      tabindex="0"
                    >
                    </div> */}
                  </div>

                  <div
                    className="border-top pt-3 mt-4 d-flex gap-2"
                    // style="max-width: 320px;"
                  >
                    <button type="submit" className="btn btn-primary px-4">
                      Save
                    </button>
                    <button type="button" className="btn btn-secondary px-4">
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
