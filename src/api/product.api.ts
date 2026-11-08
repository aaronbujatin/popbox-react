import client from "./client";
import type { Product } from "../features/product/type";

export const getProduct = async (id: number): Promise<Product> => {
  const { data } = await client.get<Product>(`/api/v1/products/${id}`);
  return data;
};

export const getProductsByCategory = async (
  categoryId: number,
): Promise<Product[]> => {
  const { data } = await client.get<Product[]>("/api/v1/products/category", {
    params: { categoryId },
  });
  return data;
};
