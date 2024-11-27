"use client";

import { Separator } from "@/components/ui/separator";
import { dataSidebar, dataSupportSidebar, dataToolsSidebar } from "@/constants";
import { Button } from "@/components/ui/button";
import SidebarItem from "./sidebar-item";

const SidebarRoutes = () => {
  return (
    <aside className=" flex flex-col justify-between h-full">
      <div>
        <div className="p-2 md:p-4">
          <h3 className="text-slate-500 mb-2">General</h3>
          {dataSidebar.map((item) => (
            <SidebarItem item={item} key={item.label} />
          ))}
        </div>

        <Separator />
        <div className="p-2 md:p-4">
          <h3 className="text-slate-500 mb-2">Suports</h3>
          {dataToolsSidebar.map((item) => (
            <SidebarItem item={item} key={item.label} />
          ))}
        </div>

        <Separator />

        <div className="p-2 md:p-4">
          <h3 className="text-slate-500 mb-2">Settings</h3>
          {dataSupportSidebar.map((item) => (
            <SidebarItem item={item} key={item.label} />
          ))}
        </div>
      </div>
      <div>
        <Separator />

        <footer className="mt-2 p-3 text-center">
          2024 © All rights reserved
        </footer>
      </div>
    </aside>
  );
};

export default SidebarRoutes;
