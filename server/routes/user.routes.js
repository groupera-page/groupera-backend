const router = require("express").Router();
const userControllers = require("../controllers/userControllers")
const { verifyJWT, verifyCurrentUser } = require("../middleware/jwt.middleware.js");

router.post("/signup", userControllers.signup);

router.post("/:email/resendEmailVerification", userControllers.resendEmailVerification);

router.patch("/:email/verifyEmail", userControllers.verifyEmail);

router.post("/resetPasswordRequest", userControllers.resetPasswordRequest);

router.get("/:userId/verifyResetPasswordToken", userControllers.verifyResetPasswordToken);

router.post("/:userId/resetPassword", userControllers.resetPasswordId);

router.get("/:userId", verifyJWT, verifyCurrentUser, userControllers.findOne);

// Obsolete, I think
router.get("/:userId/meetings", verifyJWT, verifyCurrentUser, userControllers.meetings);

// Same as above
router.get("/:userId/groups", userControllers.groups)

router.patch("/:userId", verifyJWT, verifyCurrentUser, userControllers.edit);

router.delete("/:userId", verifyJWT, verifyCurrentUser, userControllers.delete);

module.exports = router;