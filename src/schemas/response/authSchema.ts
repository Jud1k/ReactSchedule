import z from "zod";
import { userSchema } from "../user";

export const authSchema = z.object({
  access_token: z.string(),
  refresh_token: z.string(),
  user: userSchema,
});

export type AuthResponse = z.infer<typeof authSchema>;
