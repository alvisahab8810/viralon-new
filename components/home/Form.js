import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Form() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    formType: "Query Form", // include this
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    // Check if all fields are filled
    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.businessName
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const res = await fetch("/api/queries/query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    if (data.success) {
      toast.success("Your request has been sent. We’ll be in touch soon.");

      setFormData({
        name: "",
        email: "",
        phone: "",
        businessName: "",
      
      });
    } else {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="parallax-section">
      <section className="form-section ">
        <div className="container bg-linear parallax-section ptb-80">
          <div className="form-container d-flex flex-column flex-md-row">
            <div className="form-image col-md-6 d-none d-md-block">
              <img src="/assets/img/home/cta.webp"></img>
            </div>
            <div className="form-content col-12 col-md-6 d-flex flex-column justify-content-center">
              <img
                src="/assets/img/shape/ellipse.png"
                className="shape p-absolute"
              ></img>
              <h1 className="anton-regular">READY TO COLLABORATE?</h1>
              <p>LET'S TALK YOUR NEEDS</p>
              {/* <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email Address"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="IND (+91) Phone Number"
                  />
                </div>

                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Business Name"
                  />
                </div>
                <button type="submit" className="btn-submit">
                  SUBMIT
                </button>
              </form> */}

              <form onSubmit={handleSubmit}>
                <input type="hidden" name="formType" value="Query Form" />

                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="phone"
                    className="form-control"
                    placeholder="IND (+91) Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="businessName"
                    className="form-control"
                    placeholder="Business Name"
                    value={formData.businessName}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn-submit">
                  SUBMIT
                </button>
              </form>
            </div>

            <div className="form-image col-md-6 desktop-none pt-25">
              <img src="/assets/img/home/mobile-form.png"></img>
            </div>
          </div>
        </div>
      </section>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
