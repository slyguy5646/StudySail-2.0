"use client";

// import { useChat } from "ai/react";
// import { useState } from "react";

// export default function Chat() {
//   const { messages, input, handleInputChange, handleSubmit } = useChat();
//   const [info, setInfo] = useState<string>("");

//   return (
//     <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
//       {messages.map((m) => (
//         <div key={m.id}>
//           {m.role === "user" ? "User: " : "AI: "}
//           {m.content}
//         </div>
//       ))}

//       <form onSubmit={async () => {
//         console.log(info);
//         await fetch("/api/chat", {method: "POST", body: JSON.stringify({text: info})})
//       }}>
//         <label>
//           Say something...
//           <input
//             className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
//             value={info}
//             onChange={(e) => setInfo(e.target.value)}

//           />
//         </label>
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// }

const text = `
        la canción song
        la banda
        la música clásica classical music
        la música popular popular music
        la música rock rock music
    `;

import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { PartialParse } from "@/utils/partial-parse";
import { PlainLoadingSpinner } from "@/components/LoadingSpinner";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat();
  const [parsedResponse, setParsedResponse] = useState<
    { term: string; definition: string }[]
  >([]);

  useEffect(() => {
    const parser = new PartialParse();
    setParsedResponse(
      Object.values(
        parser.partialParse(
          Object.values(
            messages.filter((m) => m.role == "assistant").slice(-1)
          )[0]?.content ?? "{}"
        )
      )[0] as any[]
    );
  }, [messages]);

  return (
    <div className="p-12">
      {isLoading && (
        <div className="flex w-full justify-center">
          <PlainLoadingSpinner />
        </div>
      )}

      {parsedResponse &&
        parsedResponse
          .filter((item) => item.term && item.definition)
          .map((item) => (
            <div className="border-2 border-slate-200 rounded-md">
              <div>{item.term}</div>
              <div>{item.definition}</div>
            </div>
          ))}
      <form onSubmit={(e) => handleSubmit(e, { options: { body: { text } } })}>
        <label>
          Say something...
          <input
            className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
            value={input}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
