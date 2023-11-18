const router = require("express").Router();
const authControllers = require("../controllers/authControllers");

router.post("/login", authControllers.login);

router.get("/logout", authControllers.logout);

router.get("/refresh", authControllers.refresh);

module.exports = router;
