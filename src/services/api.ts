import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const api = axios.create({
  baseURL: "https://dummyjson.com/",
});

interface UseProductsOptions {
  page?: number;
  limit?: number;
  search?: string;
}

export const useProducts = ({
  page = 1,
  limit = 10,
  search = "",
}: UseProductsOptions) => {
  const skip = (page - 1) * limit;

  return useQuery({
    queryKey: ["products", page, limit, search],
    queryFn: async () => {
      const trimmed = search.trim();

      let url = trimmed
        ? `products/search?q=${encodeURIComponent(trimmed)}&limit=${limit}&skip=${skip}`
        : `products?limit=${limit}&skip=${skip}`;

      const res = await api.get(url);
      return res.data;
    },
  });
};

export default api;
