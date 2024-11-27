import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Menu, SearchIcon } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import SidebarRoutes from "./sidebar-routes";
import Logo from "../ui/logo";
import { ModeToggle } from "../shared/toggle-theme";

const NavBar = () => {
  return (
    <div className="flex items-center px-2 gap-x-4 md:px-4 justify-between w-full bg-background border-b h-20 ">
      <div className="block xl:hidden">
        <Sheet>
          <SheetTrigger className="flex items-center">
            <Menu className="" />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetTitle>
              <Logo />
            </SheetTitle>
            <SidebarRoutes />
          </SheetContent>
        </Sheet>
      </div>

      <div className="relative w-[300px] ">
        <Input placeholder="Search..." className="rounded-lg" />
        <SearchIcon strokeWidth={1} className="absolute top-2 right-2" />
      </div>

      <div className="flex gap-x-2 items-center">
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
};

export default NavBar;
