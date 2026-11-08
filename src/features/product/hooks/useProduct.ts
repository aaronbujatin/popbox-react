import { useQuery } from "@tanstack/react-query";
import { getProduct, getProductsByCategory } from "../../../api/product.api";
import type { Product } from "../type";
import type { HttpError } from "../../../api/client";

export const useProduct = (id: number | undefined) =>
  useQuery<Product, HttpError>({
    queryKey: ["product", id],
    queryFn: () => getProduct(id!),
    enabled: id !== undefined,
    retry: (count, error) => {
      const status = error.response?.status;
      if (status && status < 500) return false;
      return count < 2;
    },
  });

export const useProductsByCategory = (categoryId: number | undefined) =>
  useQuery<Product[], HttpError>({
    queryKey: ["products", "category", categoryId],
    queryFn: () => getProductsByCategory(categoryId!),
    enabled: categoryId !== undefined,
    retry: (count, error) => {
      const status = error.response?.status;
      if (status && status < 500) return false;
      return count < 2;
    },
  });
