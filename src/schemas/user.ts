import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  email: z.email(),
});

export type IUser = z.infer<typeof userSchema>;
