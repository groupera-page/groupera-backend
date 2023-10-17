const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "marketing@groupera.de", // generated brevo user
        pass: "xsmtpsib-d2d655697ef4d6b0bb03a049113139c55f0671a4b43ae97de74dff3df1c6d4b4-rbsm901IjWX532UR", // generated brevo password
      },
    });

    await transporter.sendMail({
      from: "verification@groupera.de",
      to: email,
      subject: subject,
      text: text
    });
    console.log("Email sent")
  } catch (error) {
    console.log(error)
  }
}













// module.exports = async () => {
  

//   // create reusable transporter object using the default SMTP transport
  // let transporter = nodemailer.createTransport({
  //   host: "smtp-relay.brevo.com",
  //   port: 587,
  //   secure: false, // true for 465, false for other ports
  //   auth: {
  //     user: "jayblez@gmail.com", // generated brevo user
  //     pass: "xsmtpsib-cf3d6c1fb0a05fd2fa520fca55bbdafcf6d6a9986eed65eb670a8345116b018b-NxbFy1mnsTrA6fIE", // generated brevo password
  //   },
  // });

//   // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"jayblez@gmail.com', // sender address
//     to: "jayblez@gmail.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello bruh , This is an SMTP message with customizations", // plain text body
//   });

//   console.log("Message sent: %s", info.messageId);
//   // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
// }

// // sendEmail().catch(console.error);