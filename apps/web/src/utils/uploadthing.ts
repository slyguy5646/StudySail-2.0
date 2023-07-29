import { generateComponents } from "@uploadthing/react";
import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

export const { UploadButton, UploadDropzone, Uploader } =
  //@ts-ignore
  generateComponents<OurFileRouter>();
//@ts-ignore
export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>();
