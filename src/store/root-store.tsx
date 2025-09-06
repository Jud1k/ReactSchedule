import authStore from "./auth-store";
import calendarStore from "./schedule/calendar-store";
import groupStore from "./schedule/group-store";
import scheduleStore from "./schedule/schedule-store";

export default class RootStore {
  authStore = authStore;
  calendarStore = calendarStore;
  groupStore = groupStore;
  scheduleStore = scheduleStore;
}
