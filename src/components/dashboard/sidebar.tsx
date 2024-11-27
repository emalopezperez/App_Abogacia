import Logo from "../ui/logo";
import SidebarRoutes from "./sidebar-routes";

const Sidebar = () => {
  return (
    <aside className="h-screen ">
      <div className="h-full flex flex-col border-r  overflow-y-auto">
        <Logo />

        <SidebarRoutes />
      </div>
    </aside>
  );
};

export default Sidebar;
