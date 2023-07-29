import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/db";
import { afterUploadCompleteRequestSchema } from "@/types/schemas";

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized!" }, { status: 401 });

  const validation = afterUploadCompleteRequestSchema.safeParse(await req.json());

  let latestDocId: number | string = "";

  const userDocs = await prisma.document.findMany({ where: { user_id: userId }, orderBy: { created_at: "desc" } });

  if (userDocs.length > 0) latestDocId = userDocs[0].id;

  console.log(
    "USER DOCS",
    userDocs.map((doc) => [doc.id, doc.title])
  );
  //   if (!validation.success) {
  //   } else if (validation.success) {
  //     const { fileKey } = validation.data;

  //     const latestDoc = await prisma.document.findFirst({ where: { storage_key: fileKey, user_id: userId } });
  //     if (latestDoc?.id) latestDocId = latestDoc?.id;
  //   }

  return NextResponse.json({ url: `/dashboard/${latestDocId}` });
}
