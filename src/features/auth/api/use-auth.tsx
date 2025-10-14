import { useQuery } from "@tanstack/react-query";

import { authClient } from "@/lib/auth-client";

export const useAuth = () => {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: async () => {
      const { data, error } = await authClient.getSession();
      if (error) {
        throw new Error(error.message || "You are not authenticated");
      }
      return data;
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
