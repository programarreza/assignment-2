import { TProduct } from "./product.interface";
import Product from "./product.model";

const createProductFromDB = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

const getProductsFromDB = async (query: any ) => {
  const result = await Product.find(query);   
  return result;
};

const getSingleProductByIdFromDB = async (productId: string) => {
  const result = await Product.findOne({ _id: productId });
  return result;
};

const updateProductByIdFromDB = async (
  productId: string,
  updateOption: object,
  updates: Partial<TProduct>
) => {
  const result = await Product.findByIdAndUpdate(
    productId,
    updates,
    updateOption
  );
  return result;
};

const deleteProductByIdFromDB = async (productId: string) => {
  const result = await Product.findByIdAndDelete(productId);
  return result;
};

export {
  createProductFromDB,
  getProductsFromDB,
  getSingleProductByIdFromDB,
  updateProductByIdFromDB,
  deleteProductByIdFromDB
};
