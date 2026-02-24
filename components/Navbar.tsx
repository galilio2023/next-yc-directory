import React from "react";
import Link from "next/link";
import { auth, signIn, signOut } from "@/auth";
import { BadgePlus, LogIn, LogOut, Layers, User } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center mx-auto px-6">
        <nav className="flex w-full items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110">
              <Layers className="size-6" />
            </div>
            <span className="text-2xl font-black tracking-tighter text-white">
              Lo<span className="text-primary">om</span>
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            {session?.user ? (
              <>
                <Button asChild variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-white/5">
                  <Link href="/startup/create">
                    <BadgePlus className="mr-2 size-4" />
                    <span className="max-sm:hidden">Create</span>
                  </Link>
                </Button>
                
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <Button type="submit" variant="ghost" size="sm" className="text-slate-400 hover:text-red-400 hover:bg-red-500/10">
                    <LogOut className="mr-2 size-4" />
                    <span className="max-sm:hidden">Logout</span>
                  </Button>
                </form>

                <Link href={`/user/${session.user.id}`} className="transition-transform hover:scale-105">
                  <Avatar className="size-10 border-2 border-primary/20 bg-slate-900">
                    <AvatarFallback className="bg-slate-900 text-slate-400">
                      <User className="size-5" />
                    </AvatarFallback>
                  </Avatar>
                </Link>
              </>
            ) : (
              <form
                action={async () => {
                  "use server";
                  await signIn("github");
                }}
              >
                <Button size="sm" className="bg-primary text-white hover:bg-primary/90 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                  <LogIn className="mr-2 size-4" />
                  Login
                </Button>
              </form>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
