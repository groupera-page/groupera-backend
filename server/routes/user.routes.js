const router = require("express").Router();
const userControllers = require("../controllers/userControllers")
const { verifyJWT, verifyRoles } = require("../middleware/jwt.middleware.js");

router.post("/signup", userControllers.signup);

router.get("/:email", userControllers.forFred);

router.patch("/verifyEmail", userControllers.verifyEmail);

router.post("/resetPassword", userControllers.resetPassword);

router.get("/:userId/verifyResetPasswordToken", userControllers.verifyResetPasswordToken);

router.post("/:userId/resetPassword", userControllers.resetPasswordId);

// router.post("/reset/:id", userExists, passwordValid, userControllers.create, emailController.sendWelcomeMail)

router.get("/:userId", userControllers.findOne);

router.get("/:userId/meetings", userControllers.meetings);

router.get("/:userId/groups", userControllers.groups)

router.patch("/:userId", verifyJWT, verifyRoles, userControllers.edit);

router.delete("/:userId", userControllers.delete);

// router.get("/verify", isAuthenticated, userControllers.verifyToken);

module.exports = router;