import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // Check if all required fields are filled
  if (
    !formData.name ||
    !formData.email ||
    !formData.phone ||
    !formData.businessName
  ) {
    toast.error("Please fill in all required fields.");
    return;
  }

  try {
    const res = await fetch("/api/queries/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.success) {
      toast.success("Your request has been sent. We’ll be in touch soon.");

      setFormData({ name: "", email: "", phone: "", businessName: "" }); // reset form
    } else {
      toast.error("Failed to send message.");
    }
  } catch (error) {
    toast.error("Something went wrong!");
  }
};


  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const res = await fetch("/api/queries/contact", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });

  //     const data = await res.json();

  //     if (data.success) {
  //         toast.success("Your request has been sent. We’ll be in touch soon.");
        
  //       setFormData({ name: "", email: "", phone: "", businessName: "" }); // reset form
  //     } else {
  //       toast.error("Failed to send message.");
  //     }
  //   } catch (error) {
  //     toast.error("Something went wrong!");
  //   }
  // };

  return (
    <div className="container ptb-80">
      <div className="have-questions">
        <div className="left">
          <p className="subtitle">Have questions?</p>
          <h1>Send us Link Message</h1>
          {/* <form>
            <input type="text" placeholder="Name" />
            <div className="form-row">
              <input type="email" placeholder="Email*" />
              <input type="tel" placeholder="Phone" />
            </div>
            <textarea placeholder="Tell Us About Project *"></textarea>
            <button type="submit">Get In Touch</button>
          </form> */}

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
            />
            <div className="form-row">
              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
              />
            </div>
            <textarea
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Tell Us About Project *"
              required
            />
            <button type="submit">Get In Touch</button>
          </form>
          
        </div>
        <div className="right">
          <h2>Contact Info.</h2>
          <div>
            <h3>Location</h3>
            <p>
              1007, Tower B1, Floor 10th, DLF Mypad, Vibhuti Khand, Gomti Nagar
              Lucknow - 226010
            </p>
            <hr />
          </div>
          <div>
            <h3>Email</h3>
            <p>Info@viralon.in</p>
            <hr />
          </div>
          <div>
            <h3>Phone</h3>
            <p>+91 93054 51301</p>
            <hr />
          </div>
          <div className="social-icons">
            <Link href="#" aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link href="#" aria-label="YouTube">
              <i className="fab fa-youtube"></i>
            </Link>
            <Link href="#" aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </Link>
            <Link href="#" aria-label="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </Link>
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
