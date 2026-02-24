import React from "react";
import { FEATURED_STARTUPS_QUERY } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/live";
import FeaturedPromotion from "@/components/FeaturedPromotion";
import { Rocket } from "lucide-react";

const FeaturedStartups = async () => {
  const { data: posts } = await sanityFetch({ query: FEATURED_STARTUPS_QUERY });

  if (posts.length === 0) return null;

  // Take the first post as the main promotion
  const mainPromotion = posts[0];

  return (
    <div className="mb-24">
      <div className="mb-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
            <Rocket className="size-7" />
          </div>
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">
              Trending <span className="text-primary">Now</span>
            </h2>
            <p className="text-lg text-slate-500">The most viewed pitches this week</p>
          </div>
        </div>
        <div className="hidden h-px flex-1 bg-slate-100 mx-12 md:block" />
      </div>

      {/* Main Featured Promotion */}
      <FeaturedPromotion post={mainPromotion} />
      
      <div className="mt-20 h-px w-full bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
    </div>
  );
};

export default FeaturedStartups;
