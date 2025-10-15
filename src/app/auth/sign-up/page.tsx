import { Suspense } from "react";
import { redirect } from "next/navigation";

import { getServerSession } from "@/lib/get-server-session";

import { SignUpForm } from "@/features/auth/components/sign-up-form";

const SignUpPage = async () => {
  const { session } = await getServerSession();
  if (session) {
    redirect("/dashboard");
  }

  return (
    <Suspense>
      <SignUpForm />
    </Suspense>
  );
};

export default SignUpPage;
