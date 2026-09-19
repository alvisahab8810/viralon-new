// components/contact-us/Contact.js — the contact page's "Send us a message"
// block: the lead form on the left, the office details on the right.
//
// The form asks exactly what the enquiry popup asks (name, email, phone,
// business name, whether they are running ads) and posts to exactly the same place,
// /api/queries/query, so the lead lands in the same "queries" collection and
// shows up in the CRM at Website → Leads alongside every other enquiry. The
// only difference is formType, which is sent as "Contact Form" so the board's
// Form column says where the lead came from.
//
// The popup's form is components/home/Form.js and is deliberately not touched
// or reused here: that component is the CTA panel, with its own coral layout.
// What the two share — the source tracking, the conversion signal and the
// running-ads list — lives in utils/leadTracking.js, so the two forms cannot drift
// apart on the parts that matter to the CRM.
//
// Validation matches the popup rule for rule (all fields required, a real
// looking email, exactly ten digits of phone, an answer picked), because the API
// enforces the same rules and a mismatch would only show up as a failed submit.
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useRef, useState } from "react";
import { readSource, fireLead, RUNNING_ADS, RUNNING_ADS_LABEL } from "../../utils/leadTracking";

export default function Contact() {
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    runningAds: "",
    formType: "Contact Form",
  });

  const [website, setWebsite] = useState("");   // honeypot — people never see it
  const openedAt = useRef(Date.now());
  const source   = useRef({});

  useEffect(() => { source.current = readSource(); }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Indian mobile — digits only, exactly 10.
    if (name === "phone") {
      setFormData({ ...formData, phone: value.replace(/\D/g, "").slice(0, 10) });
      return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.businessName.trim() ||
      !formData.phone ||
      !formData.email.trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }
    if (formData.phone.length !== 10) {
      toast.error("Phone number must be exactly 10 digits.");
      return;
    }
    // The CRM qualifies off this, so it can't be left blank.
    if (!formData.runningAds) {
      toast.error("Please tell us if you are running ads at the moment.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/queries/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          email: formData.email.trim(),
          website,
          elapsed: Date.now() - openedAt.current,
          source: source.current,
        }),
      });
      const data = await res.json();
      if (data.success) {
        fireLead({
          lead_id: data.queryId || "",
          running_ads: formData.runningAds || "",
          ...source.current,
        });
        setDone(true);
      } else {
        // A duplicate email or phone comes back with its own wording, which is
        // friendlier than a generic failure — show whatever the API said.
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
    setSaving(false);
  };

  return (
    <div className="container ptb-80">
      <div className="have-questions">
        <div className="left">
          <p className="subtitle">Have questions?</p>
          <h1>Send us a Message</h1>

          {done ? (
            <div className="cnt-thanks">
              <h2>Thank you.</h2>
              <p>
                Your request is with our team. We will call you on the number
                you left, usually within one working day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {/* Sent with the lead so the CRM board can show where it came
                  from; never shown, never edited. */}
              <input type="hidden" name="formType" value="Contact Form" />

              {/* Honeypot: hidden from people, so anything typed here is a bot
                  and the API rejects the submit. */}
              <input
                type="text"
                name="website"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                tabIndex="-1"
                autoComplete="off"
                aria-hidden="true"
                className="cnt-hp"
              />

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                autoComplete="name"
                required
              />

              <div className="form-row">
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  autoComplete="email"
                  required
                />
                <input
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  autoComplete="tel"
                  required
                />
              </div>

              <input
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Business Name"
                autoComplete="organization"
                required
              />

              <select
                name="runningAds"
                value={formData.runningAds}
                onChange={handleChange}
                className="cnt-select"
                required
              >
                <option value="">{RUNNING_ADS_LABEL}</option>
                {RUNNING_ADS.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>

              <button type="submit" disabled={saving}>
                {saving ? "Sending…" : "Get In Touch"}
              </button>
            </form>
          )}
        </div>
        <div className="right">
          <h2>Contact Info.</h2>
          <div>
            <h3>Location</h3>
            <p>
              Cu-01, Tower 2, Parsvnath Planet,<br/> Vibhuti Khand, Gomti Nagar
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
