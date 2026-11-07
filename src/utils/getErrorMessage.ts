import type { HttpError } from "../api/client";

export const getErrorMessage = (error: HttpError | null | undefined): string => {
  if (!error) return "Something went wrong. Please try again.";
  if (error.response) return error.response.data?.message ?? "Server error";
  if (error.request) return "Cannot reach the server. Check your connection.";
  return error.message || "Something went wrong. Please try again.";
};