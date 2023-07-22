"use client";

import { useState, useEffect } from "react";
import { Flashcard } from "@prisma/client";
import StudyFlashcard from "./StudyFlashcard";
import { IconArrowRight, IconArrowLeft } from "@tabler/icons-react";

export default function FlashcardFlipper({ cards }: { cards: Flashcard[] }) {
  const minNumCards = 1;
  const maxNumCards = cards.length;

  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState<number>(0);
  const [flipped, setFlipped] = useState<boolean>(false);
  const [flipSpeed, setFlipSpeed] = useState<number>(0.6);

  function increment() {
    setFlipped(false);
    if (currentFlashcardIndex == maxNumCards - 1) {
      //   setCurrentFlashcardIndex(0);
      return;
    }
    setCurrentFlashcardIndex(currentFlashcardIndex + 1);
    // setFlipSpeed(0.6);
  }
  function decrement() {
    setFlipped(false);
    if (currentFlashcardIndex == 0) {
      //   setCurrentFlashcardIndex(maxNumCards - 1);
      return;
    }
    setCurrentFlashcardIndex(currentFlashcardIndex - 1);
    // setFlipSpeed(0.6);
  }

  useEffect(() => {
    setTimeout(() => {
      setFlipSpeed(0.6);
    }, 1);
  }, [currentFlashcardIndex]);

  return (
    <div>
      <StudyFlashcard
        flipSpeed={flipSpeed}
        flipped={flipped}
        setFlipped={setFlipped}
        term={cards[currentFlashcardIndex].term}
        definition={cards[currentFlashcardIndex].definition}
      />
      <div className="flex justify-center items-center gap-x-6 my-4">
        <IconArrowLeft
          onClick={() => {
            setFlipSpeed(0);
            decrement();
          }}
          className="hover:cursor-pointer border border-slate-200 hover:border-2 rounded-full p-1 w-10 h-10 text-slate-400"
        />
        <div className="text-xl text-slate-400 select-none">
          {currentFlashcardIndex + 1} / {maxNumCards}
        </div>
        <IconArrowRight
          onClick={() => {
            setFlipSpeed(0);
            increment();
          }}
          className="hover:cursor-pointer border hover:border-2 border-slate-200 text-slate-400 rounded-full p-1 w-10 h-10"
        />
      </div>
    </div>
  );
}
