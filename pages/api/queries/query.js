// // pages/api/query.js

// import dbConnect from "../../../utils/dbconnect";
// import Query from "../../../models/Query";

// export default async function handler(req, res) {
//   await dbConnect();

//   if (req.method === "POST") {
//   const { name, email, phone, businessName, formType } = req.body;

//     try {
//       const newQuery = new Query({
//         name,
//         email,
//         phone,
//         businessName,
//         formType: formType || "Query Form",
//       });

//       await newQuery.save();
//       res.status(201).json({ success: true, message: "Query submitted!" });
//     } catch (error) {
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   }

//   if (req.method === "GET") {
//     try {
//       // const queries = await Query.find({ formType: "query" }).sort({ createdAt: -1 });
//       const queries = await Query.find({ formType: { $regex: /query/i } }).sort({ createdAt: -1 });

//       res.status(200).json({ success: true, data: queries });
//     } catch (error) {
//       res.status(500).json({ success: false, message: "Failed to fetch" });
//     }
//   }
// }



import dbConnect from "../../../utils/dbconnect";
import Query from "../../../models/Query";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { name, email, phone, businessName, formType } = req.body;

    try {
      const newQuery = new Query({
        name,
        email,
        phone,
        businessName,
        formType: formType || "Query Form",
      });

      await newQuery.save();

      // Email Setup for Hostinger
      const transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true,
        auth: {
          user: "info@viralon.in",
          pass: process.env.EMAIL_PASS, // Add this in .env.local
        },
      });

      const mailOptions = {
        from: '"Viralon" <info@viralon.in>',
        to: email,
        subject: "Thank you for your query!",
        html: `
          <p>Hi ${name},</p>
          <p>Thanks for reaching out. We’ll contact you soon.</p>
          <p>Regards,<br/>Team Viralon</p>
        `,
      };

      await transporter.sendMail(mailOptions);

      res.status(201).json({ success: true, message: "Query saved and email sent!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Server error" });
    }
  }

  if (req.method === "GET") {
    try {
      const queries = await Query.find({ formType: { $regex: /query/i } }).sort({ createdAt: -1 });
      res.status(200).json({ success: true, data: queries });
    } catch (error) {
      res.status(500).json({ success: false, message: "Failed to fetch" });
    }
  }
}
