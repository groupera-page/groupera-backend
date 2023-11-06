const router = require("express").Router();
const groupControllers = require('../controllers/groupControllers');
const { verifyJWT, verifyRoles } = require("../middleware/jwt.middleware.js");
const ROLES_LIST = require('../config/roles_list');

router.post("", groupControllers.create);

router.get("/findAll", groupControllers.findAll);

router.get("/:groupId/meetings", groupControllers.meetings);

router.get("/:groupId", groupControllers.findOne);

router.patch("/:groupId/edit", verifyJWT, verifyRoles(ROLES_LIST.Admin), groupControllers.edit);

router.delete("/:groupId", groupControllers.delete);

module.exports = router;
