import API from "@/utils/api";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useSearchProducts = (name: string) => {
  return useInfiniteQuery({
    initialPageParam: 1,
    queryKey: ["searchProducts"],
    getNextPageParam: (lastPage: {
      pagination: { PageCount: number; PageNumber: number };
    }) => {
      return lastPage.pagination.PageNumber < lastPage.pagination.PageCount
        ? lastPage.pagination.PageNumber + 1
        : undefined;
    },
    queryFn: async ({ pageParam = 1 }) => {
      const { data, headers } = await API.get(
        `products?Name=${name}&PageNumber=${pageParam}&PageSize=3`
      );

      return {
        data,
        pagination: JSON.parse(headers["x-pagination"]),
      };
    },
  });
};