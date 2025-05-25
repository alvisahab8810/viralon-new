// import dbConnect from "../../../utils/dbconnect";
// import Contact from "../../../models/Contact";
// import nodemailer from "nodemailer";

// export default async function handler(req, res) {
//   await dbConnect();

//   if (req.method === "POST") {
//     const { name, email, phone, message } = req.body;

//     try {
//       const newContact = new Contact({
//         name,
//         email,
//         phone,
//         message,
//         formType: "Contact Us",
//       });

//       await newContact.save();

//       // Email setup
//       const transporter = nodemailer.createTransport({
//         host: "smtp.hostinger.com",
//         port: 465,
//         secure: true,
//         auth: {
//           user: "info@viralon.in",
//           pass: process.env.EMAIL_PASS,
//         },
//       });

//       const mailOptions = {
//         from: '"Viralon" <info@viralon.in>',
//         to: email,
//         subject: "Thanks for contacting Viralon!",
//         html: `
//           <p>Hi ${name},</p>
//           <p>Thanks for reaching out. We’ll get back to you soon.</p>
//           <p>Regards,<br/>Team Viralon</p>
//         `,
//       };

//       await transporter.sendMail(mailOptions);

//       res.status(201).json({ success: true, message: "Contact saved and email sent!" });
//     } catch (error) {
//       console.error("Error saving contact:", error);
//       res.status(500).json({ success: false, message: "Server error" });
//     }
//   } else {
//     res.status(405).json({ message: "Method Not Allowed" });
//   }
// }





import dbConnect from "../../../utils/dbconnect";
import Contact from "../../../models/Contact";
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { name, email, phone, businessName } = req.body;

    try {
      const newContact = new Contact({
        name,
        email,
        phone,
        businessName,
        formType: "Contact", // use consistent naming
      });

      await newContact.save();

      const transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        secure: true,
        auth: {
          user: "info@viralon.in",
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: '"Viralon" <info@viralon.in>',
        to: email,
        subject: "Thanks for contacting Viralon!",
        html: `
          <p>Hi ${name},</p>
          <p>Thanks for reaching out. We’ll get back to you soon.</p>
          <p>Regards,<br/>Team Viralon</p>
        `,
      };

      await transporter.sendMail(mailOptions);

      return res.status(201).json({ success: true, message: "Contact saved and email sent!" });
    } catch (error) {
      console.error("Error saving contact:", error);
      return res.status(500).json({ success: false, message: "Server error" });
    }
  }

  // ✅ Add GET handler to fetch all contacts
  if (req.method === "GET") {
    try {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      return res.status(200).json({ success: true, data: contacts });
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return res.status(500).json({ success: false, message: "Failed to fetch contacts" });
    }
  }

  res.status(405).json({ message: "Method Not Allowed" });
}
