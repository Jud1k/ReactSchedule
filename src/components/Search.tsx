import { group } from "console";
import React, { useState, useRef, useEffect } from "react";

interface Group {
  id: number;
  name: string;
}

interface SearchProps {
  groups: Group[];
  onSearch: (term: string) => void;
  onSelect: (groupId: number, groupName: string) => void;
}

export default function ({ groups, onSearch, onSelect }: SearchProps) {
  const [inputValue, setInputValue] = useState("");
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Закрытие списка при клике вне области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsListOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value && value !== selectedGroup?.name) {
      setSelectedGroup(null);
    }
    setInputValue(value);
    onSearch(value);
    setIsListOpen(true);
  };

  const handleGroupSelect = (groupId: number, groupName: string) => {
    onSelect(groupId, groupName);
    setSelectedGroup({ id: groupId, name: groupName });
    setIsListOpen(false);
    setInputValue("");
  };

  const shouldShowList = isListOpen && groups.length > 0 && !selectedGroup;

  return (
    <div className="relative mb-4" ref={dropdownRef}>
      <input
        type="search"
        placeholder="Введите название группы"
        className="input input-bordered w-full"
        value={inputValue}
        onChange={handleInputChange}
        onClick={() => setIsListOpen(true)}
      />
      {shouldShowList && (
        <div className="absolute z-10 mt-1 w-full shadow-lg rounded-lg border bg-primary-content border-gray-200 max-h-48 overflow-y-auto">
          <ul className="divide-y divide-gray-200">
            {groups.map((group) => (
              <li
                key={group.id}
                className="p-3 hover:bg-amber-50 cursor-pointer"
                onClick={() => handleGroupSelect(group.id, group.name)}
              >
                {group.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
