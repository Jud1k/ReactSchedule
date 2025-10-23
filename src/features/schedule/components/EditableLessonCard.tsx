// import InputField from "@/components/generic/InputField";
// import { Lesson, Room, Subject, Teacher } from "@/types/schedule";
// import { useState } from "react";
// import Combobox from "@/components/generic/Combobox";
// interface LessonCardProps {
//   lesson: Lesson;
// }

// export default function EditableLessonCard({
//   lesson = {
//     subject: "Название пары",
//     room: "Аудитория",
//     teacher: "Преподаватель",
//     type_lesson: "Тип занятия",
//   },
// }:
// LessonCardProps) {
//   const [isEditing, setIsEditing] = useState(false);
//   const [editedLesson, setEditedLesson] = useState(lesson);
//   const [searchTerm, setSearchTerm] = useState("");
//   const { data: subjects = [], isLoading } = useSearch(
//     "/subjects/search",
//     searchTerm
//   );
//   function fetchSubjects(searchTerm: string) {
//     setSearchTerm(searchTerm);
//     return subjects;
//   }

//   function fetchTeachers() {}

//   function fetchRooms() {}

//   const handleChange = (field: keyof Lesson, value: string) => {
//     setEditedLesson((prev) => ({ ...prev, [field]: value }));
//   };

//   const handleSubjectSelect = (subject: Subject) => {
//     handleChange("subject", subject.name);
//   };

//   return (
//     <div className="flex gap-4 items-start">
//       <div className="card w-96 bg-base-100 shadow-sm card-lg">
//         <div className="card-body">

//           {isEditing ? (
//             <Combobox<Subject>
//               onSelect={handleSubjectSelect}
//               onChange={(value) => handleChange("subject", value)}
//               isSearch={false}
//               fetchItems={fetchSubjects}
//               itemKey={(subject) => subject.id}
//               itemLabel={(subject) => subject.name}
//               placeholder="Выберите предмет"
//             />
//           ) : (
//             <h2 className="card-title">{lesson.subject}</h2>
//           )}

//           {isEditing ? (
//             <InputField
//               label="Аудитория"
//               value={editedLesson.room}
//               onChange={(e) => handleChange("room", e.target.value)}
//             />
//           ) : (
//             <h1>{lesson.room}</h1>
//           )}

//           {isEditing ? (
//             <InputField
//               label="Преподаватель"
//               value={editedLesson.teacher}
//               onChange={(e) => handleChange("teacher", e.target.value)}
//             />
//           ) : (
//             <p>{lesson.teacher}</p>
//           )}

//           <div className="card-actions justify-end">
//             {isEditing ? (
//               <select
//                 className="select select-bordered select-sm"
//                 value={editedLesson.type_lesson}
//                 onChange={(e) => handleChange("type_lesson", e.target.value)}
//               >
//                 <option value="Лекция">Лекция</option>
//                 <option value="Практика">Практика</option>
//                 <option value="Лабораторная">Лабораторная</option>
//               </select>
//             ) : (
//               <div className="badge badge-success">{lesson.type_lesson}</div>
//             )}
//           </div>
//         </div>
//       </div>

//       <div className="flex flex-col gap-2 mt-2">
//         {isEditing ? (
//           <>
//             <button className="btn btn-sm btn-success">Сохранить</button>
//             <button
//               className="btn btn-sm btn-error"
//               onClick={() => setIsEditing(false)}
//             >
//               Отменить
//             </button>
//           </>
//         ) : (
//           <button
//             className="btn btn-sm btn-primary"
//             onClick={() => setIsEditing(true)}
//           >
//             Редактировать
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }
