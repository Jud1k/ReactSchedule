import { useState } from "react";
import useGroupSearch from "../hooks/useGroupSearch";
import { Group } from "@/types";
import useDebounce from "../hooks/useDebounce";
import Combobox from "@/components/generic/Combobox";

interface SearchProps {
  onSelect: (group: Group) => void;
}

export default function GroupSelector({ onSelect }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: groups = [], isLoading } = useGroupSearch(
    "/group/search",
    searchTerm
  );

  const fetchItems = async (searchTerm: string) => {
    setSearchTerm(searchTerm); // Пробрасываем поисковый термин в хук
    return groups; // Теперь groups всегда будет массивом (даже если undefined - используем fallback)
  };

  return (
    <Combobox<Group>
      onSelect={onSelect}
      placeholder="Введите название группы"
      fetchItems={fetchItems}
      itemKey={(group) => group.id}
      itemLabel={(group)=>group.name}
      isLoading={isLoading}
    />
  );
}
