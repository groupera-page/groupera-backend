const router = require("express").Router();
const groupMembershipControllers = require('../controllers/groupMembershipControllers');
const { verifyJWT } = require("../middleware/jwt.middleware.js");

router.put("/:groupId/join", verifyJWT, groupMembershipControllers.join);

router.put("/:groupId/leave", verifyJWT, groupMembershipControllers.leave);

module.exports = router;
