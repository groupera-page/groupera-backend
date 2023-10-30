require("dotenv").config();
require("./db");
const express = require("express");
const app = express();
const schedule = require("node-schedule");
const { User } = require("./models/User.model")
app.use(express.json({limit: '50mb'}));


// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);
const userRoutes = require("./routes/user.routes");
app.use("/user", userRoutes);
const groupRoutes = require("./routes/group.routes");
app.use("/group", groupRoutes);
const videoRoutes = require('./routes/video.routes');
app.use("/video", videoRoutes);
const paymentRoutes = require('./routes/payment.routes');
app.use("/payment", paymentRoutes);

// const job = schedule.scheduleJob("*/10 * * * * *", () => deleteOldUsers());
  
//   const deleteOldUsers = () => {
//     const current = new Date();
//     // subtracting 7 days
//     current.setDate(current.getDate());
//     User.deleteMany({ verified: false, createdAt: { $lte: current } }, (err) => {
//       if (err) return console.log("Error while erasing users " + err);
//       console.log("successfully erased data");
//     });
//   };


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
