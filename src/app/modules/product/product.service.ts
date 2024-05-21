import { TProduct } from "./product.interface";
import Product from "./product.model";

const createProductFromDB = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

export { createProductFromDB };
