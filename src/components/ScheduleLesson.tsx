import { useEffect, useMemo, useState } from "react";
import LessonCard from "./LessonCard";

// Типы для временных слотов
interface TimeSlot {
  id: number;
  duration: string;
}

// Типы для данных урока с сервера
interface Lesson {
  time_id: number;
  subject: string;
  room: string;
  teacher: string;
  type_lesson: string;
  day_week:number;
}

// Пропсы компонента
interface ScheduleLessonProps {
  groupId: string | number; // Можно уточнить тип в зависимости от API
  dayWeek:number|null;
}
export default function ScheduleLesson({ groupId,dayWeek }: ScheduleLessonProps) {
  // Все возможные временные слоты (6 штук)

  const timeSlots: TimeSlot[] = [
    { id: 1, duration: "9:00-10:35" },
    { id: 2, duration: "10:45-12:20" },
    { id: 3, duration: "13:20-14:55" },
    { id: 4, duration: "15:10-16:45" },
    { id: 5, duration: "16:55-18:30" },
    { id: 6, duration: "18:40-20:15" },
  ];

  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/schedule/lessons/?group_id=${groupId}`
        );
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

  const filtredLessons = useMemo(()=>{
    return lessons?.filter(lesson=>lesson.day_week === dayWeek) || []
  },[lessons,dayWeek])

  if (isLoading) {
    return <span className="loading loading-spinner text-success"></span>;
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
          const lessonForSlot = filtredLessons.find(
            (lesson) => lesson.time_id === timeSlot.id
          );

          return (
            <div
              key={timeSlot.id}
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
