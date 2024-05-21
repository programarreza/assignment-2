import { Request, Response } from "express";
import { createProductFromDB } from "./product.service";
import { productValidationSchema } from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;

    // validation data using zod
    const zodData = productValidationSchema.parse(product);

    const result = await createProductFromDB(zodData);
    
    res.status(200).json({
      success: true,
      message: "Product Created successfully ",
      payload: result,
    });
  } catch (err: any) {
    const errorMessage = JSON.parse(err.toString())[0].message;

    res.status(500).json({
      success: false,
      message: errorMessage || "something wrong ",
      error: err,
    });
  }
};

export { createProduct };
