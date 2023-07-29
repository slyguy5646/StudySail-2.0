import z from "zod";

export const createFlashcardRequestSchema = z.object({
  cards: z
    .object({
      term: z.string(),
      definition: z.string(),
      set_id: z.number(),
    })
    .array(),
});

export type CreateFlashcardRequest = z.infer<typeof createFlashcardRequestSchema>;

export const deleteDocRequestSchema = z.object({
  id: z.number(),
});

export type DeleteDocRequest = z.infer<typeof deleteDocRequestSchema>;

export const afterUploadCompleteRequestSchema = z.object({
  fileKey: z.string(),
});

export type AfterUploadCompleteRequest = z.infer<typeof afterUploadCompleteRequestSchema>;
