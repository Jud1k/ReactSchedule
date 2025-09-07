import { useSearchParams } from "react-router";
import CenterText from "@/components/generic/CenterText";
import ScheduleSidebar from "@/components/schedule/ScheduleSidebar";
import ScheduleContainer from "@/components/schedule/ScheduleContainer";

export default function SchedulePage() {
  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("group");
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        <div className="md:w-3/5 lg:w-2/3 md:pr-8">
          {groupId ? (
            <ScheduleContainer />
          ) : (
            <CenterText message="Выберите группу для отображения расписания" />
          )}
        </div>
        <div className="md:w-2/5 lg:w-1/3 max-w-md mx-auto md:mx-0 sticky top-4">
          <ScheduleSidebar />
        </div>
      </div>
    </div>
  );
}
