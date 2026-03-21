import { useAuthStore } from "@/entities/user/model/store";

export const API_URL = "https://dummyjson.com";

export const baseRequest = async (
  endpoint: string,
  options: RequestInit = {},
) => {
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

  if (!response.ok) throw new Error("Ошибка сервера");

  return response.json();
};
