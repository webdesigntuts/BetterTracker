import express from "express";
import * as authController from "../controllers/authController.js";
const router = express.Router();

router.get("/whoami", authController.auth_user);
router.post("/auth", authController.auth_login);
router.post("/logout", authController.auth_logout);
router.post("/register", authController.auth_register);

module.exports = router;
