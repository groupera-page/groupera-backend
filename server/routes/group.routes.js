const router = require("express").Router();
const groupControllers = require('../controllers/groupControllers');
const { verifyJWT, verifyRoles } = require("../middleware/jwt.middleware.js");
const ROLES_LIST = require('../config/roles_list');

router.post("/create", groupControllers.create);

router.get("/groups", groupControllers.all);

router.get("/meetings/:groupId", groupControllers.meetings);

router.get("/:groupId", groupControllers.id);

router.put("/join/:groupId", groupControllers.join);

router.put("/leave/:groupId", groupControllers.leave);

router.put("/edit/:groupId", verifyJWT, verifyRoles(ROLES_LIST.Admin), groupControllers.edit);

router.delete("/delete/:groupId", groupControllers.delete);

module.exports = router;
