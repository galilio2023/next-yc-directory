import React from "react";
import Navbar from "@/components/Navbar";

/**
 * Layout wrapper that renders the navigation bar followed by its children.
 *
 * @param children - Content to render after the navigation bar inside the main container
 * @returns A JSX element containing a <main> with the Navbar followed by `children`
 */
export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main>
      <Navbar />
      {children}
    </main>
  );
}