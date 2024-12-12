import { EventManagementTabs } from "@/components/dashboard/event/event-management-tabs";
import { HeaderTitle } from "@/components/shared/header-title";

export default async function CreateEvents() {
  return (
    <>
      <HeaderTitle
        title="Crear nuevo evento"
        contentToolTip="Crear nuevo evento"
        description="Crear nuevo evento"
      />
      <div className="mt-10">
        <EventManagementTabs />
      </div>
    </>
  );
}
