"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchFormReset from "@/components/SearchFormReset";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const SearchForm = ({ query: initialQuery }: { query?: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(initialQuery || "");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("query", query);
      } else {
        params.delete("query");
      }
      router.push(`/?${params.toString()}`, { scroll: false });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query, router, searchParams]);

  return (
    <div className="flex w-full max-w-2xl items-center space-x-2 rounded-2xl border border-white/5 bg-white/5 p-2 shadow-2xl backdrop-blur-xl transition-all focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/50">
      <div className="flex flex-1 items-center px-4">
        <Search className="mr-2 size-5 text-slate-400" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full appearance-none bg-transparent py-3 text-lg text-white placeholder:text-slate-500 focus:outline-none"
          placeholder="Search for innovative startups..."
        />
      </div>
      <div className="flex items-center gap-2 pr-1">
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setQuery("")}
            className="size-10 rounded-xl text-slate-400 hover:bg-white/10 hover:text-white"
          >
            <SearchFormReset />
          </Button>
        )}
        <Button
          type="button"
          className="h-12 rounded-xl px-6 font-black text-white bg-primary shadow-[0_0_20px_rgba(99,102,241,0.3)] transition-all hover:bg-primary/90 active:scale-95"
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString());
            if (query) params.set("query", query);
            else params.delete("query");
            router.push(`/?${params.toString()}`, { scroll: false });
          }}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchForm;
