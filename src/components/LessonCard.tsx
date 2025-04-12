interface LessonCardProps {
  subject?: string;
  classroom?: string;
  teacher?: string;
  lessonType?: string;
}

export default function LessonCard({
  subject = "Название пары",
  classroom = "Аудитория",
  teacher = "Преподаватель",
  lessonType = "Тип занятия",
}: LessonCardProps) {
  return (
    <div className="card w-96 bg-base-100 shadow-sm card-lg">
      <div className="card-body">
        <h2 className="card-title">{subject}</h2>
        <h1>{classroom}</h1>
        <p>{teacher}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-success">{lessonType}</div>
        </div>
      </div>
    </div>
  );
}
