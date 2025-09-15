import { useState } from "react";
import { Group } from "@/schemas";
import Combobox from "@/components/generic/Combobox";
import { observer } from "mobx-react-lite";
import { useStores } from "@/root-store-context";
import ScheduleService from "@/services/ScheduleServie";
import Badge from "../generic/Badge";
import useAppSearchParams from "./hooks/useAppSearchParams";

const GroupSelector = observer(() => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { groupStore,calendarStore } = useStores();
  const {updateParams}=useAppSearchParams()
  const handleGroupSelect = (group: Group) => {
    groupStore.setSelectredGroup(group);
    calendarStore.resetToToday()
    updateParams({group:group.id})
  };

  const handleGroupSearch = async (searchTerm: string) => {
    setIsLoading(true);
    try {
      return await ScheduleService.searchGroups(searchTerm);
    } catch (e) {
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {groupStore.selectedGroup && (
        <Badge className="badge-xl mb-5">{groupStore.selectedGroup?.name}</Badge>
      )}
      <Combobox<Group>
        onSelect={handleGroupSelect}
        onSearch={handleGroupSearch}
        placeholder="Введите название группы"
        itemKey={(group) => group.id}
        itemLabel={(group) => group.name}
        isLoading={isLoading}
      />
    </>
  );
});

export default GroupSelector;
