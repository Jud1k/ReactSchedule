import LessonCard from "./LessonCard";

export default function ScheduleLesson() {
  // Все возможные временные слоты (6 штук)

  const timeSlots = [
    {id:"1",duration:"9:00-10:35"},
    {id:"2",duration:"10:45-12:20"},
    {id:"3",duration:"13:20-14:55"},
    {id:"4",duration:"15:10-16:45"},
    {id:"5",duration:"16:55-18:30"},
    {id:"6",duration:"18:40-20:15"},
  ]

  // Данные о карточках (может быть меньше 6)
  const lessons = [
    {
      numberLesson: "1", // Привязка к первому слоту
      placeholder: "Математика",
      classroom: "Ауд. 101",
      teacher: "Иванов И.И.",
      lessonType: "Лекция"
    },
    {
      numberLesson: "4", // Привязка к третьему слоту
      placeholder: "Физика",
      classroom: "Ауд. 205",
      teacher: "Петрова П.П.",
      lessonType: "Практика"
    }
    // Остальные слоты (2, 4, 5, 6) останутся без карточек
  ];

  return (
    <div className="px-6">
      <div className="flex flex-col gap-4">
        {timeSlots.map((time, index) => {
          // Проверяем, есть ли карточка для этого времени
          const lesson = lessons.find((lesson) => lesson.numberLesson === time.id);
          
          return (
            <div key={`slot-${index}`} className="flex flex-col gap-2">
              {/* Время (всегда отображается) */}
              <div className="badge badge-lg badge-success self-start">
                {time.duration}
              </div>

              {/* Карточка (только если есть данные) */}
              {lesson && (
                <LessonCard
                  placeholder={lesson.placeholder}
                  classroom={lesson.classroom}
                  teacher={lesson.teacher}
                  lessonType={lesson.lessonType}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}