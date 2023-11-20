const router = require("express").Router();
const groupControllers = require('../controllers/groupControllers');
const { verifyJWT, verifyCurrentUser } = require("../middleware/jwt.middleware.js");

router.post("/:userId", verifyJWT, groupControllers.create);

router.get("/findAll", groupControllers.findAll);

// pretty sure I made this obsolete
// router.get("/:groupId/meetings", groupControllers.meetings);

router.get("/:groupId", verifyJWT, groupControllers.findOne);

// here's the route for group members to access other member names
// router.get("/:groupId/users", verifyJWT, verifyCurrentUser, groupControllers.groupUsers);

router.patch("/:groupId", verifyJWT, verifyCurrentUser, groupControllers.edit);

router.delete("/:groupId", verifyJWT, verifyCurrentUser, groupControllers.delete);

module.exports = router;
