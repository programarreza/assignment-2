import express from "express";
import {
  createProduct,
  getProducts,
  getSingleProductById,
  updateProductById,
} from "./product.controller";

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/", getProducts);
productRouter.get("/:productId", getSingleProductById);
productRouter.put("/:productId", updateProductById);

export default productRouter;
