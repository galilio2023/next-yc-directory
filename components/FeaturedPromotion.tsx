import React from "react";
import Link from "next/link";
import { StartupCardType } from "@/components/StartupCard";
import { ArrowRight, Eye, Tag, User, Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";

const FeaturedPromotion = ({ post }: { post: StartupCardType }) => {
  const { _id, title, description, image, category, views, author, _createdAt } = post;

  return (
    <div className="group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-white/5 backdrop-blur-xl shadow-2xl transition-all hover:border-primary/50 hover:shadow-[0_0_50px_rgba(99,102,241,0.1)]">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section */}
        <div className="relative aspect-video w-full lg:aspect-auto lg:w-1/2 overflow-hidden">
          <img
            src={image}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/20 to-transparent lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent lg:hidden block" />
          
          <div className="absolute top-8 left-8">
            <div className="inline-flex items-center rounded-full bg-primary px-5 py-2 text-xs font-black uppercase tracking-[0.2em] text-white shadow-[0_0_20px_rgba(99,102,241,0.5)]">
              Featured Pitch
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex w-full flex-col justify-center p-10 lg:w-1/2 lg:p-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-bold text-slate-300 backdrop-blur-sm border border-white/5">
              <Tag className="size-3.5 text-primary" />
              {category}
            </div>
            <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-1.5 text-xs font-bold text-slate-300 backdrop-blur-sm border border-white/5">
              <Eye className="size-3.5 text-primary" />
              {views} Views
            </div>
          </div>

          <h3 className="text-4xl font-black text-white sm:text-5xl lg:text-6xl leading-[1.1] group-hover:text-primary transition-colors">
            {title}
          </h3>
          
          <p className="mt-8 text-lg text-slate-400 line-clamp-3 leading-relaxed">
            {description}
          </p>

          <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-10">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 overflow-hidden rounded-2xl border-2 border-primary/20 bg-slate-800 shadow-xl transition-transform group-hover:scale-110">
                {author?.image ? (
                  <img src={author.image} alt={author.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-slate-500">
                    <User className="size-6" />
                  </div>
                )}
              </div>
              <div>
                <p className="text-base font-black text-white">{author?.name}</p>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <Calendar className="size-3 text-primary" />
                  {formatDate(_createdAt)}
                </div>
              </div>
            </div>

            <Link
              href={`/startup/${_id}`}
              className="inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-sm font-black text-slate-950 transition-all hover:bg-primary hover:text-white hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] active:scale-95"
            >
              View Pitch
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPromotion;
