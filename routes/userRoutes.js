import express from "express";
import * as userController from "../controllers/userController.js";
const router = express.Router();

router.patch("/me", userController.user_update_meta);
router.patch("/me/pw", userController.user_update_password);
router.delete("/me", userController.user_delete);

module.exports = router;
