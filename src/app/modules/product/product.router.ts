import express from "express";
import { createProduct } from "./product.controller";

const productRouter = express.Router();

productRouter.post("/", createProduct)

export default productRouter
