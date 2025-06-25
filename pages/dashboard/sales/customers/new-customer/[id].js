import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Select from "react-select";
import { useEffect, useState } from "react";
import Dashnav from "../../../../../components/Dashnav";
import Leftbar from "../../../../../components/Leftbar";
import { countryStateData } from "../../../../../utils/countryStateData"; // adjust the path

export default function NewCustomerForm() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  const countryOptions = Object.keys(countryStateData).map((country) => ({
    value: country,
    label: country,
  }));

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

  const stateOptions =
    selectedCountry && countryStateData[selectedCountry.value]
      ? countryStateData[selectedCountry.value].map((state) => ({
          value: state,
          label: state,
        }))
      : [];

  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState({
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
    gst: "",
    billingAddress: {
      attention: "",
      country: "",
      state: "",
      address1: "",
      address2: "",
      city: "",
      pincode: "",
      phone: "",
      fax: "",
    },
  });

  useEffect(() => {
    if (!id) return;

    fetch(`/api/clients/${id}`)
      .then((res) => res.json())
      .then((client) => {
        setFormData({
          customerType: "business",
          salutation: "",
          firstName: client.firstName || "",
          lastName: client.lastName || "",
          email: client.email || "",
          companyName: client.businessName || "",
          workPhone: client.phone || "",
          mobile: "",
          displayName: client.name || "",
          billingAddress: {
            attention: client.billingAttention || "",
            country: client.billingCountry || "",
            address1: client.billingAddress1 || "",
            address2: client.billingAddress2 || "",
            city: client.billingCity || "",
            state: client.billingState || "",
            pincode: client.billingPincode || "",
            phone: client.billingPhone || "",
            fax: client.billingFax || "",
          },
        });
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/sales/customers/customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("Customer added successfully");
      router.push("/dashboard/sales/customers");
    } else {
      alert("Failed to add customer");
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
                {/* === YOUR FORM JSX START === */}

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
                      className="form-select"
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
                    </label>
                  </div>
                  <div className="col-12 col-sm-9 d-flex flex-wrap gap-3">
                    <div className="input-icon w-auto">
                      <input
                        type="text"
                        name="workPhone"
                        placeholder="Work Phone"
                        className="form-control"
                        aria-label="Work Phone"
                        maxLength={10}
                        pattern="\d{10}"
                        inputMode="numeric"
                        value={formData.workPhone}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="input-icon w-auto">
                      <input
                        type="text"
                        name="mobile"
                        placeholder="Mobile"
                        className="form-control"
                        aria-label="Mobile"
                        maxLength={10}
                        pattern="\d{10}"
                        inputMode="numeric"
                        value={formData.mobile}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="other-info container py-4">
                  {/* Tabs Nav */}
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
                  </ul>

                  <div className="tab-content" id="formTabsContent">
                    {/* Other Details Tab */}
                    <div
                      className="tab-pane fade show active"
                      id="other-details"
                      role="tabpanel"
                      aria-labelledby="other-details-tab"
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
                            value={formData.pan}
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

                      <div className="row g-3 align-items-center mb-3">
                        <label
                          htmlFor="gst"
                          className="col-sm-2 col-form-label fw-normal"
                        >
                          GST
                        </label>
                        <div className="col-sm-10 d-flex align-items-center">
                          <input
                            type="text"
                            id="gst"
                            name="gst"
                            className="form-control"
                            value={formData.gst}
                            onChange={handleChange}
                          />
                          <span
                            className="info-icon"
                            title="Goods & Services Tax"
                          >
                            i
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Address Tab */}
                    <div
                      className="tab-pane fade"
                      id="address"
                      role="tabpanel"
                      aria-labelledby="address-tab"
                    >
                      <div className="other-info">
                        <h2>Billing Address</h2>

                        <div className="row g-3 align-items-center">
                          <label
                            htmlFor="attention"
                            className="col-sm-2 col-form-label"
                          >
                            Full Name
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
                              maxLength={10} // ✅ limits to 10 characters
                              pattern="\d{10}" // ✅ optional, for HTML validation (digits only)
                              inputMode="numeric" // ✅ improves mobile keyboard behavior
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
                              maxLength={10} // ✅ limits to 10 characters
                              pattern="\d{10}" // ✅ optional, for HTML validation (digits only)
                              inputMode="numeric" // ✅ improves mobile keyboard behavior
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
                      {/* Repeat billing address fields here */}
                      {/* Use the structure you already have, wrapped with Select components and formData.billingAddress references */}
                    </div>
                  </div>
                </div>

                <div className="text-end">
                  <button type="submit" className="btn btn-primary">
                    Save Customer
                  </button>
                </div>

                {/* === YOUR FORM JSX END === */}
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
