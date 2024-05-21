import { NextFunction, Request, Response } from "express";
import orderValidationSchema from "./order.validation";
import { errorResponse, successResponse } from "../../../responseController";
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
    let query: any = {};

    if (req.query.email) {
      query.email = { $regex: new RegExp(req.query.email as string, "i") };
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
  } catch (err: any) {
    next(err);
  }
};

export { createOrder, getOrders };
