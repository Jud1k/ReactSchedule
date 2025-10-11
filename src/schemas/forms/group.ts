import z from "zod";

export const groupFormSchema = z.object({
  name: z.string().min(5, "Поле должно содержать минимум 5 символов"),
  course: z.number(),
  institute: z.string().min(3, "Поле должно содержать минимум 5 символов"),
});

export type GroupFormData = z.infer<typeof groupFormSchema>;
