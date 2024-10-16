import Link from "next/link";
import React from "react";

const NAV_LINK = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Profile",
    href: "/profile",
  },
];

export default function Navbar() {
  return (
    <nav className="fixed h-16 border-b shadow-sm w-full top-0 bg-background">
      <div className="max-w-screen-xl mx-auto h-full flex items-center justify-between px-4">
        <Link href={"/"} className="font-semibold text-xl">
          RenewEase
        </Link>
        <div className="space-x-5">
          {NAV_LINK.map((link, index) => (
            <NavItem key={index} {...link} />
          ))}
        </div>
      </div>
    </nav>
  );
}

function NavItem({ name, href }: { name: string; href: string }) {
  return (
    <Link
      href={href}
      className="font-medium text-sm hover:underline underline-offset-4"
    >
      {name}
    </Link>
  );
}
