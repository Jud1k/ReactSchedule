import { useEffect, useState } from "react";
import Calendar from "./Calendar";
import { useSearchParams } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import useGroupSearch from "../../hooks/useGroupSearch";
import { GroupSearchInput } from "./GroupSearchInput";
import { GroupSearchResults } from "./GroupSearchResults";

interface Group {
  id: number;
  name: string;
}

interface GroupSelectorProps {
  groups:Group[]
  onSearch:(term:string)=>void
  onSelect:(group:Group)=>void
  onGroupSelect: (groupId: number, groupName: string) => void;
}

export default function GroupSelector({
  onGroupSelect,
}: GroupSelectorProps) {
  const [groupName, setGroupName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [resetCalendar, setResetCalendar] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isOpen,setIsOpen] = useState(false)

  const { groups, isLoading, error } = useGroupSearch(debouncedSearchTerm);

  const handleGroupSelect = (group: Group) => {
    setSearchParams({group:group.id.toString()});
    onGroupSelect(group.id, group.name);
    setGroupName(group.name);
    setResetCalendar((prev) => !prev);
    setIsOpen(true)
  };

  if (error) {
    return (
      <div className="btn m-1 bg-base-100 border border-base-300 shadow-lg rounded-box">
        Ошибка: {error}
      </div>
    );
  }

  return (
    <div>
      {groupName && (
        <span className="badge badge-xl badge-success mb-5">{groupName}</span>
      )}
      <input
            type="search"
            placeholder="Введите название группы"
            className="input input-bordered w-full"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            
          />
      <GroupSearchResults
        groups={groups}
        onSelect={handleGroupSelect}
        isLoading={isLoading}
        hasSearchTerm={!!searchTerm}
      />
    </div>
  );
}
