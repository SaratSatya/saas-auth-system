import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST!,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER!,
    pass: process.env.SMTP_PASS!,
  },
});

function baseTemplate({
  title,
  message,
  actionText,
  actionLink,
}: {
  title: string;
  message: string;
  actionText?: string;
  actionLink?: string;
}) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #f9fafb;
          padding: 24px;
        }
        .container {
          max-width: 480px;
          margin: auto;
          background: #ffffff;
          padding: 24px;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        .btn {
          display: inline-block;
          margin-top: 16px;
          padding: 12px 20px;
          background: #2563eb;
          color: #ffffff;
          text-decoration: none;
          border-radius: 6px;
          font-weight: bold;
        }
        .footer {
          margin-top: 24px;
          font-size: 12px;
          color: #6b7280;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>${title}</h2>
        <p>${message}</p>
        ${
          actionText && actionLink
            ? `<a class="btn" href="${actionLink}">${actionText}</a>`
            : ""
        }
        <div class="footer">
          If you did not request this, you can safely ignore this email.
        </div>
      </div>
    </body>
  </html>
  `;
}

export async function sendEmail({
  to,
  subject,
  title,
  message,
  actionText,
  actionLink,
}: {
  to: string;
  subject: string;
  title: string;
  message: string;
  actionText?: string;
  actionLink?: string;
}) {
  const html = baseTemplate({
    title,
    message,
    actionText,
    actionLink,
  });

  await transporter.sendMail({
    from: process.env.MAIL_FROM!,
    to,
    subject,
    html,
    text: message,
  });
}
