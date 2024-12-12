"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/dashboard")}
      className="min-h-20 h-20 flex items-center px-6 cursor-pointer gap-2 border-b ">
      <Image
        src="/logo.svg"
        width={15}
        height={15}
        alt="svg"
        priority
        className="rotate-60"
      />
      <h1 className="font-bold text-xl font-serif">Abogacia</h1>
    </div>
  );
};

export default Logo;
