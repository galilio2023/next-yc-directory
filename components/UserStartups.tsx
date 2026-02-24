import React from "react";
import { client } from "@/sanity/lib/client";
import { STARTUPS_BY_AUTHOR_QUERY } from "@/sanity/lib/queries";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import { Rocket } from "lucide-react";

const UserStartups = async ({ id }: { id: string }) => {
  const startups = await client.fetch(STARTUPS_BY_AUTHOR_QUERY, { id });
  
  return (
    <>
      {startups.length > 0 ? (
        startups.map((startup: StartupCardType) => (
          <StartupCard key={startup._id} post={startup} />
        ))
      ) : (
        <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 text-slate-500 mb-6">
            <Rocket className="size-8 opacity-20" />
          </div>
          <h3 className="text-xl font-bold text-white">No startups yet</h3>
          <p className="mt-2 text-slate-500 max-w-xs mx-auto">
            This founder hasn't launched any pitches yet. Check back soon!
          </p>
        </div>
      )}
    </>
  );
};

export default UserStartups;
