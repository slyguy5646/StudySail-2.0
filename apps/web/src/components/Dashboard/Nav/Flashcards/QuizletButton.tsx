"use client";

import Image from "next/image";
import { Flashcard } from "@prisma/client";
import { useState, useEffect } from "react";

export default function QuizletButton({ cards }: { cards: Flashcard[] }) {
  const [formatted, setFormatted] = useState<string | null>(null);

  useEffect(() => {
    setFormatted(cards.map((card) => `${card.term}    ${card.definition}`).join("\n"));
  }, [cards]);

  return (
    <div
      onClick={() => {
        if (formatted) navigator.clipboard.writeText(formatted);
      }}
    >
      <Image
        src={"https://assets.quizlet.com/a/j/dist/app/i/brandmark/1024.0e9431247202b7b.png"}
        width={40}
        height={40}
        className="hover:cursor-pointer rounded-md select-none"
        alt="quizlet"
      />
    </div>
  );
}
