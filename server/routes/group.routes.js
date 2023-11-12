const router = require("express").Router();
const groupControllers = require('../controllers/groupControllers');
const { verifyJWT, verifyCurrentUser } = require("../middleware/jwt.middleware.js");

router.post("", groupControllers.create);

router.get("/findAll", groupControllers.findAll);

router.get("/:groupId/meetings", groupControllers.meetings);

router.get("/:groupId", verifyJWT, verifyCurrentUser, groupControllers.findOne);

router.patch("/:groupId/edit", verifyJWT, verifyCurrentUser, groupControllers.edit);

router.delete("/:groupId", verifyJWT, verifyCurrentUser, groupControllers.delete);

module.exports = router;
