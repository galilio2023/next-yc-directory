import React, { Suspense } from "react";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import markdownit from "markdown-it";
import { Skeleton } from "@/components/ui/skeleton";
import View from "@/components/View";
import { User, Calendar, Tag, ArrowLeft } from "lucide-react";

const md = markdownit();

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
  if (!post) return notFound();
  const parseContent = md.render(post?.pitch || "");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-primary/30">
      {/* Hero Section */}
      <section className="relative w-full py-20 lg:py-32 overflow-hidden bg-dot-pattern border-b border-white/5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[25%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/10 blur-[120px]" />
        </div>

        <div className="container relative z-10 mx-auto px-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-primary transition-colors mb-8 group"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to Explore
          </Link>

          <div className="flex flex-col items-start">
            <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary backdrop-blur-sm mb-6">
              <Tag className="mr-2 size-3.5" />
              {post.category}
            </div>
            
            <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-7xl max-w-4xl leading-[1.1]">
              {post.title}
            </h1>
            
            <p className="mt-8 max-w-3xl text-lg text-slate-400 sm:text-xl leading-relaxed">
              {post.description}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-8 text-sm text-slate-400">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Calendar className="size-4" />
                </div>
                {formatDate(post._createdAt)}
              </div>
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <User className="size-4" />
                </div>
                By {post.author.name}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="relative aspect-video w-full overflow-hidden rounded-[2.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] mb-20">
            <img
              src={post.image}
              alt={post.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-8">
                <div className="h-8 w-1 bg-primary rounded-full" />
                <h2 className="text-3xl font-bold text-white">The Pitch</h2>
              </div>
              
              {parseContent ? (
                <article
                  dangerouslySetInnerHTML={{ __html: parseContent }}
                  className="prose prose-invert prose-slate prose-lg max-w-none break-words 
                    prose-headings:text-white prose-headings:font-black prose-p:text-slate-400 prose-p:leading-relaxed
                    prose-strong:text-primary prose-a:text-primary hover:prose-a:text-primary/80 transition-colors"
                />
              ) : (
                <p className="text-slate-500 italic text-lg">No details provided for this pitch.</p>
              )}
            </div>

            <div className="space-y-10">
              {/* Founder Card */}
              <div className="rounded-[2rem] border border-white/5 p-8 bg-white/5 backdrop-blur-sm sticky top-24">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-8">The Founder</h3>
                <Link
                  href={`/user/${post.author?._id}`}
                  className="flex items-center gap-5 group"
                >
                  <div className="relative h-20 w-20 overflow-hidden rounded-2xl border-2 border-primary/20 shadow-2xl transition-transform group-hover:scale-105">
                    <Image
                      src={post.author.image}
                      alt={post.author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-xl font-black text-white group-hover:text-primary transition-colors">
                      {post.author.name}
                    </p>
                    <p className="text-sm text-slate-500 font-medium">
                      @{post.author.username}
                    </p>
                  </div>
                </Link>
                
                <div className="mt-10 pt-8 border-t border-white/5 flex flex-col gap-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Live Views</span>
                    <Suspense fallback={<Skeleton className="h-8 w-24 rounded-full" />}>
                      <View id={id} />
                    </Suspense>
                  </div>
                  
                  <button className="w-full py-4 rounded-2xl bg-primary text-white font-bold text-sm shadow-[0_0_20px_rgba(99,102,241,0.3)] hover:bg-primary/90 transition-all active:scale-[0.98]">
                    Connect with Founder
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Page;
