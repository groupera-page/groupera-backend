const router = require("express").Router();
const groupMembershipControllers = require('../controllers/groupMembershipControllers');
const { verifyJWT, verifyCurrentUser } = require("../middleware/jwt.middleware.js");

router.put("/:groupId/join", verifyJWT, groupMembershipControllers.join);

router.put("/:groupId/leave", verifyJWT, groupMembershipControllers.leave);

router.patch("/:groupId/removeMember", verifyJWT, verifyCurrentUser, groupMembershipControllers.removeMember);

module.exports = router;
