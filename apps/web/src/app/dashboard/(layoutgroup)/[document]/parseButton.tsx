"use client";
import { useState } from "react";

export default function ParseReqButton({ url }: { url: string }) {
  const [content, setContext] = useState("");
  return (
    <div>
      <div>{content}</div>
      <button
        onClick={async () => {
          const res = await fetch("/api/parse", {
            method: "POST",
            body: JSON.stringify({ file_url: url }),
          });


        }}
      >Click to parse</button>
    </div>
  );
}
