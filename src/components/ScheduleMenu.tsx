import { useEffect,useState } from "react";

interface Group{
  id:number
  name:string
}

interface ScheduleMenuProps{
  onGroupSelect:(groupId:number)=>void
}

export default function ScheduleMenu({ onGroupSelect }:ScheduleMenuProps) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setErorr] = useState<string|null>(null);

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
              <a onClick={() => onGroupSelect(group.id)}>{group.name}</a>
            </li>
          ))}
        </ul>
      </div>     
    </div>
  );
}
