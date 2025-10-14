import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

import { hc } from "@/lib/hono";

import { ShortLinkSchema } from "@/features/links/schema";

export const useCreateLink = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (json: z.infer<typeof ShortLinkSchema>) => {
      const res = await hc.api.links.$post({
        json,
      });

      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      const data = await res.json();
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["short-links"],
      });
      toast.success("Short link created");
    },
    onError: (err) => {
      console.log("Error", err);

      toast.error(err.message || "Something went wrong!");
    },
  });
};
