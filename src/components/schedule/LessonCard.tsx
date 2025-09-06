import { Lesson } from "@/schemas";
import Badge from "../generic/Badge";

interface LessonCardProps {
  lesson: Lesson;
}

export default function LessonCard({ lesson }: LessonCardProps) {
  return (
    <div className="card w-96 bg-base-100 shadow-sm card-lg">
      <div className="card-body">
        <h2 className="card-title">{lesson.subject}</h2>
        <h1>{lesson.room}</h1>
        <p>{lesson.teacher}</p>
        <div className="card-actions justify-end">
          <Badge>{lesson.type_lesson}</Badge>
        </div>
      </div>
    </div>
  );
}
