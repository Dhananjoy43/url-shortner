import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { hc } from "@/lib/hono";

export const useDeleteLink = (id?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!id) throw new Error("Missing link id");
      const res = await hc.api.links[":id"].$delete({
        param: { id },
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
      toast.success("Short link deleted");
    },
    onError: (err) => {
      console.log("Error", err);
      toast.error(err.message || "Failed to delete short link!");
    },
  });
};
