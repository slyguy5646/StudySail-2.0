"use client";

import ReactCardFlip from "react-card-flip";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface StudyFlashcardProps {
  term: string;
  definition: string;
  flipped: boolean;
  setFlipped: Dispatch<SetStateAction<boolean>>;
  flipSpeed: number
}

export default function StudyFlashcard({ term, definition, flipped, setFlipped, flipSpeed }: StudyFlashcardProps) {
  return (
    // <>
    <ReactCardFlip isFlipped={flipped} flipSpeedBackToFront={flipSpeed} flipSpeedFrontToBack={flipSpeed}>
       <StudyFlashcardCard term content={term} flipped={flipped} setFlipped={setFlipped} />
       <StudyFlashcardCard content={definition} flipped={flipped} setFlipped={setFlipped} />
    </ReactCardFlip>
    // </>
  );
}

function StudyFlashcardCard({
  flipped,
  setFlipped,
  content,
  term,
}: {
  term?: boolean;
  content: string;
  flipped: boolean;
  setFlipped: Dispatch<SetStateAction<boolean>>;
}) {
  function handleFlip() {
    setFlipped(!flipped);
  }
  return (
    <Card onClick={handleFlip} className="hover:cursor-pointer py-16 text-center select-none">
      <CardHeader>
        <div className="h-[200px] flex flex-col justify-center gap-y-2">
          <div className="font-semibold text-slate-400 text-lg">{term ? "Term" : "Definition"}</div>
          <CardTitle>{content}</CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
}
