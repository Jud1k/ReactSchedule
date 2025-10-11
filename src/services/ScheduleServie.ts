import api from "@/api/axiosConfig";
import {
  Group,
  groupArraySchema,
  groupSchema,
  Lesson,
  lessonArraySchema,
  GroupSummary,
  groupSummarySchema,
  groupSummaryArraySchema,
} from "@/schemas";
import { GroupFormData } from "@/schemas/forms/group";

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

  static async createGroup(group: GroupFormData): Promise<Group> {
    const response = await api.post<Group>("/group/", group);
    return groupSchema.parse(response.data);
  }

  static async fetchGroupSummary(): Promise<GroupSummary[]> {
    const response = await api.get<GroupSummary[]>("/group/summary/");
    return groupSummaryArraySchema.parse(response.data);
  }

  static async deleteGroup(groupId: number): Promise<string> {
    const response = await api.delete(`/group/${groupId}`);
    return response.data;
  }

  static async updateGroup(
    groupId: number,
    data: GroupFormData
  ): Promise<void> {
    const response = await api.put(`/group/${groupId}`, data);
    return response.data;
  }
}
