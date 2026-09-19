import { mailTransport, MAIL_USER } from "./mailer";

export async function sendInvoiceEmail({ to, subject, htmlBody, pdfBuffer }) {
  const transporter = mailTransport();

  await transporter.sendMail({
    from: `"Viralon Sales" <${MAIL_USER}>`,
    to,
    subject,
    html: htmlBody,
    attachments: [
      {
        filename: "Recurring-Invoice.pdf",
        content: pdfBuffer,
      },
    ],
  });
}
