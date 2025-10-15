import { Suspense } from "react";
import { redirect } from "next/navigation";

import { getServerSession } from "@/lib/get-server-session";

import { SignInForm } from "@/features/auth/components/sign-in-form";

const SignUpPage = async () => {
  const { session } = await getServerSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
};

export default SignUpPage;
