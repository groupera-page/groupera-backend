const router = require("express").Router();
const groupMembershipControllers = require('../controllers/groupMembershipControllers');

router.put("/:groupId/join", groupMembershipControllers.join);

router.put("/:groupId/leave", groupMembershipControllers.leave);

module.exports = router;
