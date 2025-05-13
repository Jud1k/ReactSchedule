import { useState } from "react";
import useSearch from "../hooks/useSearch";
import { Group } from "@/types";
import Combobox from "@/components/generic/Combobox";

interface SearchProps {
  onSelect: (group: Group) => void;
}

export default function GroupSelector({ onSelect }: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: groups = [],isLoading } = useSearch(
    "/group/search",
    searchTerm
  );

  const fetchGroups = async (searchTerm: string) => {
    setSearchTerm(searchTerm); // Пробрасываем поисковый термин в хук
    return groups; // Теперь groups всегда будет массивом (даже если undefined - используем fallback)
  };

  return (
    <Combobox<Group>
      onSelect={onSelect}
      placeholder="Введите название группы"
      fetchItems={fetchGroups}
      itemKey={(group) => group.id}
      itemLabel={(group)=>group.name}
      isLoading={isLoading}
    />
  );
}
