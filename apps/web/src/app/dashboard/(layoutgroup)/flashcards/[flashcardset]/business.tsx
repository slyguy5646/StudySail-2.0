"use client";

import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { PartialParse } from "@/utils/partial-parse";
import { PlainLoadingSpinnerWhite } from "@/components/LoadingSpinner";
import { useDash } from "@/components/Dashboard/Nav/DashboardRouterContext";
import { IconArrowLeft } from "@tabler/icons-react";
import FlashOverviewCard from "@/components/Dashboard/Flashcards/FlashOverviewCard";
import { CreateFlashcardRequest } from "@/types/schemas";
import DashboardLink from "@/components/dashboardLink";

export default function Chat({ content, set_id }: { content: string; set_id: number }) {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const [parsedResponse, setParsedResponse] = useState<{ term: string; definition: string }[]>([]);
  const { router, currentRoute } = useDash();

  useEffect(() => {
    const parser = new PartialParse();
    setParsedResponse(
      Object.values(
        parser.partialParse(Object.values(messages.filter((m) => m.role == "assistant").slice(-1))[0]?.content ?? "{}")
      )[0] as any[]
    );
  }, [messages]);

  async function createCards() {
    if (!isLoading && parsedResponse.length > 0) {
      console.log("CREATED CARDS");
      const data: CreateFlashcardRequest = {
        cards: [...parsedResponse.map((card) => ({ set_id, term: card.term, definition: card.definition }))],
      };
      await fetch("/api/create-flashcard", { method: "POST", body: JSON.stringify(data) });
      router.refresh();
    }
  }

  useEffect(() => {
    createCards();
  }, [isLoading]);

  return (
    <div className="">
      <DashboardLink>
        <IconArrowLeft className="text-slate-400 w-6 h-6 hover:text-slate-500 cursor-pointer " />
      </DashboardLink>
      <div className="flex justify-between items-center pb-4">
        <div className="text-5xl font-bold text-black capitalize my-4">Flashcards</div>
        <form onSubmit={(e) => handleSubmit(e, { options: { body: { text: content } } })}>
          <button
            onClick={() => handleInputChange({ target: { value: "hello world" } } as any)}
            // type="submit"
            className="w-24 h-10 rounded-md flex justify-center items-center  bg-cyan-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-300 delay-75 ease-in-out hover:bg-black  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {isLoading ? <PlainLoadingSpinnerWhite /> : <div>Generate</div>}
          </button>
        </form>
      </div>
      {/* {isLoading && (
        <div className="flex w-full justify-center">
          <PlainLoadingSpinnerWhite />
        </div>
      )} */}

      <div className="flex flex-col gap-y-4 pb-4">
        {parsedResponse &&
          parsedResponse
            .filter((item) => item.term && item.definition)
            .map((item) => <FlashOverviewCard term={item.term} def={item.definition} />)}
      </div>
    </div>
  );
}
