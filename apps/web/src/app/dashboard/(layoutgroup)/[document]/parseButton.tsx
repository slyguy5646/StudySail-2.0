"use client";
import { useState } from "react";
import { parseBaseRequest } from "@/utils/ParseBaseRequest";
import { useAuth } from "@clerk/nextjs";

export default function ParseReqButton({ file_key }: { file_key: string }) {
  const { getToken, userId } = useAuth();

  const [content, setContext] = useState("");
  return (
    <>
      {userId ? (
        <div>
          <div>{content}</div>
          <button
            onClick={async () => {
              console.log(file_key);
             const res = await parseBaseRequest<{ text: string }>("/parse-pdf", await getToken(), {
                method: "POST",
                body: JSON.stringify({
                  file_key: file_key,
                }),
              }); 

              console.log(res);
              setContext(res?.text ?? "")
            }}
          >
            Click to parse
          </button>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
