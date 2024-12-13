import { ModeToggle } from "@/components/shared/toggle-theme";
import Logo from "@/components/ui/logo";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { isAdmin } from "@/utils/isAdmin";
import { Button } from "../ui/button";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
  { name: "Calendar", href: "/bookins" },
];

const Nav = async () => {
  return (
    <nav className="sticky top-0 flex items-center justify-between p-6 lg:px-8  h-20 bg-slate-50 shadow-sm">
      <ul className="flex items-center justify-between gap-4">
        <li>
          <Link href="/">
            <Logo />
          </Link>
        </li>
      </ul>
      {/* <ul className="flex items-center justify-between gap-4">
        {navigation.map((item) => (
          <li key={item.name}>
            <Link href={item.href}>{item.name}</Link>
          </li>
        ))}

        {isAdminCheck && (
          <Link href="/dashboard">
            <Button>Dashboard</Button>
          </Link>
        )}
      </ul>
      <div className="flex items-center justify-between gap-6">
        {!user ? (
          <ul className="flex items-center justify-between gap-4 w-22">
            <li>
              <Link href="/sign-in">Login</Link>
            </li>
          </ul>
        ) : (
          <div className="flex gap-2 items-center w-22">
            <ModeToggle />
            <UserButton />
          </div>
        )}
      </div> */}
    </nav>
  );
};

export default Nav;
