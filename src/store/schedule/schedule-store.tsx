import ScheduleService, { Lesson } from '@/features/schedule/api/service';
import { makeAutoObservable, runInAction } from 'mobx';

class ScheduleStore {
  lessons: Lesson[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setError(error: string) {
    this.error = error;
  }

  async fetchLessons(groupId: number) {
    this.isLoading = true;
    try {
      const results = await ScheduleService.fetchLessonsByGroupId(groupId);
      runInAction(() => {
        this.lessons = results;
      });
    } catch (e: any) {
      this.error = e.response?.data?.detail;
    } finally {
      this.isLoading = false;
    }
  }

  getFiltredLessons(dayWeek: number | null) {
    if (dayWeek === null) return this.lessons;
    return this.lessons.filter((lesson) => lesson.day_week === dayWeek);
  }
}

export default new ScheduleStore();
