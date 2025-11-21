import { useEffect } from 'react';
import Combobox from '@/components/generic/Combobox';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/app/root-store-context';
import useAppSearchParams from '@/hooks/useAppSearchParams';
import { ScheduleType } from '../types/consts';

interface SearchLessonProps {
  placeholder: string;
  paramKey: ScheduleType;
  onSearch: (searchTerm: string) => Promise<any[]>;
}

export const SearchLesson = observer(
  ({ onSearch, placeholder, paramKey }: SearchLessonProps) => {
    const { scheduleStore, calendarStore } = useStores();
    const { updateParams, getParam } = useAppSearchParams();

    const entityId = getParam(paramKey);

    useEffect(() => {
      if (entityId) {
        scheduleStore.fetchLessons(paramKey, entityId);
      } else {
        calendarStore.resetToToday();
        scheduleStore.clearLessons();
      }
    }, [calendarStore, entityId, paramKey, scheduleStore]);

    const handleSelect = (entity: any) => {
      calendarStore.resetToToday();
      updateParams({
        [paramKey]: entity.id,
        ...(paramKey === ScheduleType.GROUP && { teacher: null, room: null }),
        ...(paramKey === ScheduleType.TEACHER && { group: null, room: null }),
        ...(paramKey === ScheduleType.ROOM && { group: null, teacher: null }),
      });
    };

    return (
      <div className="space-y-4">
        <Combobox
          onSelect={handleSelect}
          onSearch={onSearch}
          placeholder={placeholder}
          itemKey={(entity) => entity.id}
          itemLabel={(entity) => entity.name}
        />
      </div>
    );
  },
);
