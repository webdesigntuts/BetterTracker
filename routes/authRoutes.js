const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.get("/whoami", authController.auth_user);
router.post("/auth", authController.auth_login);
router.post("/logout", authController.auth_logout);
router.post("/register", authController.auth_register);

module.exports = router;
