const router = require("express").Router();
const userControllers = require("../controllers/userControllers")
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.post("/signup", userControllers.signup);

router.get("/verified/:id", userControllers.verified);

router.get("/notverified/:id", userControllers.notVerified);

router.post("/reset", userControllers.reset);

router.get("/reset/:id", userControllers.verifyReset);

router.post("/reset/:id", userControllers.resetPassword);

// router.post("/reset/:id", userExists, passwordValid, userControllers.create, emailController.sendWelcomeMail)

router.get("/:id", userControllers.id);

router.get("/meetings/:id", userControllers.meetings);

router.put("/edit/:id", userControllers.edit);

router.delete("/delete/:id", userControllers.delete);

router.get("/verify", isAuthenticated, userControllers.verifyToken);

module.exports = router;