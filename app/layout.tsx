import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import "easymde/dist/easymde.min.css";
import { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "YC Directory",
  description: "Pitch, Vote and Grow",
};

const workSans = localFont({
  src: [
    {
      path: "../public/fonts/workSans-Black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/fonts/workSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/fonts/workSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/workSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/workSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/workSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/workSans-Thin.ttf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/workSans-ExtraLight.ttf",
      weight: "100",
      style: "normal",
    },
  ],
  variable: "--font-work-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={workSans.variable}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
