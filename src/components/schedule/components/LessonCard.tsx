interface LessonCardProps {
  subject?: string;
  room?: string;
  teacher?: string;
  type_lesson?: string;
}

export default function LessonCard({
  subject = "Название пары",
  room = "Аудитория",
  teacher = "Преподаватель",
  type_lesson = "Тип занятия",
}: LessonCardProps) {
  return (
    <div className="card w-96 bg-base-100 shadow-sm card-lg">
      <div className="card-body">
        <h2 className="card-title">{subject}</h2>
        <h1>{room}</h1>
        <p>{teacher}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-success">{type_lesson}</div>
        </div>
      </div>
    </div>
  );
}
