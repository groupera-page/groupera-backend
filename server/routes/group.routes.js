const router = require("express").Router();
const groupControllers = require('../controllers/groupControllers');
const { verifyJWT, verifyRoles } = require("../middleware/jwt.middleware.js");

router.post("", groupControllers.create);

router.get("/findAll", verifyJWT, groupControllers.findAll);

router.get("/:groupId/meetings", groupControllers.meetings);

router.get("/:groupId", groupControllers.findOne);

router.patch("/:groupId/edit", verifyJWT, groupControllers.edit);

router.delete("/:groupId", groupControllers.delete);

module.exports = router;
