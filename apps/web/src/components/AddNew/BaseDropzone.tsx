"use client";

// You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine
import "@uploadthing/react/styles.css";

import { UploadDropzone } from "@/utils/uploadthing";
import { useDash } from "../Dashboard/Nav/DashboardRouterContext";

export default async function BaseDropzone() {
  const { router } = useDash();
  return (
    <main className="">
      <UploadDropzone
        endpoint="freeUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          router.push("/dashboard")
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message} `);
        }}
      />
    </main>
  );
}
