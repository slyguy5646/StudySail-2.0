"use client";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useDash } from "../DashboardRouterContext";
import { IconArrowRight } from "@tabler/icons-react";

export default function FlashcardSummaryCard({ count, id }: { count: number, id: number }) {
  const { router, currentRoute } = useDash();

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Flashcards</CardTitle>
            <CardDescription>{count > 0 ? "View" : "Generate"} custom flashcards created from this document</CardDescription>
          </div>
          <div>
            {" "}
            <button
              onClick={() => router.push(`/dashboard/flashcards/${id}`)}
              className="rounded-md  bg-cyan-500 px-3 py-2 text-sm font-semibold text-white shadow-sm transition duration-300 delay-75 ease-in-out hover:bg-black  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <IconArrowRight className="text-white w-6 h-6"/>
              {/* Go to Flashcards */}
            </button>
          </div>
        </div>
      </CardHeader>
      {/* <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter> */}
    </Card>
  );
}
