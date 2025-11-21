import calendarStore from '@/features/lesson/store/calendar-store';
import scheduleStore from '@/features/lesson/store/schedule-store';

export default class RootStore {
  calendarStore = calendarStore;
  scheduleStore = scheduleStore;
}
