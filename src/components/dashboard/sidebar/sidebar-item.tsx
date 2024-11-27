import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
  item: {
    label: string;
    icon: LucideIcon;
    href: string;
  };
  key: string;
}

const SidebarItem = ({ item }: SidebarItemProps) => {
  const { label, icon: Icon, href } = item;
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={cn(
        `flex gap-x-2 mt-2 ligth:text-slate-700 dark:text-white  text-sm items-center hover:bg-slate-300/20 p-2 rounded-lg cursor-pointer`,
        pathname === href && "bg-slate-400/20"
      )}>
      <Icon strokeWidth={2} className="w-5 h-5" />
      {label}
    </Link>
  );
};

export default SidebarItem;
