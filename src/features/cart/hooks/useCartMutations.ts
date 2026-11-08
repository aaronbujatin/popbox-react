import { useMutation } from "@tanstack/react-query";
import {
  decrementCartItem,
  incrementCartItem,
  type CartItemChangeRequest,
} from "../../../api/cart.api";
import type { HttpError } from "../../../api/client";

export const useIncrementCartItem = () =>
  useMutation<unknown, HttpError, CartItemChangeRequest>({
    mutationFn: incrementCartItem,
  });

export const useDecrementCartItem = () =>
  useMutation<unknown, HttpError, CartItemChangeRequest>({
    mutationFn: decrementCartItem,
  });
