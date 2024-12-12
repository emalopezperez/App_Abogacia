import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, SearchIcon } from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import SidebarRoutes from "./sidebar/sidebar-routes";
import Logo from "../ui/logo";
import { ModeToggle } from "../shared/toggle-theme";
import { Search } from "./search";

const NavBar = () => {
  return (
    <div className="flex sticky top-0 items-center px-2 gap-x-4 md:px-4 justify-between w-full bg-background border-b h-20 z-50">
      <div className="block xl:hidden">
        <Sheet>
          <SheetTrigger className="flex items-center">
            <Menu className="" />
          </SheetTrigger>
          <SheetContent side="left" className="z-50">
            <SheetTitle>
              <Logo />
            </SheetTitle>
            <SidebarRoutes />
          </SheetContent>
        </Sheet>
      </div>

      <div className="relative w-[300px] ">
        <Search />
      </div>

      <div className="flex gap-x-2 items-center">
        <ModeToggle />
        <UserButton />
      </div>
    </div>
  );
};

export default NavBar;
