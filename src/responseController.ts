import { Response } from "express";
import { TResponseOption } from "./app/modules/product/product.interface";

const errorResponse = (
  res: Response,
  { statusCode = 500, message = "Internal Server Error" }:TResponseOption
) => {
  return res.status(statusCode).json({
    success: false,
    message: message,
  });
};

const successResponse = (
  res: Response,
  { statusCode = 200, message = "Success", data = null }: TResponseOption 
) => {
  return res.status(statusCode).json({
    success: true,
    message: message,
    data,
  });
};

export { errorResponse, successResponse };
