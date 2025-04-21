import React, { useState, useRef, useEffect } from "react";
import useGroupSearch from "../../hooks/useGroupSearch";
import { Group } from "@/types";
import useDebounce from "../../hooks/useDebounce";
import Spinner from "@/components/generic/Spinner";

interface SearchProps {
  onSelect: (group: Group) => void;
}

export default function GroupSelector({ onSelect }: SearchProps) {
  const [inputValue, setInputValue] = useState("");
  const [debouncedSearchTerm] = useDebounce(inputValue, 1000);
  const [isListOpen, setIsListOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { groups, isLoading } = useGroupSearch(debouncedSearchTerm);

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
    // if (value && value !== selectedGroup?.name) {
    //   setSelectedGroup(null);
    // }
    setInputValue(value);
    setIsListOpen(true);
  };

  const handleGroupSelect = (group: Group) => {
    onSelect(group);
    setSelectedGroup({ id: group.id, name: group.name });
    setIsListOpen(false);
    setInputValue("");
  };

  const shouldShowList =
    isListOpen && (isLoading || (inputValue && !isLoading));
  const noResults = groups.length === 0 && !isLoading && inputValue;

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
        <div className="absolute z-10 mt-1 w-full shadow-lg rounded-lg border bg-base-100 border-gray-200 max-h-48 overflow-y-auto">
          {isLoading ? (
            <Spinner />
          ) : noResults ? (
            <div className="p-3 text-center text-gray-500">
              Группа не найдена
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {groups.map((group) => (
                <li
                  key={group.id}
                  className="p-3 hover:bg-base-300 hover:border-accent cursor-pointer"
                  onClick={() => handleGroupSelect(group)}
                >
                  {group.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
