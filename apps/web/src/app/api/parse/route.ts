import { parseRequestSchema } from "@/types/schemas";
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
// import { parsePdfTextFromUrl } from "@/utils/ParsePDFTextFromURL";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
GlobalWorkerOptions.workerSrc = "../../../../worker.js"





export async function POST(req: Request) {
  const validation = parseRequestSchema.safeParse(await req.json());

  if (!validation.success)
    return NextResponse.json(
      { error: "Invalid Body" },
      { status: 429, statusText: "Invalid Body" }
    );

  const { file_url } = validation.data;
  console.log(file_url);
  const pdf = await getDocument(file_url).promise;

  const pageList = await Promise.all(
    Array.from({ length: pdf.numPages }, (_, i) => pdf.getPage(i + 1))
  );

  const textList = await Promise.all(pageList.map((p) => p.getTextContent()));

  console.log(
    textList
      //@ts-ignore
      .map(({ items }) => items.map(({ str }) => str).join(""))
      .join("")
  );

  //   const pages = await readPdfText(file_url);
  return new NextResponse();
  //   return NextResponse.json({ data: pages[0]?.lines });
}
