import React from "react";
import StartupForm from "@/components/StartupForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if (!session) redirect("/");
  
  return (
    <div className="min-h-screen bg-slate-950 selection:bg-primary/30">
      <section className="relative w-full py-20 lg:py-32 overflow-hidden bg-dot-pattern border-b border-white/5">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-[25%] -right-[10%] w-[70%] h-[70%] rounded-full bg-primary/10 blur-[120px]" />
        </div>

        <div className="container relative z-10 mx-auto px-6 text-center">
          <div className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-white/80 backdrop-blur-sm mb-8 shadow-2xl">
            <span className="mr-2 flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            Share your vision with the world
          </div>
          
          <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]">
            Submit Your <span className="text-primary drop-shadow-[0_0_15px_rgba(99,102,241,0.5)]">Startup</span>
          </h1>
          
          <p className="mt-8 mx-auto max-w-2xl text-lg text-slate-400 sm:text-xl leading-relaxed">
            Connect with early adopters, get feedback, and find the traction your idea deserves.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto rounded-[2.5rem] border border-white/5 bg-white/5 p-8 shadow-2xl backdrop-blur-xl sm:p-16">
          <StartupForm />
        </div>
      </section>
    </div>
  );
};
export default Page;
