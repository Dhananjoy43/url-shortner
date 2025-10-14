"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { Github } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputPassword } from "@/components/ui/input-password";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";

import {
  useEmailSignIn,
  useSocialSignIn,
} from "@/features/auth/api/use-sign-in";
import { SignInSchema } from "@/features/auth/schema";
import { SocialProvidersProps } from "@/features/auth/types";

export const SignInForm = () => {
  const callbackURL = useSearchParams().get("callbackURL") ?? "/dashboard";
  const emailSignInMutation = useEmailSignIn();
  const socialSignInMutation = useSocialSignIn();

  const form = useForm({
    validators: {
      onSubmit: SignInSchema,
    },
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      emailSignInMutation.mutate({
        ...value,
        callbackURL,
      });
    },
  });

  const handleSocialSignIn = (provider: SocialProvidersProps) => {
    socialSignInMutation.mutate({
      provider,
      callbackURL,
    });
  };

  const isPending =
    emailSignInMutation.isPending || socialSignInMutation.isPending;

  return (
    <Card className="w-full md:w-md">
      <CardHeader className="flex flex-col items-center gap-2">
        <CardTitle className="text-xl font-bold sm:text-center">
          Sign In
        </CardTitle>
        <CardDescription className="sm:text-center">
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          <FieldGroup>
            <form.Field
              name="email"
              validators={{
                onChange: SignInSchema.shape.email,
              }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} required>
                      Email
                    </FieldLabel>
                    <Input
                      id={field.name}
                      placeholder="Enter your email"
                      type="email"
                      required
                      disabled={isPending}
                      autoComplete="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
            <form.Field
              name="password"
              validators={{
                onChange: SignInSchema.shape.password,
              }}
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name} required>
                      Password
                    </FieldLabel>
                    <InputPassword
                      id={field.name}
                      placeholder="Enter your password"
                      required
                      disabled={isPending}
                      autoComplete="current-password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isPending}
          >
            {isPending && <Spinner className="size-4" />}
            {isPending ? "Signing in" : "Sign in"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-4">
        <div className="flex w-full items-center justify-center gap-2 overflow-hidden">
          <Separator className="" />
          <span className="text-foreground/60 shrink-0 text-sm capitalize">
            or
          </span>
          <Separator />
        </div>

        <Button
          disabled={isPending}
          variant="outline"
          className="w-full cursor-pointer"
          onClick={() => handleSocialSignIn("github")}
        >
          <Github />
          Continue With Github
        </Button>

        <p className="text-muted-foreground text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link
            className={cn(buttonVariants({ variant: "link" }), "px-0")}
            href="/auth/sign-up"
          >
            Sign up
          </Link>
          .
        </p>
      </CardFooter>
    </Card>
  );
};
