import Nav from "@/components/client/nav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="">
      <div className=" bg-[#fafbfc] dark:bg-secondary ">
        <Nav />
        <div className=" mt-10">{children}</div>
      </div>
    </main>
  );
}
