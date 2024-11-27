import { CardSumary } from "@/components/dashboard/card-sumary";
import { dataCardSumary } from "@/constants";
import { checkRole } from "@/lib/roles";
import { redirect } from "next/navigation";

export default function Page() {
  if (!checkRole("admin")) {
    redirect("/");
  }

  return (
    <main className="">
      <h2 className="text-2xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-x-20 ">
        {dataCardSumary.map((item, index) => (
          <CardSumary
            key={index}
            icon={item.icon}
            total={item.total}
            avarage={item.avarage}
            title={item.title}
            tooltipText={item.tooltipText}
          />
        ))}
      </div>
    </main>
  );
}
