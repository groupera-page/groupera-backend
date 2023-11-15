const nodemailer = require("nodemailer");

module.exports = async (email, subject, template) => {
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
      html: template
    });
    console.log("Email sent")
  } catch (error) {
    console.log(error)
  }
}
