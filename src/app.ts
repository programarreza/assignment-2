import express, { Application, NextFunction, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import productRouter from "./app/modules/product/product.router";
import createError from "http-errors";
import { errorResponse } from "./responseController";
import orderRouter from "./app/modules/order/order.router";

// parsers
app.use(express.json());
app.use(cors());

// routers
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("E-shop ");
});

// client error handling
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404, "route not found "));
});

// server error handling all the error
app.use((err: unknown, req:Request, res:Response) => {
  const error = err as {status?: number; message?:string}
  
  return errorResponse(res, {
    statusCode: error.status || 500,
    message: error.message || "Internal server Error",
  });
});

export default app;
