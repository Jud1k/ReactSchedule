import { Lesson } from "@/types/schedule";

interface LessonCardProps {
  lesson:Lesson
}

export default function LessonCard({lesson={
  subject : "Название пары",
  room : "Аудитория",
  teacher : "Преподаватель",
  type_lesson : "Тип занятия",
}}: LessonCardProps) {
  return (
    <div className="card w-96 bg-base-100 shadow-sm card-lg">
      <div className="card-body">
        <h2 className="card-title">{lesson.subject}</h2>
        <h1>{lesson.room}</h1>
        <p>{lesson.teacher}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-success">{lesson.type_lesson}</div>
        </div>
      </div>
    </div>
  );
}
