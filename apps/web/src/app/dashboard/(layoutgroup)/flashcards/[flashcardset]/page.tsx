import { prisma } from "@/db";
import Chat from "./business";
import { redirect } from "next/navigation";
import FlashOverviewCard from "@/components/Dashboard/Flashcards/FlashOverviewCard";
import { IconArrowLeft, IconCarouselHorizontal } from "@tabler/icons-react";
import DashboardLink from "@/components/dashboardLink";
import Image from "next/image";
import QuizletButton from "@/components/Dashboard/Flashcards/QuizletButton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default async function Flashcards({ params }: { params: { flashcardset: string } }) {
  if (!params.flashcardset) redirect("/dashboard")
  const doc = await prisma.document.findUnique({
    where: { flashcard_set_id: parseInt(params.flashcardset) },
    include: { flashcard_set: true },
  });
  // const set = await prisma.flashcardSet.findUnique({ where: { id: parseInt(params.flashcardset) } });

  if (!doc || !doc.flashcard_set) redirect(`/dashboard/${params.flashcardset}`);

  const cards = await prisma.flashcard.findMany({ where: { flashcard_set_id: doc.flashcard_set.id } });

  return (
    <div className="">
      {cards.length <= 0 && <Chat content={doc.content} set_id={doc.flashcard_set_id} />}
      {cards.length > 0 && (
        <div>
          <DashboardLink>
            <IconArrowLeft className="text-slate-400 w-6 h-6 hover:text-slate-500 cursor-pointer " />
          </DashboardLink>
          <div className="flex justify-between items-center pb-4">
            <div className="text-5xl font-bold text-black capitalize my-4">Flashcards</div>
            <div className="flex gap-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <DashboardLink insert route="study">
                      <IconCarouselHorizontal className="hover:cursor-pointer rounded-md select-none w-[40px] h-[40px] p-1 text-slate-400 border border-slate-200" />
                    </DashboardLink>
                  </TooltipTrigger>
                  <TooltipContent side="left">
                    <p>Study</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <QuizletButton cards={cards} />
            </div>
          </div>
          <div className="flex flex-col gap-y-4 pb-4">
            {cards.map((card) => (
              <FlashOverviewCard term={card.term} def={card.definition} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
