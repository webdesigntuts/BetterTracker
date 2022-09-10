const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.patch("/me", userController.user_update_meta);
router.patch("/me/pw", userController.user_update_password);
router.delete("me", userController.user_delete);

module.exports = router;
