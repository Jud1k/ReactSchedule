import authStore from './auth-store';
import calendarStore from '@/features/lesson/store/calendar-store';
import scheduleStore from '@/features/lesson/store/schedule-store';

export default class RootStore {
  authStore = authStore;
  calendarStore = calendarStore;
  scheduleStore = scheduleStore;
}
