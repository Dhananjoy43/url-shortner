import z from "zod";

export const SignInSchema = z.object({
  email: z.email(),
  password: z.string(),
});

export const SignUpSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignInSchemaProps = z.infer<typeof SignInSchema>;
export type SignUpSchemaProps = z.infer<typeof SignUpSchema>;
