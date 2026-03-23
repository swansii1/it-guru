import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/fetch-products";
import type { ProductResponse } from "../model/types";

export const useProducts = (params: Parameters<typeof fetchProducts>[0]) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: ({ signal }) => fetchProducts<ProductResponse>(params, { signal }),
    placeholderData: keepPreviousData,
  });
};
