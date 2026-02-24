import React from "react";
import Ping from "@/components/Ping";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";
import { writeClient } from "@/sanity/lib/write-client";
import { after } from "next/server";
import { EyeIcon } from "lucide-react";
import { sanityFetch } from "@/sanity/lib/live";

const View = async ({ id }: { id: string }) => {
  const { data: post } = await sanityFetch({
    query: STARTUP_VIEWS_QUERY,
    params: { id },
  });

  const totalViews = post?.views || 0;

  after(
    async () =>
      await writeClient
        .patch(id)
        .set({ views: totalViews + 1 })
        .commit(),
  );

  return (
    <div className="flex items-center gap-3 rounded-full bg-white/5 px-4 py-1.5 text-sm font-bold text-slate-300 backdrop-blur-md border border-white/5 shadow-xl">
      <div className="flex items-center gap-2">
        <EyeIcon className="size-4 text-primary" />
        <span>
          {totalViews} <span className="text-slate-500 font-medium">View{totalViews !== 1 ? "s" : ""}</span>
        </span>
      </div>
      <div className="h-4 w-px bg-white/10" />
      <Ping />
    </div>
  );
};

export default View;
