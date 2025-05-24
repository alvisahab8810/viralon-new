// import React from "react";

// export default function ContentWriterForm() {
//   return (
//     <>
//       <div
//         className="applying-form wpcf7 "
//       >

//         <h2>Apply for this job here:</h2>
  
//         <form className="wpcf7-form init">
//           <div className="career-form-wrap">
//             <div className="career-form d-flex flex-wrap">
//               <div className="col-12 px-0">
//                 <input
//                   type="hidden"
//                   name="appliedPosition"
//                   value="Content Writer Intern"
//                   className=" wpcf7-hidden"
//                 />
//               </div>
//               <div className="col-12 pt-3 px-0">
//                   <input
//                     type="text"
//                     name="name"
//                     className="  form-control"
//                     placeholder="Name*"
//                   />
//               </div>
//               <div className="col-12 pt-3 px-0">
//                   <input
//                     type="email"
//                     name="email"
//                     className="form-control"
//                     placeholder="Email*"
//                   />
//               </div>
//               <div className="col-12 pt-3 px-0">
//                   <input
//                     type="tel"
//                     name="mobile"
//                     maxLength="10"
//                     minLength="10"
//                     className="form-control"
//                     placeholder="Phone Number*"
//                   />
//               </div>
//               <div className="col-12 pt-3 px-0">
//                 <p className="font14 bold mb_5">Upload CV*</p>
           
//                     <input
//                       type="file"
//                       name="file"
//                       className="form-control"
//                       id="cv"
//                       accept=".pdf,.doc,.docx"
//                     />
//               </div>
//               <div className="col-12 pt-3 px-0">
//                 <h4 className="bold font20 or">OR</h4>
//                     <input
//                       type="url"
//                       name="portfolioLink"
//                       className="form-control"
//                       placeholder="Portfolio Link"
//                     />
//               </div>
//               <div className="col-12 pt-3 px-0">
//                 <button
//                   type="submit"
//                   className="apply-now-btn"
//                   fdprocessedid="6wqin"
//                 >
//                   Submit
//                 </button>
//                 <span className="ajax-loader"></span>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// }


import React, { useState } from "react";

export default function ContentWriterForm() {
  const [formData, setFormData] = useState({
    appliedPosition: "Content Writer Intern",
    name: "",
    email: "",
    mobile: "",
    portfolioLink: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const form = new FormData();
  form.append("appliedPosition", formData.appliedPosition);
  form.append("name", formData.name);
  form.append("email", formData.email);
  form.append("mobile", formData.mobile);
  form.append("portfolioLink", formData.portfolioLink);
  form.append("resume", document.getElementById("cv").files[0]); // ✅

  try {
    const res = await fetch("/api/careers/apply", {
      method: "POST",
      body: form, // ✅ multipart/form-data
    });

    const result = await res.json();
    if (result.success) {
      alert("Application submitted!");
    } else {
      alert("Submission failed!");
    }
  } catch (error) {
    console.error(error);
    alert("Error submitting form.");
  }
};


  return (
    <div className="applying-form wpcf7">
      <h2>Apply for this job here:</h2>
      <form onSubmit={handleSubmit} className="wpcf7-form init">
        <div className="career-form-wrap">
          <div className="career-form d-flex flex-wrap">
            <input type="hidden" name="appliedPosition" value="Content Writer Intern" />
            <input name="name" placeholder="Name*" className="form-control mt-3" onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email*" className="form-control mt-3" onChange={handleChange} required />
            <input name="mobile" type="tel" maxLength="10" minLength="10" placeholder="Phone Number*" className="form-control mt-3" onChange={handleChange} required />
            {/* CV upload will require extra setup for file handling */}
           <input type="file" name="resume" className="form-control mt-3" id="cv" accept=".pdf,.doc,.docx" required />


            <h4 className="bold font20 or mt-3">OR</h4>
            <input name="portfolioLink" type="url" placeholder="Portfolio Link" className="form-control" onChange={handleChange} />
            <button type="submit" className="apply-now-btn">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
}
