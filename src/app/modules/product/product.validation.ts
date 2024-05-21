import { z } from "zod";

const variantsValidationSchema = z.object({
  type: z.string().min(1, { message: "Type is required" }),
  value: z.string().min(1, { message: "Value is required" }),
});

const inventoryValidationSchema = z.object({
  quantity: z
    .number()
    .min(0, { message: "Quantity must be a non-negative number" }),
  inStock: z.boolean(),
});

const productValidationSchema = z.object({
  name: z
    .string()
    .max(30, { message: "Product name maximum 30 characters" })
    .min(1, { message: "Name is required" }),

  description: z.string().min(1, { message: "Description is required" }),
  price: z.number().positive({ message: "Price must be a positive number" }),
  category: z.string().min(1, { message: "Category is required" }),
  tags: z.array(z.string().min(1)).min(1, { message: "Tags are required" }),

  variants: z
    .array(variantsValidationSchema)
    .min(1, { message: "At least one variant is required" }),

  inventory: inventoryValidationSchema,
});

export { productValidationSchema };
