const express = require("express");
const transactionController = require("../controllers/transactionController");

const router = express.Router();
router.post("/transaction", transactionController.transaction_post);
router.delete(
  "/transaction/delete/:transactionId",
  transactionController.transaction_delete
);
router.get("/transactions", transactionController.transactions_get);

module.exports = router;
