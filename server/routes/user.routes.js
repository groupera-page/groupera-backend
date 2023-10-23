const router = require("express").Router();
const userControllers = require("../controllers/userControllers")
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.post("/signup", userControllers.signup);

router.get("/verified/:id", userControllers.verified);

router.get("/notverified/:id", userControllers.notVerified);

router.get("/:id", userControllers.id);

router.get("/meetings/:id", userControllers.meetings);

router.put("/edit/:id", userControllers.edit);

router.delete("/delete/:id", userControllers.delete);

router.get("/verify", isAuthenticated, userControllers.verifyToken);

module.exports = router;