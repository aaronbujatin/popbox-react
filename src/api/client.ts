import axios, { type AxiosError } from "axios";
import type { ApiError } from "../types/api";

const client = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export type HttpError = AxiosError<ApiError>;
export default client;