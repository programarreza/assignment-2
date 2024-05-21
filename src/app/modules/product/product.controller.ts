import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import { errorResponse, successResponse } from "../../../responseController";
import { TProduct } from "./product.interface";
import {
  createProductFromDB,
  deleteProductByIdFromDB,
  getProductsFromDB,
  getSingleProductByIdFromDB,
  updateProductByIdFromDB,
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
      data: result,
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
      data: result,
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
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const updateProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const updateOption = { new: true, runValidators: true };

    const allowedUpdates = [
      "name",
      "description",
      "price",
      "category",
      "tags",
      "variants",
      "inventory",
    ];

    let updates: Partial<TProduct> = {};

    for (let key in req.body) {
      if (allowedUpdates.includes(key)) {
        updates[key as keyof TProduct] = req.body[key];
      } else {
        throw createError(400, `Invalid property; ${key}`);
      }
    }

    const updatedProduct = await updateProductByIdFromDB(
      productId,
      updateOption,
      updates
    );
    if (!updatedProduct) {
      throw createError(404, "product dose not exist this id");
    }

    return successResponse(res, {
      statusCode: 200,
      message: " Product updated successfully ",
      data: updatedProduct,
    });
  } catch (err: any) {
    next(err);
  }
};

const deleteProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const deleteProduct = await deleteProductByIdFromDB(productId);

    if (!deleteProduct) {
      throw createError(404, "product dose not exist this id");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Product Deleted successfully ",
    });
  } catch (err: any) {
    next(err);
  }
};

export {
  createProduct,
  deleteProductById,
  getProducts,
  getSingleProductById,
  updateProductById,
};
