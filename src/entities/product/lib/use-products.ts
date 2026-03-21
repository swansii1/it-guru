import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/fetch-products";

export const useProducts = (params: Parameters<typeof fetchProducts>[0]) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => fetchProducts(params),
    placeholderData: keepPreviousData,
  });
};
