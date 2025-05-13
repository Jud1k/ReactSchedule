import { useState } from "react";
import Calendar from "./Calendar";
import { useSearchParams } from "react-router-dom";
import GroupSelector from "./GroupSelector";
import { Group } from "@/types";

interface ScheduleMenuProps {
  onDaySelect: (dayWeek: number) => void;
}

export default function ScheduleSidebar({ onDaySelect }: ScheduleMenuProps) {
  const [groupName, setGroupName] = useState("");
  const [resetCalendar, setResetCalendar] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleGroupSelect = (group: Group) => {
    setSearchParams({ group: group.id.toString() });
    setGroupName(group.name);
    setResetCalendar((prev) => !prev);
  };

  return (
    <div>
      {groupName && (
        <span className="badge badge-xl badge-success mb-5">{groupName}</span>
      )}
      <GroupSelector onSelect={handleGroupSelect} />
      <Calendar onDaySelect={onDaySelect} resetTrigger={resetCalendar} />
    </div>
  );
}
