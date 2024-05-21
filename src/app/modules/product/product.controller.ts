import { NextFunction, Request, Response } from "express";
import { errorResponse, successResponse } from "../../../responseController";
import {
  createProductFromDB,
  getProductsFromDB,
  getSingleProductByIdFromDB,
} from "./product.service";
import { productValidationSchema } from "./product.validation";

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

const getSingleProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;

    const result = await getSingleProductByIdFromDB(productId);

    if (result === null) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Product not found ",
      });
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Single Product Retrieve successfully ",
      payload: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export { createProduct, getProducts, getSingleProductById };
