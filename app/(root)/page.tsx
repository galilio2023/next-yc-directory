import SearchForm from "@/components/SearchForm";
import { SanityLive } from "@/sanity/lib/live";
import { Suspense } from "react";
import StartupList, { StartupListSkeleton } from "@/components/StartupList";
import FeaturedStartups from "@/components/FeaturedStartups";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-primary/30">
      <section className="relative w-full py-24 lg:py-40 overflow-hidden bg-dot-pattern">
        {/* Designer Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/20 blur-[120px] animate-pulse" />
          <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-violet-500/10 blur-[120px] animate-pulse delay-700" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)]" />
        </div>

        <div className="container relative z-10 mx-auto px-6 text-center">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm mb-8 shadow-2xl">
            <span className="mr-2 flex h-2 w-2 rounded-full bg-primary animate-ping" />
            Weaving the next generation of founders
          </div>
          
          <h1 className="text-6xl font-black tracking-tight text-white sm:text-7xl lg:text-8xl leading-[1.1]">
            Pitch Your <span className="text-primary drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">Startup</span>,<br />
            <span className="text-gradient">Build the Future.</span>
          </h1>
          
          <p className="mt-8 mx-auto max-w-2xl text-lg text-slate-400 sm:text-xl leading-relaxed">
            The premier platform to connect founders, ideas, and opportunities.
          </p>

          <div className="mt-12 flex justify-center">
            <SearchForm query={query} />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-6 py-24">
        {!query && (
          <Suspense fallback={<StartupListSkeleton />}>
            <FeaturedStartups />
          </Suspense>
        )}
        
        <Suspense fallback={<StartupListSkeleton />}>
          <StartupList query={query} />
        </Suspense>
      </section>

      <SanityLive />
    </div>
  );
}
