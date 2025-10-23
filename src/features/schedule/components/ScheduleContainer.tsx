import LessonCard from './LessonCard';
import LessonGrid from './LessonGrid';
import { TimeSlot } from '@/types';
import { observer } from 'mobx-react-lite';
import { useStores } from '@/app/root-store-context';
import { useEffect } from 'react';
import CenterText from '@/components/generic/CenterText';

const ScheduleContainer = observer(() => {
  const { scheduleStore, calendarStore, groupStore } = useStores();

  const timeSlots: TimeSlot[] = [
    { id: 1, duration: '9:00-10:35' },
    { id: 2, duration: '10:45-12:20' },
    { id: 3, duration: '13:20-14:55' },
    { id: 4, duration: '15:10-16:45' },
    { id: 5, duration: '16:55-18:30' },
    { id: 6, duration: '18:40-20:15' },
  ];
  useEffect(() => {
    const groupId = groupStore.selectedGroup?.id;
    if (groupId) {
      scheduleStore.fetchLessons(groupId);
    }
  }, [groupStore.selectedGroup]);

  const filtredLessons = scheduleStore.getFiltredLessons(
    calendarStore.selectedDayWeek,
  );
  return scheduleStore.lessons.length > 0 ? (
    <LessonGrid
      lessons={filtredLessons}
      timeSlots={timeSlots}
      renderCard={(lesson) => <LessonCard lesson={lesson} />}
    />
  ) : (
    <CenterText message="Выберите группу" />
  );
});

export default ScheduleContainer;
