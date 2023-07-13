import { getDocument } from "pdfjs-dist";

import {
  DocumentInitParameters,
  PDFDataRangeTransport,
  TypedArray,
} from "pdfjs-dist/types/src/display/api"


export async function parsePdfTextFromUrl(
  src: string | TypedArray | DocumentInitParameters | PDFDataRangeTransport
): Promise<string> {
  const pdf = await getDocument(src).promise;

  const pageList = await Promise.all(
    Array.from({ length: pdf.numPages }, (_, i) => pdf.getPage(i + 1))
  );

  const textList = await Promise.all(pageList.map((p) => p.getTextContent()));

  return (
    textList
      //@ts-ignore
      .map(({ items }) => items.map(({ str }) => str).join(""))
      .join("")
  );
}
