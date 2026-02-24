import StartupCard, {
  StartupCardSkeleton,
  StartupCardType,
} from "@/components/StartupCard";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import { Skeleton } from "@/components/ui/skeleton";
import { Rocket } from "lucide-react";

async function StartupList({ query }: { query?: string }) {
  const params = { search: query || null };
  const { data: posts } = await sanityFetch({ query: STARTUPS_QUERY, params });

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Rocket className="size-6" />
          </div>
          <h2 className="text-3xl font-black tracking-tight text-white">
            {query ? (
              <>Search results for <span className="text-primary">&quot;{query}&quot;</span></>
            ) : (
              "Explore Startups"
            )}
          </h2>
        </div>
        <div className="h-px flex-1 bg-white/5 mx-12 hidden md:block" />
        <p className="text-sm text-slate-500 font-bold uppercase tracking-wider">
          {posts.length} {posts.length === 1 ? 'startup' : 'startups'}
        </p>
      </div>

      {posts.length > 0 ? (
        <ul className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: StartupCardType) => (
            <StartupCard key={post?._id} post={post} />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-white/5 text-slate-500 mb-8">
            <Rocket className="size-10 opacity-20" />
          </div>
          <h3 className="text-2xl font-black text-white">No startups found</h3>
          <p className="mt-4 text-slate-500 max-w-sm mx-auto text-lg">
            We couldn&apos;t find any startups matching your search. Try using different keywords or explore all pitches.
          </p>
        </div>
      )}
    </div>
  );
}

export function StartupListSkeleton() {
  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <Skeleton className="h-10 w-64 bg-slate-800" />
        <Skeleton className="h-4 w-32 bg-slate-800" />
      </div>
      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        <StartupCardSkeleton />
      </div>
    </div>
  );
}

export default StartupList;
