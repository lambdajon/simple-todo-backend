import nodemailer from "nodemailer";

export default function sendEmail(mailOptions: object) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      port: 587,
      secure: false,
      auth: {
        user: `${process.env.EMAIL}`,
        pass: `${process.env.EMAIL_PASSWORD}`,
      },
    });

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (e) {
    throw new Error(`Send Email Error: ${e}`);
  }
}
