import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import "easymde/dist/easymde.min.css";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import { SanityLive } from "@/sanity/lib/live";

export const metadata: Metadata = {
  title: "Loom | Pitch, Vote and Grow",
  description: "The ultimate platform for the next generation of founders.",
};

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-slate-950 font-sans antialiased",
          inter.variable,
        )}
      >
        {children}
        <Toaster />
        <SanityLive />
      </body>
    </html>
  );
}
