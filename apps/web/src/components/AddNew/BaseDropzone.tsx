"use client";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";

import { UploadDropzone } from "@/utils/uploadthing";
import { useDash } from "../Dashboard/Nav/DashboardRouterContext";
import UploadError from "./UploadErrorAlert";
import { useState } from "react";
import { CustomUploadthingError } from "@/types/types";

export default function BaseDropzone() {
  const { router } = useDash();
  const [open, setOpen] = useState<boolean>(false);
  const [errorTitle, setErrorTitle] = useState<string | null>("Error happened");
  const [errorDescription, setErrorDescription] = useState<string | null>("Error happened");
  return (
    <main className="">
      <UploadError title={errorTitle} description={errorDescription} open={open} setOpen={setOpen} />
      <UploadDropzone
        endpoint="freeUploader"
        onClientUploadComplete={(res) => {
          console.log("Files: ", res);
          router.push("/dashboard");
        }}
        onUploadError={(error) => {
        
          
          const customErrorMessage = error.data?.zodError?.formErrors[0];

          if (customErrorMessage) {
            const json = (JSON.parse(customErrorMessage)) as CustomUploadthingError;
            setErrorTitle(json.title);
            setErrorDescription(json.description);
            setOpen(true);
          }
        }}
      />
    </main>
  );
}
