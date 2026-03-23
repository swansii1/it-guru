import { useAuthStore } from "@/entities/user/model/store";
import { throwApiErrorFromResponse } from "./api-error";

export const API_URL = "https://dummyjson.com";

export const baseRequest = async <T = unknown>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> => {
  const token = useAuthStore.getState().token;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    await throwApiErrorFromResponse(response);
  }

  return response.json() as Promise<T>;
};
