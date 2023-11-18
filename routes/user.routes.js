const router = require("express").Router();
const userControllers = require("../controllers/userControllers")
const { verifyJWT, verifyCurrentUser } = require("../middleware/jwt.middleware.js");

router.post("/signup", userControllers.signup);

router.patch("/verifyEmail", userControllers.verifyEmail);

router.post("/resetPasswordRequest", userControllers.resetPasswordRequest);

router.get("/:userId/verifyResetPasswordToken", userControllers.verifyResetPasswordToken);

router.post("/:userId/resetPassword", userControllers.resetPasswordId);

router.get("/:userId", verifyJWT, verifyCurrentUser, userControllers.findOne);

router.get("/:userId/meetings", verifyJWT, verifyCurrentUser, userControllers.meetings);

router.get("/:userId/groups", userControllers.groups)

router.patch("/:userId", verifyJWT, verifyCurrentUser, userControllers.edit);

router.delete("/:userId", verifyJWT, verifyCurrentUser, userControllers.delete);

// router.get("/verify", isAuthenticated, userControllers.verifyToken);

module.exports = router;