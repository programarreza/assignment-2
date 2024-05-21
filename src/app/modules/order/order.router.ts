import express from "express";
import { createOrder } from "./order.controller";

const orderRouter = express.Router();

orderRouter.post("/", createOrder)

export default orderRouter
