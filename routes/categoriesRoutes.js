const express = require("express");
const categoriesController = require("../controllers/categoriesController");
const router = express.Router();

router.post("/category", categoriesController.categories_post);
router.get("/categories", categoriesController.categories_get);
router.get("/categories/sum", categoriesController.categories_transaction_sum);
router.delete(
  "/category/delete/:categoryId",
  categoriesController.category_delete
);

module.exports = router;
