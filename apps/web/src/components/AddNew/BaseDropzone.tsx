"use client";

// // You need to import our styles for the button to look right. Best to import in the root /layout.tsx but this is fine

import { useDash } from "../Dashboard/Nav/DashboardRouterContext";
import UploadError from "./UploadErrorAlert";
import { CustomUploadthingError } from "@/types/types";

import { useDropzone } from "react-dropzone";
import type { FileWithPath } from "react-dropzone";

import { useUploadThing } from "@/utils/uploadthing";
import { useState, useCallback } from "react";
import { IconCloudUpload } from "@tabler/icons-react";
import { shortenFileTitle } from "@/utils/ShortenFileTitle";
import { PlainLoadingSpinnerWhite } from "../LoadingSpinner";
import { AfterUploadCompleteRequest } from "@/types/schemas";

export function MultiUploader() {
  const { router } = useDash();
  const [open, setOpen] = useState<boolean>(false);
  const [errorTitle, setErrorTitle] = useState<string | null>("Error happened");
  const [errorDescription, setErrorDescription] = useState<string | null>("Error happened");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    // accept: files
  });

  const { startUpload, isUploading } = useUploadThing("freeUploader", {
    onClientUploadComplete: async (e) => {
      setLoading(true);
      if (!e) return;
      const { fileKey } = e[0] as { fileKey: string; fileUrl: string };
      console.log("NEW UPLOAD", e);

      const body: AfterUploadCompleteRequest = {
        fileKey,
      };

      async function getRedirectPath() {
        const res = await fetch("/api/after-creation", { method: "POST", body: JSON.stringify(body) });

        if (res.ok) {
          const { url } = await res.json();

          console.log("NEW FILE URL", url);

          setTimeout(() => {
            setLoading(false);
            window.location.pathname = "/dashboard";
          }, 2000);
        }
      }
      setTimeout(() => {
        getRedirectPath();
      }, 1000);
      // window.location.pathname = "/dashboard";
    },
    onUploadError: (error) => {
      const customErrorMessage = error.data?.zodError?.formErrors[0];

      if (customErrorMessage) {
        const json = JSON.parse(customErrorMessage) as CustomUploadthingError;
        setErrorTitle(json.title);
        setErrorDescription(json.description);
        setOpen(true);
      }
    },
  });

  return (
    <div>
      <UploadError title={errorTitle} description={errorDescription} open={open} setOpen={setOpen} />
      <div
        {...getRootProps()}
        onClick={
          files.length <= 0
            ? getRootProps().onClick
            : (e) => {
                if (files.length > 0) {
                  e.preventDefault();
                  e.stopPropagation();
                }
              }
        }
        className={`${
          files.length <= 0 ? "hover:cursor-pointer" : ""
        } w-full border-2 border-slate-300 border-dashed rounded-md p-16 text-center ${
          isDragActive ? "bg-cyan-100 bg-opacity-30" : ""
        }`}
      >
        <input {...getInputProps()} disabled={files.length > 0} />
        {files.length <= 0 && (
          <div className="flex flex-col gap-y-2 items-center">
            <IconCloudUpload className="w-16 h-16 text-slate-400" />
            <div className="font-semibold text-cyan-500 text-xl">Drop files here!</div>
          </div>
        )}
        <div>
          {files.length > 0 && (
            <div className="flex flex-col gap-y-6 items-center">
              <div className="font-semibold text-2xl">{shortenFileTitle(files[0].name)}</div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  startUpload(files);
                }}
                className="w-24 h-10 rounded-md flex justify-center items-center  bg-cyan-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm transition duration-300 delay-75 ease-in-out hover:bg-black  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {isUploading || loading ? <PlainLoadingSpinnerWhite /> : <div>Upload</div>}
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={async () => {
          const res = await fetch("/api/after-creation", {
            method: "POST",
            body: JSON.stringify({}),
          });

          console.log("BUTTON REPSONSE", await res.json());
        }}
        className="bg-cyan-500 rounded-md text-white px-4 py-2 font-semibold"
      >
        Hello
      </button>
    </div>
  );
}
