import api from "@/api/axiosConfig";
import { Group, groupArraySchema, Lesson, lessonArraySchema } from "@/schemas";

  export default class ScheduleService {
    static async searchGroups(searchParams: string): Promise<Group[]> {
      const response = await api.get<Group[]>("/group/search", {
        params: { query: searchParams },
      });
      return groupArraySchema.parse(response.data);
    }

  static async fetchLessonsByGroupId(groupId: number): Promise<Lesson[]> {
    const response = await api.get<Lesson[]>(`/schedule/lessons/${groupId}`);
    return lessonArraySchema.parse(response.data);
  }
}
