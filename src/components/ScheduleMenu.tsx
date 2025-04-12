import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { useNavigate, useSearchParams } from "react-router-dom";
import Search from "./Search";
import useDebounce from "./useDebounce";

interface Group {
  id: number;
  name: string;
}

interface ScheduleMenuProps {
  onDaySelect: (dayWeek: number) => void;
}

export default function ScheduleMenu({
  onDaySelect,
}: ScheduleMenuProps) {
  const [groups, setGroups] = useState<Group[]>([]);
  const [groupName,setGroupName] = useState("")
  const [searchTerm, setSearchTerm] = useState("");
  const [resetCalendar,setResetCalendar] = useState(false)
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (term: string) => {
    if (!term) {
      setGroups([]);
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:8000/group/search?query=${term}`
      );
      const data = await response.json();
      setGroups(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  const handleGroupSelect = (groupId: number,groupName:string) => {
    setSearchParams({group:groupId.toString()})
    setGroupName(groupName)
    setResetCalendar(prev=>!prev)
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
    <div>{groupName && 
      <span className="badge badge-xl badge-success mb-5">{groupName}</span>}
      <Search groups={groups} onSearch={setSearchTerm} onSelect={handleGroupSelect} />
      <Calendar onDaySelect={onDaySelect} resetTrigger={resetCalendar}/>
    </div>
  );
}
