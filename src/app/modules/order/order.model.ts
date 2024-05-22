import { Schema, model } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>(
  {
    email: {
      type: String,
      trim: true,
      required: [true, "email is required "],
    },
    productId: {
      type: String,
      required: [true, "productId is required"],
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const Order = model("Order", orderSchema);
