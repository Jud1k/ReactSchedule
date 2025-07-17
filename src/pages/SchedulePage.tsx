import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import TimeSlotList from "@/components/schedule/TimeSlotList";
import CenterText from "@/components/generic/CenterText";
import ScheduleSidebar from "@/components/schedule/ScheduleSidebar";

export default function SchedulePage({ isAdmin = false }) {
  const [searchParams] = useSearchParams();
  const groupId = searchParams.get("group");
  const [selectedDayWeek, setSelectedDayWeek] = useState<number | null>(null);
  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      <div className="flex flex-col md:flex-row gap-8 justify-center">
        <div className="md:w-3/5 lg:w-2/3 md:pr-8">
          {groupId ? (
            <TimeSlotList
              groupId={groupId}
              dayWeek={selectedDayWeek}
              isAdmin={isAdmin}
            />
          ) : (
            <CenterText message="Выберите группу для отображения расписания" />
          )}
        </div>
        <div className="md:w-2/5 lg:w-1/3 max-w-md mx-auto md:mx-0 sticky top-4">
          <ScheduleSidebar onDaySelect={setSelectedDayWeek} />
        </div>
      </div>
    </div>
  );
}
