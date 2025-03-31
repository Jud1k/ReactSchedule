const LessonCard = ({ 
  placeholder = "Название пары", 
  classroom = "Аудитория", 
  teacher = "Преподаватель", 
  lessonType = "Тип занятия" 
}) => {
  return (
    <div className="card w-96 bg-base-100 shadow-sm card-lg">
      <div className="card-body">
        <h2 className="card-title">{placeholder}</h2>
        <h1>{classroom}</h1>
        <p>{teacher}</p>
        <div className="card-actions justify-end">
          <div className="badge badge-success">{lessonType}</div>
        </div>
      </div>
    </div>
  );
};

export default LessonCard;