import { apiRoutes } from '@/api/apiRoutes';
import api from '@/api/axiosConfig';
import z from 'zod';
import { CreateTeacherForm } from './create-teacher';
import { UpdateTeacherForm } from './update-teacher';

export const teacherSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
  phone: z.string(),
  department: z.string(),
  title: z.string(),
});

export const teacherArraySchema = z.array(teacherSchema);

export type Teacher = z.infer<typeof teacherSchema>;

export default class TeacherService {
  static async fetchTeachers() {
    try {
      const response = await api.get<Teacher[]>(apiRoutes.teacher.base);
      return teacherArraySchema.parse(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  static async createTeacher(teacher: CreateTeacherForm): Promise<Teacher> {
    const response = await api.post<Teacher>(apiRoutes.teacher.base, teacher);
    return teacherSchema.parse(response.data);
  }

  static async updateTeacher({
    teacherId,
    data,
  }: {
    teacherId: number;
    data: UpdateTeacherForm;
  }): Promise<Teacher> {
    const response = await api.put(apiRoutes.teacher.byId(teacherId), data);
    return response.data;
  }

  static async deleteTeacher(teacherId: number): Promise<void> {
    const response = await api.delete(apiRoutes.teacher.byId(teacherId));
    return response.data;
  }
}
