import { Suspense } from "react";

import { SignInForm } from "@/features/auth/components/sign-in-form";

const SignUpPage = () => {
  return (
    <Suspense>
      <SignInForm />
    </Suspense>
  );
};

export default SignUpPage;
