import Chip from "@/components/chip";
import { prisma } from "@/db";
import { redirect } from "next/navigation";
import { parseFileExtension } from "@/utils/GetFileExtension";
import { IconExternalLink } from "@tabler/icons-react";
import ParseReqButton from "./parseButton";
import { shortenFileTitle } from "@/utils/ShortenFileTitle";

export default async function DocumentPage({ params }: { params: { document: string } }) {
  const doc = await prisma.document.findUnique({
    where: { id: parseInt(params.document) },
    include: { flashcard_set: true },
  });

  if (!doc) {
    redirect("/dashboard");
  }

  const fileType = parseFileExtension(doc.title);
  const name = shortenFileTitle(doc.title);
  console.log(doc.storage_key);
  const flashcards = await prisma.flashcard.findMany({ where: { flashcard_set_id: doc.flashcard_set_id } });
  return (
    <div>
      <div className="text-5xl font-bold text-black capitalize">{name}</div>
      <div className="text-5xl font-bold text-black capitalize">{JSON.stringify(doc.flashcard_set)}</div>
      {fileType && (
        <Chip className="m-0 ml-0 text-slate-600 uppercase w-fit px-4 my-4 ">
          <div className="flex justify-between items-center gap-x-2">
            <div className="text-[17px] font-medium">{fileType}</div>
            <a href={doc.storage_url} download={doc.file_name} target="_blank">
              <IconExternalLink className="w-4 h-4 hover:text-slate-500 hover:cursor-pointer" />
            </a>
          </div>
        </Chip>
      )}
      {flashcards.length > 0 && <div>FLASHCARD COMPONENT HERE</div>}
      <ParseReqButton file_key={doc.storage_key} />
    </div>
  );
}
