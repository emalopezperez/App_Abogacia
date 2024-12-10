import Logo from "@/components/ui/logo";
import SidebarRoutes from "./sidebar-routes";
import { ScrollArea } from "@/components/ui/scroll-area";

const Sidebar = () => {
  return (
    <aside className="h-screen ">
      <div className="h-full flex flex-col border-r  ">
        <Logo />
        <ScrollArea className="  rounded-md border p-4">
          <SidebarRoutes />
        </ScrollArea>
      </div>
    </aside>
  );
};

export default Sidebar;
