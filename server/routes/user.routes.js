const router = require("express").Router();
const userControllers = require("../controllers/userControllers")
const { isAuthenticated, verifyJWT } = require("../middleware/jwt.middleware.js");

router.post("/signup", userControllers.signup);

router.get("/:email", userControllers.forFred);

router.post("/verified", userControllers.verified);

router.post("/reset", userControllers.reset);

router.get("/reset/:id", userControllers.verifyReset);

router.post("/reset/:id", userControllers.resetPassword);

// router.post("/reset/:id", userExists, passwordValid, userControllers.create, emailController.sendWelcomeMail)

router.get("/one/:id", verifyJWT, userControllers.id);

router.get("/meetings/:id", verifyJWT, userControllers.meetings);

router.put("/edit/:id", userControllers.edit);

router.delete("/delete/:id", userControllers.delete);

router.get("/verify", isAuthenticated, userControllers.verifyToken);

module.exports = router;