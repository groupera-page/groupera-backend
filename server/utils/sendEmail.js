const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "jayblez@gmail.com", // generated brevo user
        pass: "xsmtpsib-cf3d6c1fb0a05fd2fa520fca55bbdafcf6d6a9986eed65eb670a8345116b018b-NxbFy1mnsTrA6fIE", // generated brevo password
      },
    });

    await transporter.sendMail({
      from: "jayblez@gmail.com",
      to: email,
      subject: subject,
      text: text
    });
    console.log("Email sent")
  } catch (error) {
    console.log(error)
  }
};