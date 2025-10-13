import React from "react";
import { LayoutProps } from "@/types";

const AuthLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className="flex min-h-screen items-center justify-center p-2">
      {children}
    </main>
  );
};

export default AuthLayout;
