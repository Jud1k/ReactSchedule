import { z } from "zod";

export const groupSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const groupArraySchema = z.array(groupSchema);

export type Group = z.infer<typeof groupSchema>;

export const groupSummarySchema = z.object({
  id: z.number(),
  name: z.string(),
  course: z.number(),
  institute: z.string(),
  count_students: z.number(),
});

export const groupSummaryArraySchema = z.array(groupSummarySchema);

export type GroupSummary = z.infer<typeof groupSummarySchema>;

export const audienceSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type Audience = z.infer<typeof audienceSchema>;

export const subjectSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export type Subject = z.infer<typeof subjectSchema>;

export const teacherSchema = z.object({
  id: z.number(),
  name: z.string(),
  date_of_birth: z.date(),
  email: z.email(),
  phone: z.string(),
});

export type Teacher = z.infer<typeof teacherSchema>;

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
