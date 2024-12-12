"use client";

import { ModeToggle } from "@/components/shared/toggle-theme";
import Logo from "@/components/ui/logo";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { checkRole } from "@/lib/roles";
import { Button } from "../ui/button";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Calendar", href: "/bookins" },
];

const Nav = () => {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <nav className="sticky top-0 flex items-center justify-between p-6 lg:px-8  h-20 bg-slate-50 shadow-sm">
      <ul className="flex items-center justify-between gap-4">
        <li>
          <Link href="/">
            <Logo />
          </Link>
        </li>
      </ul>
      <ul className="flex items-center justify-between gap-4">
        {navigation.map((item) => (
          <li key={item.name}>
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between gap-6">
        {!user ? (
          <ul className="flex items-center justify-between gap-4">
            <li>
              <Link href="/sign-in">Login</Link>
            </li>
          </ul>
        ) : (
          <div className="flex gap-x-2 items-center">
            <ModeToggle />
            <UserButton />
          </div>
        )}
        {isAdmin && (
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
