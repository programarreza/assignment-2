import express from "express";
import {
  createProduct,
  deleteProductById,
  getProducts,
  getSingleProductById,
  updateProductById,
} from "./product.controller";

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/", getProducts);
productRouter.get("/:productId", getSingleProductById);
productRouter.put("/:productId", updateProductById);
productRouter.delete("/:productId", deleteProductById);

export default productRouter;
