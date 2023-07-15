import z from "zod";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/db";
import { Flashcard } from "@prisma/client";
import { createFlashcardRequestSchema, CreateFlashcardRequest } from "@/types/schemas";


export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  const validation = createFlashcardRequestSchema.safeParse(await req.json());

  if (!validation.success) return NextResponse.json({ error: "Invalid Request Body" }, { status: 422 });

  const { cards } = validation.data;
  const data = cards.map((card) => {
    return { flashcard_set_id: card.set_id, term: card.term, definition: card.definition };
  });
  const doc = await prisma.document.findUnique({ where: { flashcard_set_id: cards[0].set_id } });
  if (!doc) return NextResponse.json({ error: "Invalid Document" }, { status: 400 });

  if (doc.user_id != userId) return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });

  await prisma.flashcard.createMany({
    data: [...data],
    skipDuplicates: true,
  });

  console.log("BOOM CREATED");

  return new NextResponse();
}
