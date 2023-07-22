import StudyFlashcard from "@/components/Dashboard/Study/StudyFlashcard";
import DashboardLink from "@/components/dashboardLink";
import { IconArrowLeft } from "@tabler/icons-react";
import { redirect } from "next/navigation";
import { prisma } from "@/db";
import FlashcardFlipper from "@/components/Dashboard/Study/FlashcardFlipper";

export default async function Study({ params }: { params: { flashcardset: string } }) {
  const flashcardset = parseInt(params.flashcardset);

  const doc = await prisma.document.findUnique({
    where: { flashcard_set_id: flashcardset },
    include: { flashcard_set: true },
  });

  if (!doc) {
    redirect("/dashboard");
  }

  const flashcards = await prisma.flashcard.findMany({ where: { flashcard_set_id: doc.flashcard_set_id } });

  return (
    <div>
      <DashboardLink>
        <IconArrowLeft className="text-slate-400 w-6 h-6 hover:text-slate-500 cursor-pointer " />
      </DashboardLink>
      <div className="flex justify-between items-center pb-4">
        <div className="text-5xl font-bold text-black capitalize my-4">Study</div>
      </div>
      <FlashcardFlipper cards={flashcards}/>
    </div>
  );
}
