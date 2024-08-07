import nodemailer from "nodemailer";
export const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: String(process.env.OFFICIAL_EMAIL_FOR_SENDING_VERIFICATION_LINK),
    pass: String(process.env.EMAIL_SECRET_PASSWORD),
  },
  tls: {
    rejectUnauthorized: true,
  },
});
