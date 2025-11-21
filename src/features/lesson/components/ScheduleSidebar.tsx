import { Button } from '@/components/generic/Button';
import useAppSearchParams from '@/hooks/useAppSearchParams';
import { Calendar } from './Calendar';
import { ScheduleType } from '../types/consts';
import { useStores } from '@/app/root-store-context';
import { SearchLesson } from './SearchLesson';
import GroupService from '@/features/group/api/service';
import TeacherService from '@/features/teacher/api/service';
import RoomService from '@/features/room/api/service';
import { useEffect, useState } from 'react';
import { useEntityInfo } from '../hooks/useEntityInfo';
import { EntityInfo } from './EntityInfo';

export const ScheduleSidebar = () => {
  const { updateParams, getParam } = useAppSearchParams();
  const { scheduleStore } = useStores();
  const [activeType, setActiveType] = useState<ScheduleType>(
    ScheduleType.GROUP,
  );

  const currentGroup = getParam(ScheduleType.GROUP);
  const currentTeacher = getParam(ScheduleType.TEACHER);
  const currentRoom = getParam(ScheduleType.ROOM);
  const entityState = useEntityInfo();

  useEffect(() => {
    if (currentGroup) {
      setActiveType(ScheduleType.GROUP);
    } else if (currentTeacher) {
      setActiveType(ScheduleType.TEACHER);
    } else if (currentRoom) {
      setActiveType(ScheduleType.ROOM);
    }
  }, [currentGroup, currentTeacher, currentRoom]);

  const handleTypeChange = (newType: ScheduleType) => {
    scheduleStore.clearLessons();
    setActiveType(newType);
    updateParams({
      group: null,
      teacher: null,
      room: null,
      month: null,
    });
  };

  const renderSelector = () => {
    return (
      <div>
        <EntityInfo entityState={entityState} />
        {activeType === ScheduleType.GROUP && (
          <SearchLesson
            onSearch={GroupService.searchGroups}
            placeholder="Введите название группы"
            paramKey={ScheduleType.GROUP}
          />
        )}
        {activeType === ScheduleType.TEACHER && (
          <SearchLesson
            onSearch={TeacherService.searchTeachers}
            placeholder="Введите ФИО преподавателя"
            paramKey={ScheduleType.TEACHER}
          />
        )}
        {activeType === ScheduleType.ROOM && (
          <SearchLesson
            onSearch={RoomService.searchRooms}
            placeholder="Введите название аудитории"
            paramKey={ScheduleType.ROOM}
          />
        )}
      </div>
    );
  };

  const getButtonVariant = (buttonType: ScheduleType) => {
    return activeType === buttonType ? 'outline' : 'default';
  };

  return (
    <div className="w-full">
      {renderSelector()}
      <Calendar />
      <div className="flex flex-col gap-3 w-full mt-4">
        <Button
          onClick={() => handleTypeChange(ScheduleType.GROUP)}
          className="w-full"
          variant={getButtonVariant(ScheduleType.GROUP)}
        >
          Расписание занятий студентов
        </Button>
        <Button
          onClick={() => handleTypeChange(ScheduleType.TEACHER)}
          className="w-full"
          variant={getButtonVariant(ScheduleType.TEACHER)}
        >
          Расписание занятий преподавателей
        </Button>
        <Button
          onClick={() => handleTypeChange(ScheduleType.ROOM)}
          className="w-full"
          variant={getButtonVariant(ScheduleType.ROOM)}
        >
          Расписание занятий по аудиториям
        </Button>
      </div>
    </div>
  );
};
