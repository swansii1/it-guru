export const API_URL = "https://dummyjson.com";

export const baseRequest = async (endpoint: string, options: RequestInit) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options.headers },
  });

  if (!response.ok) throw new Error("Ошибка сервера");

  return response.json();
};
