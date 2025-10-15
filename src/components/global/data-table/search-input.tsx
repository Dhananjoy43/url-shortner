"use client";

import { useEffect, useRef, useState } from "react";
import { CircleXIcon, ListFilterIcon } from "lucide-react";
import { useDebounce } from "react-use";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number; // optional debounce time
}

export function SearchInput({
  value,
  onChange,
  placeholder,
  debounceMs = 300, // default 300ms
}: SearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [localValue, setLocalValue] = useState(value);

  // Sync localValue with prop value when it changes externally
  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  // Debounce effect
  useDebounce(
    () => {
      onChange(localValue);
    },
    debounceMs,
    [localValue]
  );

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        className={cn("peer h-8 min-w-48 ps-9", Boolean(localValue) && "pe-8")}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        placeholder={placeholder ?? "Search..."}
        type="text"
        aria-label="Search"
      />
      <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
        <ListFilterIcon size={16} aria-hidden="true" />
      </div>
      {Boolean(localValue) && (
        <button
          className="text-muted-foreground/80 hover:text-foreground absolute inset-y-0 end-0 flex h-full w-9 cursor-pointer items-center justify-center rounded-e-md transition"
          aria-label="Clear filter"
          onClick={() => {
            setLocalValue("");
            onChange("");
            if (inputRef.current) inputRef.current.focus();
          }}
        >
          <CircleXIcon size={16} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
