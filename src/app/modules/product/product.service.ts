import { TProduct } from "./product.interface";
import Product from "./product.model";

const createProductFromDB = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

const getProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getSingleProductByIdFromDB = async (productId: string) => {
  const result = await Product.findOne({ _id: productId });
  return result;
};

export { createProductFromDB, getProductsFromDB, getSingleProductByIdFromDB };
