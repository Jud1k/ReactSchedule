// import { Lesson } from "@/types/schedule";

// interface LessonCardProps {
//   lesson:Lesson
// }

// export default function EditableLessonCard({lesson={
//   subject : "Название пары",
//   room : "Аудитория",
//   teacher : "Преподаватель",
//   type_lesson : "Тип занятия",
// }}: LessonCardProps) {
//   return (
//     <div className="card w-96 bg-base-100 shadow-sm card-lg">
//       <div className="card-body">
//         <h2 className="card-title">{lesson.subject}</h2>
//         <h1>{lesson.room}</h1>
//         <p>{lesson.teacher}</p>
//         <div className="card-actions justify-end">
//           <div className="badge badge-success">{lesson.type_lesson}</div>
//         </div>
//       </div>
//     </div>
//   );
// }

// EditableLessonCard.tsx
import InputField from "@/components/generic/InputField";
import { Lesson } from "@/types/schedule";
import { useState } from "react";

interface LessonCardProps {
  lesson: Lesson;
}

export default function EditableLessonCard({
  lesson = {
    subject: "Название пары",
    room: "Аудитория",
    teacher: "Преподаватель",
    type_lesson: "Тип занятия",
  },
}: LessonCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLesson, setEditedLesson] = useState(lesson);

  const handleChange = (field: keyof Lesson, value: string) => {
    setEditedLesson((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex gap-4 items-start">
      <div className="card w-96 bg-base-100 shadow-sm card-lg">
        <div className="card-body">
          {/* Поле предмета */}
          {isEditing ? (
            <InputField
              label="Название предмета"
              value={editedLesson.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
            />
          ) : (
            <h2 className="card-title">{lesson.subject}</h2>
          )}

          {/* Поле аудитории */}
          {isEditing ? (
            <InputField
              label="Название аудитории"
              value={editedLesson.room}
              onChange={(e) => handleChange("room", e.target.value)}
            />
          ) : (
            <h1>{lesson.room}</h1>
          )}

          {/* Поле преподавателя */}
          {isEditing ? (
            <InputField
              label="Название преподавателя"
              value={editedLesson.teacher}
              onChange={(e) => handleChange("teacher", e.target.value)}
            />
          ) : (
            <p>{lesson.teacher}</p>
          )}

          <div className="card-actions justify-end">
            {isEditing ? (
              <select
                className="select select-bordered select-sm"
                value={editedLesson.type_lesson}
                onChange={(e) => handleChange("type_lesson", e.target.value)}
              >
                <option value="Лекция">Лекция</option>
                <option value="Практика">Практика</option>
                <option value="Лабораторная">Лабораторная</option>
              </select>
            ) : (
              <div className="badge badge-success">{lesson.type_lesson}</div>
            )}
          </div>
        </div>
      </div>

      {/* Блок кнопок */}
      <div className="flex flex-col gap-2 mt-2">
        {isEditing ? (
          <>
            <button className="btn btn-sm btn-success">Сохранить</button>
            <button
              className="btn btn-sm btn-error"
              onClick={() => setIsEditing(false)}
            >
              Отменить
            </button>
          </>
        ) : (
          <button
            className="btn btn-sm btn-primary"
            onClick={() => setIsEditing(true)}
          >
            Редактировать
          </button>
        )}
      </div>
    </div>
  );
}
