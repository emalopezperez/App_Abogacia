import NavBar from "@/components/dashboard/nav-bar";
import Sidebar from "@/components/dashboard/sidebar/sidebar";
import { Toaster } from "@/components/ui/sonner";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex w-full h-full">
      <div className="hidden xl:block w-80 h-full xl:fixed">
        <Sidebar />
      </div>

      <div className="w-full xl:ml-80 ">
        <NavBar />
        <div className="p-6 bg-[#fafbfc] dark:bg-secondary ">
          {children}
          <Toaster />
        </div>
      </div>
    </main>
  );
}
