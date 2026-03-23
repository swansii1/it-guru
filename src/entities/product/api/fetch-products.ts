import { baseRequest } from "@/shared/api/base";
import type { ProductResponse } from "../model/types";

interface FetchParams {
  page: number;
  limit: number;
  search?: string;
  sortBy?: string;
  order?: "asc" | "desc";
}

export const fetchProducts = async ({
  page,
  limit,
  search,
  sortBy,
  order,
}: FetchParams): Promise<ProductResponse> => {
  const skip = (page - 1) * limit;
  const baseUrl = search ? "/products/search" : "/products";
  const params = new URLSearchParams({
    limit: limit.toString(),
    skip: skip.toString(),
  });

  if (search) params.append("q", search);
  if (sortBy) {
    params.append("sortBy", sortBy);
    params.append("order", order || "asc");
  }

  return baseRequest(`${baseUrl}?${params.toString()}`);
};
