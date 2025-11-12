"use client";

import React, { useEffect } from "react";

import { useState } from "react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function PopupModal() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    formIdentifier: "form3",
    fname: "",
    country_code: "91",
    fphone: "",
    femail: "",
    fbusinessName: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loadingToast = toast.loading("Submitting your details...");

    try {
      const res = await fetch("/api/landing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      toast.dismiss(loadingToast);

      if (data.success) {
        toast.success(data.message);

        // optional: prevent thank-you refresh abuse
        sessionStorage.setItem("formSubmitted", "true");

        setTimeout(() => {
          router.push("/thank-you");
        }, 1000);

        // reset form fields
        setFormData({
          formIdentifier: "form3",
          fname: "",
          country_code: "91",
          fphone: "",
          femail: "",
          fbusinessName: "",
        });
      } else {
        toast.error(data.message || "Submission failed!");
      }
    } catch (err) {
      console.error("Error submitting popup form:", err);
      toast.dismiss(loadingToast);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  useEffect(() => {
    // Optional: automatically open modal 2 seconds after load (like your jQuery version)
    const timer = setTimeout(() => {
      const modalEl = document.getElementById("exampleModalCenter");
      if (modalEl && window.bootstrap) {
        const modal = new window.bootstrap.Modal(modalEl);
        modal.show();
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="modal popup-modal fade"
      id="exampleModalCenter"
      tabIndex="-1"
      aria-labelledby="exampleModalCenterTitle"
      aria-modal="true"
      role="dialog"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body">
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>

            <div className="bx-2">
              <div className="bx-60 bg-dark">
                <div className="contact-form">
                  <form
                    id="popupForm"
                    onSubmit={handleSubmit}
                    autoComplete="off"
                  >
                    <h3 className="title text-center">Let's Talk</h3>
                    <input type="hidden" name="formIdentifier" value="form3" />

                    <div className="input-container">
                      <input
                        type="text"
                        name="fname"
                        className="input"
                        placeholder="Full Name*"
                        value={formData.fname}
                        onChange={handleChange}
                        required
                      />
                      <span>Full Name*</span>
                    </div>

                    <div className="input-container d-flex position-relative">
                      <select
                        name="country_code"
                        id="country_code"
                        className="input1 c-drop"
                        value={formData.country_code}
                        onChange={handleChange}
                        required
                      >
                        <option value="91">IND (+91)</option>
                        <option value="971">UAE (+971)</option>
                        <option value="1">US (+1)</option>
                        <option value="61">AUS (+61)</option>
                        <option value="44">UK (+44)</option>
                      </select>

                      <input
                        type="tel"
                        name="fphone"
                        className="input padding-left-110"
                        pattern="[0-9]{10}"
                        maxLength="10"
                        minLength="10"
                        placeholder="Phone Number*"
                        value={formData.fphone}
                        onChange={handleChange}
                        required
                      />
                      <span>Phone*</span>
                    </div>

                    <div className="input-container">
                      <input
                        type="email"
                        name="femail"
                        className="input"
                        placeholder="Email*"
                        value={formData.femail}
                        onChange={handleChange}
                        required
                      />
                      <span>Email*</span>
                    </div>

                    <div className="input-container">
                      <input
                        type="text"
                        name="fbusinessName"
                        className="input"
                        placeholder="Business Name*"
                        value={formData.fbusinessName}
                        onChange={handleChange}
                        required
                      />
                      <span>Business Name*</span>
                    </div>

                    <input type="submit" value="Submit" className="popup-btn" />
                  </form>
                  {/* <form
                    id="popupForm"
                    action=""
                    method="post"
                    autoComplete="off"
                  >
                    <h3 className="title text-center">Let's Talk</h3>

                    <input
                      type="hidden"
                      name="formIdentifier"
                      value="form3"
                    />

                    <div className="input-container">
                      <input
                        type="text"
                        name="fname"
                        className="input"
                        placeholder="Full Name*"
                        required
                      />
                      <span>Full Name*</span>
                    </div>

                    <div className="input-container d-flex position-relative">
                      <select
                        name="country_code"
                        id="country_code"
                        className="input1 c-drop"
                        required
                      >
                        <option value="91">IND (+91)</option>
                        <option value="971">UAE (+971)</option>
                        <option value="1">US (+1)</option>
                        <option value="61">AUS (+61)</option>
                        <option value="44">UK (+44)</option>
                      </select>

                      <input
                        type="tel"
                        name="fphone"
                        className="input padding-left-110"
                        pattern="[0-9]{10}"
                        maxLength="10"
                        minLength="10"
                        placeholder="Phone Number*"
                        required
                      />
                      <span>Phone*</span>
                    </div>

                    <div className="input-container">
                      <input
                        type="email"
                        name="femail"
                        className="input"
                        placeholder="Email*"
                        required
                      />
                      <span>Email*</span>
                    </div>

                    <div className="input-container">
                      <input
                        type="text"
                        name="fbusinessName"
                        className="input"
                        placeholder="Business Name*"
                        required
                      />
                      <span>Business Name*</span>
                    </div>

                    <input
                      type="submit"
                      value="Submit"
                      className="popup-btn"
                    />
                    <div id="message"></div>
                  </form> */}
                </div>

                <img
                  src="../assetss/images/your-brands.png"
                  className="footer-img"
                  alt="Viralon Image"
                />
              </div>

              <div className="bx-40 bg-pop-image"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
