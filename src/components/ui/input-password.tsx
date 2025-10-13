"use client";

import { useId, useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { Input } from "./input";

type InputPasswordProps = Omit<React.ComponentProps<"input">, "type">;

export const InputPassword = ({ className, ...props }: InputPasswordProps) => {
  const id = useId();
  const [inputType, setInputType] = useState<"password" | "text">("password");

  const toggleVisibility = () => {
    setInputType((prev) => (prev === "text" ? "password" : "text"));
  };

  return (
    <div className="relative">
      <Input
        id={id}
        className={cn("pe-9", className)}
        placeholder="Password"
        type={inputType}
        {...props}
      />
      <button
        type="button"
        onClick={toggleVisibility}
        disabled={props.disabled}
        aria-label={inputType === "text" ? "Hide password" : "Show password"}
        aria-pressed={inputType === "text"}
        aria-controls={id}
        className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 cursor-pointer items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
      >
        {inputType === "text" ? (
          <EyeOffIcon size={16} aria-hidden="true" />
        ) : (
          <EyeIcon size={16} aria-hidden="true" />
        )}
      </button>
    </div>
  );
};
