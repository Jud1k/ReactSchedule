import { useEffect, useState } from "react";
import LessonCard from "./LessonCard";

export default function ScheduleLesson({groupId}) {
  // Все возможные временные слоты (6 штук)

  const timeSlots = [
    { id: 1, duration: "9:00-10:35" },
    { id: 2, duration: "10:45-12:20" },
    { id: 3, duration: "13:20-14:55" },
    { id: 4, duration: "15:10-16:45" },
    { id: 5, duration: "16:55-18:30" },
    { id: 6, duration: "18:40-20:15" },
  ];

  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch(`http://localhost:8000/schedule/lessons/?group_id=${groupId}`);
        if (!response.ok) {
          throw new Error("Error loading data");
        }
        const data = await response.json();
        setLessons(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLessons();
  }, [groupId]);

  if (isLoading) {
    return (
      <div className="btn m-1 bg-base-100 border border-base-300 shadow-lg rounded-box">
        Загрузка...
      </div>
    );
  }

  if (error) {
    return (
      <div className="btn m-1 bg-base-100 border border-base-300 shadow-lg rounded-box">
        Ошибка: {error}
      </div>
    );
  }

  return (
    <div className="px-6">
      <div className="flex flex-col gap-4">
        {timeSlots.map((timeSlot) => {
          // Проверяем, есть ли карточка для этого времени
          const lessonForSlot = lessons.find(
            (lesson) => lesson.time_id === timeSlot.id
          );

          return (
            <div
              key={`time-slot-${timeSlot.id}`}
              className="flex flex-col gap-2"
            >
              {/* Время (всегда отображается) */}
              <div className="badge badge-lg badge-success self-start">
                {timeSlot.duration}
              </div>

              {/* Карточка (только если есть данные) */}
              {lessonForSlot && (
                <LessonCard
                  subject={lessonForSlot.subject}
                  classroom={lessonForSlot.room}
                  teacher={lessonForSlot.teacher}
                  lessonType={lessonForSlot.type_lesson}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
