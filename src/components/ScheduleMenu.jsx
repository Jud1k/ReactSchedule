import "cally";
import { useEffect } from "react";
import { useState } from "react";

export default function ScheduleMenu({ onGroupSelect }) {
  const [groups, setGroups] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setErorr] = useState(null);

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
      <calendar-date class="cally bg-base-100 border border-base-300 shadow-lg rounded-box">
        <svg
          aria-label="Previous"
          className="fill-current size-4"
          slot="previous"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="M15.75 19.5 8.25 12l7.5-7.5"></path>
        </svg>
        <svg
          aria-label="Next"
          className="fill-current size-4"
          slot="next"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path fill="currentColor" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
        </svg>
        <calendar-month></calendar-month>
      </calendar-date>
    </div>
  );
}
