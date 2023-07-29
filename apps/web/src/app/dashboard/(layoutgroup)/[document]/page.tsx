import Chip from "@/components/chip";
import { prisma } from "@/db";
import { redirect } from "next/navigation";
import { parseFileExtension } from "@/utils/GetFileExtension";
import { IconArrowRight, IconExternalLink, IconCarouselHorizontal, IconEye } from "@tabler/icons-react";
import { shortenFileTitle } from "@/utils/ShortenFileTitle";
import FlashcardSummaryCard from "@/components/Dashboard/Flashcards/FlashcardSummaryCard";
import DeleteDocButtonAndAlert from "@/components/Dashboard/Documents/DeleteDocButtonAndAlert";
import { ScrollArea } from "@/components/ui/scroll-area";
import FlashOverviewCard from "@/components/Dashboard/Flashcards/FlashOverviewCard";
import DashboardLink from "@/components/dashboardLink";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  const flashcards = await prisma.flashcard.findMany({ where: { flashcard_set_id: doc.flashcard_set_id } });
  return (
    <div>
      <div className="text-5xl font-bold text-black capitalize">{name}</div>

      <div className="flex justify-between items-center">
        <div>
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
        </div>
        <DeleteDocButtonAndAlert docId={doc.id} docTitle={name} />
      </div>
      {flashcards.length <= 0 && <FlashcardSummaryCard count={flashcards.length} id={doc.flashcard_set_id} />}
      {flashcards.length > 0 && (
        <div>
          <div className="flex gap-x-2  items-center mt-2 mb-4">
            <div className="font-bold text-3xl">Flashcards</div>
            <div className="flex gap-x-2 items-center">
              <DashboardLink insert route="flashcards/study">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center">
                      <IconCarouselHorizontal className="hover:cursor-pointer rounded-md select-none w-[40px] h-[40px]  text-slate-400 border border-slate-200 p-1 " />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>Study</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DashboardLink>
              <DashboardLink insert route="flashcards">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className="flex items-center">
                      <IconEye className="hover:cursor-pointer rounded-md select-none w-[40px] h-[40px]  text-slate-400 border border-slate-200 p-1 " />
                    </TooltipTrigger>
                    <TooltipContent side="top">
                      <p>Go to Flashcards</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </DashboardLink>
            </div>
          </div>
          <ScrollArea className="h-[350px] rounded-md border p-4">
            <div className="flex flex-col gap-y-2">
              {flashcards.map((card) => (
                <FlashOverviewCard term={card.term} def={card.definition} />
              ))}
            </div>
          </ScrollArea>
        </div>
      )}
    </div>
  );
}
