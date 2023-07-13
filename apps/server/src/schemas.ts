import z from "zod";

export const parseRequestSchema = z.object({
  file_key: z.string()
});

export type ParseRequestSchema = z.infer<typeof parseRequestSchema>

