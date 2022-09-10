import express from "express";
import * as categoriesController from "../controllers/categoriesController.js";
import requireAuth from "../middlewares/requireAuth.js";
const router = express.Router();
router.use(requireAuth);
router.post("/category", categoriesController.categories_post);
router.get("/categories", categoriesController.categories_get);
router.get("/categories/sum", categoriesController.categories_transaction_sum);
router.delete(
  "/category/delete/:categoryId",
  categoriesController.category_delete
);

export default router;
