import express from "express";
import { createProduct, getProducts } from "./product.controller";

const productRouter = express.Router();

productRouter.post("/", createProduct);
productRouter.get("/", getProducts);

export default productRouter;
