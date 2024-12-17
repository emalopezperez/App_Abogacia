"use client";

import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, SearchIcon, UserPlus } from "lucide-react";
import { UserButton, useUser } from "@clerk/nextjs";

import Logo from "../ui/logo";
import { ModeToggle } from "../shared/toggle-theme";
import SidebarRoutes from "../dashboard/sidebar/sidebar-routes";
import { Search } from "../dashboard/search";
import Link from "next/link";
import { Button } from "../ui/button";

const routes = [
  { label: "Inicio", href: "/" },
  { label: "Blog", href: "/blog" },
  { label: "Agenda", href: "/bookins" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Contacto", href: "/contact" },
];

const NavBar = () => {
  const { user } = useUser();
  return (
    <div className="flex sticky top-0 items-center px-2 gap-x-4 md:px-4 justify-between w-full bg-background border-b h-20 z-50">
      <ul className="flex items-center gap-x-4">
        {routes.map((route) => (
          <li key={route.href}>
            <Link href={route.href}>{route.label}</Link>
          </li>
        ))}
      </ul>

      <div className="relative w-[300px] ">
        <Search />
      </div>

      <div className="flex gap-x-2 items-center w-26">
        <ModeToggle />
        {user?.id ? (
          <UserButton />
        ) : (
          <Link href="/sign-in">
            <Button>
              <UserPlus className="w-4 h-4 mr-1" /> Iniciar sesión
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
