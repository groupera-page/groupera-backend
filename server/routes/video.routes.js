const router = require("express").Router();
const videoControllers = require("../controllers/videoControllers")

router.get('/get-token', videoControllers.getToken)

module.exports = router;
