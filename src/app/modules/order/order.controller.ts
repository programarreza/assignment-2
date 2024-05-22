import createError from "http-errors";
import { NextFunction, Request, Response } from "express";
import { errorResponse, successResponse } from "../../../responseController";
import { createOrderFromDB, getOrdersFromDB } from "./order.service";
import orderValidationSchema from "./order.validation";
import {
  getSingleProductByIdFromDB,
  updateProductByIdFromDB,
} from "../product/product.service";
import { TProduct } from "../product/product.interface";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = req.body;
    const { productId } = order;

    const product = await getSingleProductByIdFromDB(productId);
    if (!product) {
      throw createError(404, "Product does not exist with this id");
    }

    const productQuantity: number = product?.inventory?.quantity;
    // if (productQuantity <= 0) {
    //   throw createError(400, "Product is out of stock");
    // }

    const zodData = orderValidationSchema.parse(order);
    const result = await createOrderFromDB(zodData);
    if (!result || result.quantity <= 0) {
      throw createError(400, "Invalid order creation ");
    }

    const orderQuantity = result?.quantity;
    if (orderQuantity > productQuantity) {
      throw createError(400, "Insufficient quantity available in inventory ");
    }

    const newProductQuantity = productQuantity - orderQuantity;

    // update product inventory
    const updateData: Partial<TProduct> = {
      inventory: {
        quantity: newProductQuantity,
        inStock: newProductQuantity > 0,
      },
    };

    const updateOption = { new: true, runValidators: true };

    const updatedProduct = await updateProductByIdFromDB(
      productId,
      updateOption,
      updateData
    );
    if (!updatedProduct) {
      throw createError(404, "product dose not exist this id");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Order Created successfully ",
      data: result,
    });
  } catch (err: unknown) {
    next(err);
  }
};

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let query = {};

    if (req.query.email) {
      query = { email: { $regex: new RegExp(req.query.email as string, "i") } };
    }

    const result = await getOrdersFromDB(query);

    if (result.length === 0) {
      return errorResponse(res, {
        statusCode: 404,
        message: "Order not found ",
      });
    }

    return successResponse(res, {
      statusCode: 200,
      message: "Orders Retrieve successfully ",
      data: result,
    });
  } catch (err: unknown) {
    next(err);
  }
};

export { createOrder, getOrders };
