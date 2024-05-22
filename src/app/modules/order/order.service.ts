import { TOrder } from "./order.interface";
import { Order } from "./order.model";

const createOrderFromDB = async (order: TOrder) => {
  const result = await Order.create(order);
  return result;
};

const getOrdersFromDB = async (query: Record<string, unknown>) => {
  const result = await Order.find(query);
  return result;
};

export { createOrderFromDB, getOrdersFromDB };
