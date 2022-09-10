import express from "express";
import * as categoriesController from "../controllers/categoriesController.js";
const router = express.Router();

router.post("/category", categoriesController.categories_post);
router.get("/categories", categoriesController.categories_get);
router.get("/categories/sum", categoriesController.categories_transaction_sum);
router.delete(
  "/category/delete/:categoryId",
  categoriesController.category_delete
);

export default router;
