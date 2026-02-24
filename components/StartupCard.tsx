"use client";

import React from "react";
import { formatDate } from "@/lib/utils";
import { EyeIcon, ArrowUpRight, User, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { Author, Startup } from "@/sanity/types";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export type StartupCardType = Omit<Startup, "author"> & { author?: Author };

const StartupCard = ({ post }: { post: StartupCardType }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;

  return (
    <motion.li
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -8 }}
      className="group relative flex flex-col overflow-hidden rounded-[2rem] border border-white/5 bg-slate-900/50 backdrop-blur-sm transition-all hover:border-primary/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.15)]"
    >
      {/* Image Container */}
      <Link href={`/startup/${_id}`} className="relative aspect-[16/10] overflow-hidden bg-slate-800">
        <img 
          src={image} 
          alt={title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-100" />
        
        <div className="absolute top-4 left-4">
          <div className="flex items-center gap-1.5 rounded-full bg-slate-950/60 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur-md border border-white/10">
            <Tag className="size-3 text-primary" />
            {category}
          </div>
        </div>

        <div className="absolute bottom-4 right-4 translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/20">
            <ArrowUpRight className="size-5" />
          </div>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium">
            <Calendar className="size-3.5 text-primary" />
            {formatDate(_createdAt)}
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-xs font-bold text-slate-300 border border-white/5">
            <EyeIcon className="size-3.5 text-primary" />
            {views}
          </div>
        </div>

        <Link href={`/startup/${_id}`} className="flex-1">
          <h3 className="text-xl font-bold text-white line-clamp-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-400 line-clamp-2">
            {description}
          </p>
        </Link>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-5">
          <Link href={`/user/${author?._id}`} className="flex items-center gap-2.5 group/author">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-800 overflow-hidden transition-transform group-hover/author:scale-110">
              {author?.image ? (
                <img src={author.image} alt={author.name} className="h-full w-full object-cover" />
              ) : (
                <User className="size-4 text-slate-400" />
              )}
            </div>
            <span className="text-sm font-bold text-slate-300 group-hover/author:text-primary transition-colors">
              {author?.name}
            </span>
          </Link>
          
          <div className="h-8 w-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
            <ArrowUpRight className="size-4" />
          </div>
        </div>
      </div>
    </motion.li>
  );
};

export const StartupCardSkeleton = () => (
  <>
    {[0, 1, 2, 3, 4, 5].map((index) => (
      <div key={index} className="flex flex-col space-y-4 rounded-[2rem] border border-white/5 bg-slate-900/50 p-4">
        <Skeleton className="aspect-[16/10] w-full rounded-2xl bg-slate-800" />
        <div className="space-y-3">
          <div className="flex justify-between">
            <Skeleton className="h-4 w-1/4 bg-slate-800" />
            <Skeleton className="h-4 w-1/4 bg-slate-800" />
          </div>
          <Skeleton className="h-6 w-3/4 bg-slate-800" />
          <Skeleton className="h-4 w-full bg-slate-800" />
        </div>
      </div>
    ))}
  </>
);

export default StartupCard;
