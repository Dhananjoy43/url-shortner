import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export const useSignOut = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({ callbackURL }: { callbackURL?: string }) => {
      const { data, error } = await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push(callbackURL ?? "/");
          },
        },
      });

      if (error) {
        throw new Error(error.message || "Failed to sign out!");
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Sign out successfull");
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to sign out!");
    },
  });
  return mutation;
};
