import { CardSumary } from "@/components/dashboard/card-sumary";
import { Separator } from "@/components/ui/separator";
import { dataCardSumary } from "@/constants";

export default function Page() {
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
