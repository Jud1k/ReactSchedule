import Spinner from "@/components/generic/Spinner";
import { Group } from "@/types";

interface GroupSearchResultsProps {
  groups: Group[];
  onSelect: (group: Group) => void;
  isLoading: boolean;
  hasSearchTerm: boolean;
}

export function GroupSearchResults({
  groups,
  onSelect,
  isLoading,
  hasSearchTerm,
}: GroupSearchResultsProps) {
  if (!isLoading && !hasSearchTerm) {
    return null;
  }
  return (
    <div className="absolute z-10 mt-1 w-full shadow-lg rounded-lg border bg-base-100 border-gray-200 max-h-48 overflow-y-auto">
      {isLoading ? (
        <Spinner />
      ) : groups.length === 0 ? (
        <div className="p-3 text-center text-gray-500">Группа не найдена</div>
      ) : (
        <ul className="dropdown-content divide-y divide-gray-200">
          {groups.map((group) => (
            <li
              key={group.id}
              className="p-3 hover:bg-base-300 hover:border-accent cursor-pointer"
              onClick={() => onSelect(group)}
            >
              {group.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
