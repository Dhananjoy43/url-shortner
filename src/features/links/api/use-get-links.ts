"use client";

import { useQuery } from "@tanstack/react-query";

import { hc } from "@/lib/hono";

export function useGetLinks(page: number, limit = 12) {
  return useQuery({
    queryKey: ["short-links", page, limit],
    queryFn: async () => {
      const res = await hc.api.links.$get({
        query: {
          offset: ((page - 1) * limit).toString(),
          limit: limit.toString(),
        },
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      return res.json();
    },
    // keepPreviousData: true, // smoother pagination
    staleTime: 1000 * 60 * 5, // 5 min cache
    refetchOnWindowFocus: false,
  });
}
