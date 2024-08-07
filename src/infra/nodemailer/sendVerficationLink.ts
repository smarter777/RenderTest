import { transporter } from "../../config/nodemailer.config";

export const sendVerficationLink = (
  email: string,
  verificationlink: string
) => {
  const mailoptions = {
    from: `${process.env.OFFICIAL_EMAIL_FOR_SENDING_VERIFICATION_LINK}`,
    to: email,
    subject: "Email verification ",
    html: `<div style="font-family: Helvetica, Arial, sans-serif; min-width: 1000px; overflow: auto; line-height: 2">
  <div style="margin: 50px auto; width: 70%; padding: 20px 0">
    <div style="border-bottom: 1px solid #eee">
      <h1 style="font-size: 1.6em; color: #000; font-weight: 600; text-align: center;">Email Verification</h1>
    </div>
    <h2 style="font-size: 1.2em; color: #555; text-align: center; margin-top: 20px;">Please verify your email by clicking the button below:</h2>
    <div style="text-align: center; margin-top: 20px;">
      <a href="${verificationlink}" style="display: inline-block; padding: 12px 24px; background-color: #4cd681; color: white; text-decoration: none; border-radius: 5px;">Verify Your Email</a>
    </div>
    <hr style="border: none; border-top: 1px solid #eee" />

  </div>
</div>`,
  };
  transporter.sendMail(mailoptions, async (err: any, info) => {
    if (err) {
      console.log(` err => nodemailer -> ${err}`);
    } else {
      console.log(`Mail sended`);
    }
  });
};
