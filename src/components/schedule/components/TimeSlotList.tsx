import CustomError from "../../generic/CustomError";
import Spinner from "../../generic/Spinner";
import { useSchedule } from "../hooks/useSchedule";
import LessonCard from "./LessonCard";
import LessonGrid from "./LessonGrid";
import { TimeSlot, CardRender } from "@/types";
import EditableLessonCard from "./EditableLessonCard";

interface TimeSlotListProps {
  groupId: string;
  dayWeek: number | null;
  renderCard?: CardRender;
  isAdmin?: boolean;
}

export default function TimeSlotList({
  groupId,
  dayWeek,
  renderCard = (lesson) => <LessonCard lesson={lesson} />,
  isAdmin = false,
}: TimeSlotListProps) {
  const timeSlots: TimeSlot[] = [
    { id: 1, duration: "9:00-10:35" },
    { id: 2, duration: "10:45-12:20" },
    { id: 3, duration: "13:20-14:55" },
    { id: 4, duration: "15:10-16:45" },
    { id: 5, duration: "16:55-18:30" },
    { id: 6, duration: "18:40-20:15" },
  ];

  const { lessons, isLoading, error } = useSchedule(groupId, dayWeek);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <CustomError message={error} />;
  }
  return (
    <LessonGrid
      lessons={lessons}
      timeSlots={timeSlots}
      renderCard={
        isAdmin
          ? (lesson) => <EditableLessonCard lesson={lesson} />
          : renderCard
      }
    />
  );
}
