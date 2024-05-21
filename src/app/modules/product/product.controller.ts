import { NextFunction, Request, Response } from "express";
import { createProductFromDB, getProductsFromDB } from "./product.service";
import { productValidationSchema } from "./product.validation";
import { successResponse } from "../../../responseController";

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = req.body;

    // validation data using zod
    const zodData = productValidationSchema.parse(product);
    const result = await createProductFromDB(zodData);

    return successResponse(res, {
      statusCode: 200,
      message: "Product Created successfully ",
      payload: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getProductsFromDB();

    return successResponse(res, {
      statusCode: 200,
      message: "Products Retrieve successfully ",
      payload: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export { createProduct, getProducts };
