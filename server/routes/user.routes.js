const router = require("express").Router();
const userControllers = require("../controllers/userControllers")
const { isAuthenticated } = require("../middleware/jwt.middleware.js");


router.post("/signup", userControllers.signup)

router.get("/verified/:id", userControllers.verified)

router.get("/:id", userControllers.userId);

router.put("/:id", userControllers.userEdit);

router.delete("/:id", userControllers.userDelete);

router.get("/verify", isAuthenticated, userControllers.verifyToken);

module.exports = router;