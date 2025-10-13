import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

import { SignUpSchemaProps } from "@/features/auth/schema";

export const useEmailSignUp = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (json: SignUpSchemaProps & { callbackURL: string }) => {
      const { name, email, password, callbackURL } = json;

      const { data, error } = await authClient.signUp.email({
        name,
        email, // required
        password, // required
        callbackURL,
      });

      if (error) {
        throw new Error(error.message || "Failed to sign up!");
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Sign up successfull");
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      router.push("/dashboard");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to sign in!");
    },
  });
  return mutation;
};
