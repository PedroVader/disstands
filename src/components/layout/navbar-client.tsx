"use client";

import dynamic from "next/dynamic";

const Navbar = dynamic(
  () => import("./navbar").then((mod) => ({ default: mod.Navbar })),
  { ssr: false }
);

export function NavbarClient() {
  return <Navbar />;
}
