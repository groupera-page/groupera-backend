const router = require("express").Router();
const userControllers = require("../controllers/userControllers")
const { verifyJWT, verifyRoles } = require("../middleware/jwt.middleware.js");
const ROLES_LIST = require('../config/roles_list');

router.post("/signup", userControllers.signup);

router.get("/:email", userControllers.forFred);

router.post("/verified", userControllers.verified);

router.post("/reset", userControllers.reset);

router.get("/reset/:id", userControllers.verifyReset);

router.post("/reset/:id", userControllers.resetPassword);

// router.post("/reset/:id", userExists, passwordValid, userControllers.create, emailController.sendWelcomeMail)

router.get("/one/:id", verifyJWT, userControllers.id);

router.get("/meetings/:id", verifyJWT, userControllers.meetings);

router.put("/edit/:id", verifyJWT, verifyRoles(ROLES_LIST.Admin), userControllers.edit);

router.delete("/delete/:id", userControllers.delete);

// router.get("/verify", isAuthenticated, userControllers.verifyToken);

module.exports = router;