const router = require("express").Router();
const groupControllers = require('../controllers/groupControllers')


router.post("/create", groupControllers.create);

router.get("/groups", groupControllers.viewAll);

router.get("/:groupId", groupControllers.groupId);

router.put("/:groupId/join", groupControllers.joinGroup);

router.put("/:groupId/leave", groupControllers.leaveGroup);

router.put("/:groupId/edit", groupControllers.editGroup);

router.delete("/:groupId", groupControllers.deleteGroup);

module.exports = router;
