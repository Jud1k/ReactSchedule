import Badge from "../generic/Badge";
import { Lesson } from "@/schemas";
import { TimeSlot, CardRender } from "@/types";

interface LessonGridProps {
  lessons: Lesson[];
  timeSlots: TimeSlot[];
  renderCard: CardRender;
}

const LessonGrid = ({ lessons, timeSlots, renderCard }: LessonGridProps) => {
  return (
    <div className="px-6">
      <div className="flex flex-col gap-4">
        {timeSlots.map((timeSlot) => {
          // Проверяем, есть ли карточка для этого времени
          const lessonForSlot = lessons.find(
            (lesson) => lesson.time_id === timeSlot.id
          );
          return (
            <div key={timeSlot.id} className="flex flex-col gap-2">
              <Badge>{timeSlot.duration}</Badge>
              {lessonForSlot && renderCard(lessonForSlot)}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LessonGrid;
