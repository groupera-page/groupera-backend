const router = require("express").Router();
const groupControllers = require('../controllers/groupControllers')


router.post("/create", groupControllers.create);

router.get("/:groupId", groupControllers.groupId);

router.get("/meetings/:groupId", groupControllers.viewMeetings);

router.put("/join/:groupId", groupControllers.joinGroup);

router.put("/leave/:groupId", groupControllers.leaveGroup);

router.put("/edit/:groupId", groupControllers.editGroup);

router.delete("/delete/:groupId", groupControllers.deleteGroup);

module.exports = router;
