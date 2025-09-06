import { Calendar } from "./Calendar";
import GroupSelector from "./GroupSelector";

export default function ScheduleSidebar() {
  return (
    <>
      <GroupSelector />
      <Calendar />
    </>
  );
}
