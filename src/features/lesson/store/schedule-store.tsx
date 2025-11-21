import LessonService, { LessonByQuery } from '@/features/lesson/api/service';
import { makeAutoObservable, runInAction } from 'mobx';
import { ScheduleType } from '../types/consts';

class ScheduleStore {
  lessons: LessonByQuery[] = [];
  currentEntity: { type: ScheduleType; id: string } | null = null;
  isLoading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  clearLessons() {
    this.lessons = [];
    this.currentEntity = null;
  }

  setIsLoading(isLoading: boolean) {
    this.isLoading = isLoading;
  }

  setError(error: string) {
    this.error = error;
  }

  async fetchLessons(paramKey: ScheduleType, id: string) {
    this.isLoading = true;
    this.currentEntity = { type: paramKey, id };

    try {
      let results: LessonByQuery[];

      if (paramKey === ScheduleType.GROUP) {
        results = await LessonService.fetchLessonsByQuery({ group: id });
      } else if (paramKey === ScheduleType.TEACHER) {
        results = await LessonService.fetchLessonsByQuery({ teacher: id });
      } else if (paramKey === ScheduleType.ROOM) {
        results = await LessonService.fetchLessonsByQuery({ room: id });
      } else {
        results = [];
      }

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
    return this.lessons.filter((lesson) => lesson.day_of_week === dayWeek);
  }
}

export default new ScheduleStore();
