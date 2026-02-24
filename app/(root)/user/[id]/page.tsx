import React, { Suspense } from "react";
import { auth } from "@/auth";
import { client } from "@/sanity/lib/client";
import { AUTHOR_BY_ID_QUERY } from "@/sanity/lib/queries";
import { notFound } from "next/navigation";
import Image from "next/image";
import UserStartups from "@/components/UserStartups";
import { StartupCardSkeleton } from "@/components/StartupCard";
import { Mail, Github, Rocket } from "lucide-react";

const Page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  if (!id) return notFound();

  const session = await auth();
  const user = await client.fetch(AUTHOR_BY_ID_QUERY, { id });

  if (!user) return notFound();

  return (
    <div className="min-h-screen bg-slate-950 selection:bg-primary/30">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-violet-500/5 blur-[120px]" />
      </div>

      <section className="container relative z-10 mx-auto px-6 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-10">
              <div className="relative aspect-square w-full overflow-hidden rounded-[2.5rem] border-2 border-primary/20 bg-slate-900 shadow-[0_0_50px_rgba(99,102,241,0.2)] transition-transform hover:scale-[1.02]">
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              
              <div className="space-y-4">
                <h1 className="text-4xl font-black tracking-tight text-white leading-tight">
                  {user.name}
                </h1>
                <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-bold text-primary border border-primary/20">
                  @{user.username}
                </div>
              </div>

              <p className="text-lg text-slate-400 leading-relaxed">
                {user.bio || "This founder is busy building the future and hasn't written a bio yet."}
              </p>

              <div className="space-y-4 pt-8 border-t border-white/5">
                <a 
                  href={`https://github.com/${user.username}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm font-medium text-slate-400 hover:text-white transition-colors group"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                    <Github className="size-4" />
                  </div>
                  <span>github.com/{user.username}</span>
                </a>
                
                {user.email && (
                  <div className="flex items-center gap-3 text-sm font-medium text-slate-400 group">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                      <Mail className="size-4" />
                    </div>
                    <span>{user.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* User's Startups */}
          <div className="lg:col-span-3">
            <div className="mb-12 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-inner">
                  <Rocket className="size-7" />
                </div>
                <div>
                  <h2 className="text-4xl font-extrabold tracking-tight text-white">
                    {session?.user?.id === id ? "Your" : `${user.name}'s`} <span className="text-primary">Startups</span>
                  </h2>
                  <p className="text-lg text-slate-500">Explore the pitches from this founder</p>
                </div>
              </div>
              <div className="hidden h-px flex-1 bg-white/5 mx-12 md:block" />
            </div>

            <ul className="grid grid-cols-1 gap-10 md:grid-cols-2">
              <Suspense fallback={<StartupCardSkeleton />}>
                <UserStartups id={id} />
              </Suspense>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Page;
