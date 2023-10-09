const router = require("express").Router();
const authControllers = require("../controllers/authControllers");


router.post("/login", authControllers.login);


module.exports = router;
