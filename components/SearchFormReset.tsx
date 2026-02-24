"use client";
import React from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchFormReset = () => {
  const reset = () => {
    const form = document.querySelector(".search-form") as HTMLFormElement;
    if (form) form.reset();
  };
  
  return (
    <Button
      type="reset"
      onClick={reset}
      variant="ghost"
      className="h-10 w-10 rounded-xl p-0 text-slate-400 hover:bg-white/10 hover:text-white transition-all active:scale-95"
      asChild
    >
      <Link href="/">
        <X className="size-5" />
      </Link>
    </Button>
  );
};

export default SearchFormReset;
