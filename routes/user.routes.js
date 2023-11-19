const router = require("express").Router();
const userControllers = require("../controllers/userControllers");
const {
  verifyCurrentUser,
} = require("../middleware/userAuthentication.middleware.js");
const { validateAuthToken } = require("../middleware/auth.middleware.js");

router.get(
  "/:userId",
  validateAuthToken,
  verifyCurrentUser,
  userControllers.findOne,
);

router.get(
  "/:userId/meetings",
  validateAuthToken,
  verifyCurrentUser,
  userControllers.meetings,
);

router.get("/:userId/groups", userControllers.groups);

router.patch(
  "/:userId",
  validateAuthToken,
  verifyCurrentUser,
  userControllers.edit,
);

router.delete(
  "/:userId",
  validateAuthToken,
  verifyCurrentUser,
  userControllers.delete,
);

module.exports = router;
