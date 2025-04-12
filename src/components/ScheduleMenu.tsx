import { useEffect, useState } from "react";
import { Calendar } from "./Calendar";
import { useNavigate } from "react-router-dom";

interface Group {
  id: number;
  name: string;
}

interface ScheduleMenuProps {
  currentGroup?: string;
  onDaySelect: (dayWeek: number) => void;
}

export default function ScheduleMenu({
  currentGroup,
  onDaySelect,
}: ScheduleMenuProps) {
  const [groups, setGroups] = useState<Group[]>([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setErorr] = useState<string | null>(null);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await fetch("http://localhost:8000/group/");
        if (!response.ok) {
          throw new Error("Erorr loading data");
        }
        const data = await response.json();
        setGroups(data);
      } catch (err) {
        setErorr(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchGroups();
  }, []);

  const handleGroupSelect = (groupId: number) => {
    navigate(`/schedule/${groupId}`);
  };

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
    <div className="gap-4">
      <div className="dropdown dropdown-start ">
        <div
          tabIndex={0}
          role="button"
          className="btn m-1 bg-base-100 border border-base-300 shadow-lg rounded-box"
        >
          Выберите группу⬇️
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
        >
          {groups.map((group) => (
            <li key={group.id}>
              <a onClick={()=>handleGroupSelect(group.id)}>{group.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <Calendar onDaySelect={onDaySelect} />
    </div>
  );
}
