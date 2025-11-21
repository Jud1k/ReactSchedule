import { LessonCard } from './LessonCard';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/app/root-store-context';
import { ScheduleType, TIME_SLOTS } from '../types/consts';
import Badge from '@/components/generic/Badge';
import useAppSearchParams from '@/hooks/useAppSearchParams';

export const LessonsList = observer(() => {
  const { scheduleStore, calendarStore } = useStores();
  const { getParam } = useAppSearchParams();

  const hasSelectedEntity =
    getParam(ScheduleType.GROUP) ||
    getParam(ScheduleType.TEACHER) ||
    getParam(ScheduleType.ROOM);

  const filtredLessons = scheduleStore.getFiltredLessons(
    calendarStore.selectedDayWeek,
  );
  if (!hasSelectedEntity) {
    return null;
  }

  return (
    <div className="px-6">
      <div className="flex flex-col gap-4">
        {TIME_SLOTS.map((timeSlot) => {
          const lessonForSlot = filtredLessons.find(
            (lesson) => lesson.time_id === timeSlot.id,
          );
          return (
            <div key={timeSlot.id} className="flex flex-col gap-2">
              <Badge size="lg">{timeSlot.duration}</Badge>
              {lessonForSlot && <LessonCard lesson={lessonForSlot} />}
            </div>
          );
        })}
      </div>
    </div>
  );
});
