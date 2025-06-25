import dbConnect from "../../../../utils/dbconnect";
import Invoice   from "../../../../models/sales/invoice";
import nodemailer from "nodemailer";
import puppeteer  from "puppeteer";          // 👈 same as you use in create route

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Only POST allowed" });

  const { invoiceId } = req.body;
  if (!invoiceId)
    return res.status(400).json({ success: false, message: "Missing invoiceId" });

  await dbConnect();

  const invoice = await Invoice.findById(invoiceId).populate("customerId");
  if (!invoice)
    return res.status(404).json({ success: false, message: "Invoice not found" });

  try {
    /* ------------------------------------------------------------------ */
    /* 1)  RE‑GENERATE PDF THE SAME WAY YOU DID IN CREATE ROUTE            */
    /* ------------------------------------------------------------------ */

    // If you stored previewHTML inside the invoice document, use it.
    // Otherwise, build it again here (same JSX you send from front‑end).
    const previewHTML = invoice.previewHTML;   // <-- ensure this field exists

    const browser = await puppeteer.launch({
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();
    await page.setContent(previewHTML, { waitUntil: "networkidle0" });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: { top: "20px", bottom: "20px", left: "10px", right: "10px" },
    });

    await browser.close();

    /* ------------------------------------------------------------------ */
    /* 2)  SEND EMAIL WITH THE BUFFER                                     */
    /* ------------------------------------------------------------------ */
    const transporter = nodemailer.createTransport({
      host: "smtp.hostinger.com",
      port: 587,
      secure: false,
      auth: {
        user: "info@viralon.in",
        pass: process.env.EMAIL_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    await transporter.sendMail({
      from: `"Viralon Sales" <info@viralon.in>`,
      to:   invoice.customerEmail,
      subject: `Updated Invoice - ${invoice.invoiceNumber}`,
      html: `<p>Dear ${invoice.customerId.firstName},<br/>
             Please find your updated invoice attached.</p>`,
      attachments: [
        {
          filename: `Invoice-${invoice.invoiceNumber}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    /* ------------------------------------------------------------------ */
    /* 3)  UPDATE METADATA                                               */
    /* ------------------------------------------------------------------ */
    invoice.lastSentAt = new Date();
    await invoice.save();

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error("Send‑updated error:", err);
    return res.status(500).json({ success: false, message: "Internal error" });
  }
}


