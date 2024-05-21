import express, { Application, Request, Response } from "express";
const app: Application = express();
import cors from "cors";
import productRouter from "./app/modules/product/product.router";

// parsers
app.use(express.json());
app.use(cors());

// routers
app.use("/api/products", productRouter)

app.get("/", (req: Request, res: Response) => {
  res.send("E-shop ");
});

export default app;
