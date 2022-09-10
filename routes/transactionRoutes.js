import express from "express";
import * as transactionController from "../controllers/transactionController.js";
const router = express.Router();

router.post("/transaction", transactionController.transaction_post);
router.delete(
  "/transaction/delete/:transactionId",
  transactionController.transaction_delete
);
router.get("/transactions", transactionController.transactions_get);

export default router;
