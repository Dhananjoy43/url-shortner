import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

import { hc } from "@/lib/hono";

import { ShortLinkSchema } from "@/features/links/schema";

export const useUpdateLink = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (json: z.infer<typeof ShortLinkSchema>) => {
      if (!id) throw new Error("Missing link id");
      const res = await hc.api.links[":id"].$patch({
        param: { id },
        json,
      });

      if (!res.ok) {
        const { error } = (await res.json()) as { error: string };
        throw new Error(error);
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["short-links"],
      });
      toast.success("Short link updated");
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error(err.message || "Failed to update short link!");
    },
  });
};
