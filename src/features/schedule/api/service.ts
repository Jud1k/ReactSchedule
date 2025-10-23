import api from '@/api/axiosConfig';
import z from 'zod';

export const lessonSchema = z.object({
  id: z.number(),
  time_id: z.number(),
  day_week: z.number(),
  type_lesson: z.string(),
  subject: z.string(),
  teacher: z.string(),
  room: z.string(),
});

export type Lesson = z.infer<typeof lessonSchema>;

export const lessonArraySchema = z.array(lessonSchema);

export default class ScheduleService {
  static async fetchLessonsByGroupId(groupId: number): Promise<Lesson[]> {
    const response = await api.get<Lesson[]>(`/schedule/lessons/${groupId}`);
    return lessonArraySchema.parse(response.data);
  }
}
