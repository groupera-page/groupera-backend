const router = require("express").Router();
const groupMembershipControllers = require('../controllers/groupMembershipControllers');
const { validateAuthToken } = require("../middleware/auth.middleware");

router.put("/:groupId/join", validateAuthToken, groupMembershipControllers.join);

router.put("/:groupId/leave", validateAuthToken, groupMembershipControllers.leave);

module.exports = router;
