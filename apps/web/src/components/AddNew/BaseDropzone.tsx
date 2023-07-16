"use client";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";

import { UploadDropzone } from "@/utils/uploadthing";
import { useDash } from "../Dashboard/Nav/DashboardRouterContext";
import UploadError from "./UploadErrorAlert";
import { useState } from "react";

export default async function BaseDropzone() {
  const { router } = useDash();
  const [open, setOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>("Error happened")
  return (
    <main className="">
      {/* <UploadError errorMessage={errorMessage} open={open} setOpen={setOpen}/> */}
      <UploadDropzone
        endpoint="freeUploader"
        onClientUploadComplete={(res) => {
          // console.log("Files: ", res);
          router.push("/dashboard")
        }}
        onUploadError={(error: Error) => {
          // setErrorMessage(error.message);
          // setOpen(true);
          alert(error.message)
        }}
      />
    </main>
  );
}
