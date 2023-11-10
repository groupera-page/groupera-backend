const nodemailer = require("nodemailer");
const { template } = require('../emailTemplate');

module.exports = async (email, subject, text) => {
  const output = template(text)
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.EMAIL_USER, // generated brevo user
        pass: process.env.EMAIL_PASS, // generated brevo password
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: subject,
      html: output
    });
    console.log("Email sent")
  } catch (error) {
    console.log(error)
  }
}
