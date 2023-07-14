import z from "zod";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/db";
import { Flashcard } from "@prisma/client";

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

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  const validation = createFlashcardRequestSchema.safeParse(await req.json());

  if (!validation.success) return NextResponse.json({ error: "Invalid Request Body" }, { status: 422 });

  const { cards } = validation.data;
  const data = cards.map((card) => {
    return { flashcard_set_id: card.set_id, term: card.term, definition: card.definition };
  });
  await prisma.flashcard.createMany({
    data: [...data],
    skipDuplicates: true
  });

  console.log("BOOM CREATED")

  return new NextResponse()
}
