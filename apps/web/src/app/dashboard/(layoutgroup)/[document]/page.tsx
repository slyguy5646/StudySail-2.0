import Chip from "@/components/chip";
import { prisma } from "@/db";
import { redirect } from "next/navigation";
import { parseFileExtension } from "@/utils/GetFileExtension";
import { IconExternalLink } from "@tabler/icons-react";
import ParseReqButton from "./parseButton";

export default async function DocumentPage({
  params,
}: {
  params: { document: string };
}) {
  const doc = await prisma.document.findUnique({
    where: { id: parseInt(params.document) },
  });

  if (!doc) {
    redirect("/dashboard");
  }

  const fileType = parseFileExtension(doc.title);
  let str = doc.title.trim();

  // Split the string into an array of words
  var words = str.split(" ");

  // Ensure that the array has at most three words
  if (words.length > 3) {
    words = words.slice(0, 3); // Take the first three words
  }

  // Join the words back into a string
  var result = words.join(" ");

  console.log(doc.storage_key)
  return (
    <div>
      <div className="text-5xl font-bold text-black capitalize">{result}</div>
      {fileType && (
        <Chip className="m-0 ml-0 text-slate-600 uppercase w-fit px-4 my-4 ">
          <div className="flex justify-between items-center gap-x-2">
            <div className="text-[17px] font-medium">{fileType}</div>
            <a href={doc.storage_url} download={doc.file_name} target="_blank">
              <IconExternalLink className="w-4 h-4 hover:text-slate-500 hover:cursor-pointer" />
              
            </a>

          </div>
        </Chip>
      )}
      <ParseReqButton file_key={doc.storage_key}/>
    </div>
  );
}
