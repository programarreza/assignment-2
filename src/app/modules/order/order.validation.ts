import { z } from "zod";

const orderValidationSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "Email is required"),
  productId: z.string().min(1, "ProductId is required"),
  price: z.number().nonnegative("Price must be a non-negative number"),
  quantity: z
    .number()
    .int()
    .nonnegative("Quantity must be a non-negative integer"),
});

export default orderValidationSchema;
