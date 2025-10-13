import { Suspense } from "react";

import { SignUpForm } from "@/features/auth/components/sign-up-form";

const SignUpPage = () => {
  return (
    <Suspense>
      <SignUpForm />
    </Suspense>
  );
};

export default SignUpPage;
