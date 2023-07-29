"use client";

import Image from "next/image";
import { Flashcard } from "@prisma/client";
import { useState, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/components/ui/use-toast";
import quizlet from "../../../../public/quizlet.png";

export default function QuizletButton({ cards }: { cards: Flashcard[] }) {
  const [formatted, setFormatted] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setFormatted(cards.map((card) => `${card.term}    ${card.definition}`).join("\n"));
  }, [cards]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            onClick={() => {
              if (formatted) {
                navigator.clipboard.writeText(formatted);
                toast({
                  title: "Copied Quizlet Format!",
                  description:
                    "You just copied a quizlet compatible format from these flashcards. Read the docs for more info.",
                });
              }
            }}
          >
            <Image
              src={quizlet}
              width={40}
              height={40}
              className="hover:cursor-pointer rounded-md select-none"
              alt="quizlet"
            />
          </div>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Copy for Quizlet</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
