import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

import { SignInSchemaProps } from "@/features/auth/schema";
import { SocialProvidersProps } from "@/features/auth/types";

export const useEmailSignIn = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (json: SignInSchemaProps & { callbackURL: string }) => {
      const { email, password, callbackURL } = json;

      const { data, error } = await authClient.signIn.email({
        email, // required
        password, // required
        callbackURL,
      });

      console.log("User: ", data);

      if (error) {
        throw new Error(error.message || "Failed to sign in!");
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Sign in successfull");
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      router.push("/dashboard");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to sign in!");
    },
  });
  return mutation;
};

export const useSocialSignIn = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async ({
      provider,
      callbackURL,
    }: {
      provider: SocialProvidersProps;
      callbackURL: string;
    }) => {
      const { data, error } = await authClient.signIn.social({
        provider,
        callbackURL,
      });

      if (error) {
        throw new Error(error.message || "Failed to sign in!");
      }

      if (data?.url) {
        router.push(data.url);
      }
      return data;
    },
    onSuccess: () => {
      toast.success("Sign in successfull");
      queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      router.push("/dashboard");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to sign in!");
    },
  });
  return mutation;
};
