import { NextFunction, Request, Response } from "express";
import orderValidationSchema from "./order.validation";
import { successResponse } from "../../../responseController";
import { createOrderFromDB, getOrdersFromDB } from "./order.service";
import createError from "http-errors";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order = req.body;

    // validation data using zod
    const zodData = orderValidationSchema.parse(order);
    const result = await createOrderFromDB(zodData);

    return successResponse(res, {
      statusCode: 200,
      message: "Order Created successfully ",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await getOrdersFromDB();

    if (!result) {
      throw createError(404, "Orders not found ");
    }

    return successResponse(res, {
      statusCode: 200,
      message: "All Order Retrieve successfully ",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export { createOrder, getOrders };
