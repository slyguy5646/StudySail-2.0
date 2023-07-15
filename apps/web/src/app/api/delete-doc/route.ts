import z from "zod";
import { NextResponse } from "next/server";
import { prisma } from "@/db";
import { auth } from "@clerk/nextjs";
import { utapi } from "uploadthing/server";
import { deleteDocRequestSchema } from "@/types/schemas";


export async function POST(req: Request) {
  const { userId } = auth();

  if (!userId) return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });
  const validation = deleteDocRequestSchema.safeParse(await req.json());

  if (!validation.success) return NextResponse.json({ error: "Invalid Body" }, { status: 422 });

  const { id } = validation.data;

  const doc = await prisma.document.findUnique({ where: { id } });

  if (!doc) return NextResponse.json({ error: "Invalid Document Id" }, { status: 400 });
  if (doc.user_id != userId) return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });

  await utapi.deleteFiles(doc.storage_key);
  await prisma.flashcard.deleteMany({ where: { flashcard_set_id: doc.flashcard_set_id } });
  await prisma.flashcardSet.delete({ where: { id: doc.flashcard_set_id } });
  await prisma.document.delete({ where: { id } });


  return new NextResponse();
}
