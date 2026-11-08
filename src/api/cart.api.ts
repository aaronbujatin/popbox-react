import axios from "axios";

export interface CartItemChangeRequest {
  userId: number;
  productId: number;
  productUnitId: number;
  quantity: number;
}

const cartClient = axios.create({
  baseURL: import.meta.env.VITE_CART_API_URL ?? "http://localhost:8082",
});

export const incrementCartItem = async (
  body: CartItemChangeRequest,
): Promise<unknown> => {
  const { data } = await cartClient.post(
    "/api/v1/carts/items/increment",
    body,
  );
  return data;
};

export const decrementCartItem = async (
  body: CartItemChangeRequest,
): Promise<unknown> => {
  const { data } = await cartClient.post(
    "/api/v1/carts/items/decrement",
    body,
  );
  return data;
};
