import z from "zod";

export const parseRequestSchema = z.object({
  file_url: z.string(),
});
