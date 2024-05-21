import express from "express";
import {
  createProduct,
  getProducts,
  getSingleProductById,
} from "./product.controller";

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/", getProducts);
productRouter.get("/:productId", getSingleProductById);

export default productRouter;
