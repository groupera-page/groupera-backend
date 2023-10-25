const router = require("express").Router();
const groupControllers = require('../controllers/groupControllers')


router.post("/create", groupControllers.create);

router.put("/verified/:groupId", groupControllers.verified)

router.get("/groups", groupControllers.all);

router.get("/meetings/:groupId", groupControllers.meetings);

router.get("/:groupId", groupControllers.id);

router.put("/join/:groupId", groupControllers.join);

router.put("/leave/:groupId", groupControllers.leave);

router.put("/edit/:groupId", groupControllers.edit);

router.delete("/delete/:groupId", groupControllers.delete);

module.exports = router;
