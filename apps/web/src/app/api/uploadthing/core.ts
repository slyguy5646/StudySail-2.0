import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getAuth } from "@clerk/nextjs/server";
import { UploadedFile } from "@/types/types";
import { prisma } from "@/db";
import { utapi } from "uploadthing/server";
import { parseBaseRequest } from "@/utils/ParseBaseRequest";
import { NextResponse } from "next/server";
import z from "zod";

const f = createUploadthing({
  errorFormatter: (err) => {
    return {
      message: err.message,
      zodError: err.cause instanceof z.ZodError ? err.cause.flatten() : null,
    };
  },
});

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  freeUploader: f({ pdf: { maxFileSize: "128MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      //@ts-ignore
      const auth = getAuth(req);
      const token = await auth.getToken();
      // If you throw, the user will not be able to upload
      if (!auth.userId || !token) throw new Error("Unauthorized");

      const previousDocs = await prisma.document.count({ where: { user_id: auth.userId } });
      console.log("DOC COUNT", previousDocs);

      if (previousDocs >= 3) {
        throw new z.ZodError([
          {
            code: z.ZodIssueCode.custom,
            message: JSON.stringify({
              title: "Document Limit Reached",
              description:
                "You've reached your free 3 document limit. Please delete a previous document or upgrade to the paid plan.",
            }),
            fatal: true,
            path: [],
          },
        ]);
      }

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { auth, token };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.auth.userId);

      console.log("file url", file.url);
      createNewDocument(metadata.auth.userId, file, metadata.token);
    }),
  // premiumUploader: f({ image: { maxFileSize: "128MB" } })
  //   // Set permissions and file types for this FileRoute
  //   .middleware(async ({ req }) => {
  //     // This code runs on your server before upload
  //     const auth = getAuth(req);

  //     // VERIFY USER IS IN FACT A PAID USER HERE --------

  //     //TEMP

  //     throw new Error("NO LOGIC FOR PERMIUM YET");

  //     // If you throw, the user will not be able to upload
  //     if (!auth.user) throw new Error("Unauthorized");

  //     if (auth.userId && auth.user && auth.userId) {
  //       // Whatever is returned here is accessible in onUploadComplete as `metadata`
  //       return { auth };
  //     }

  //     throw new Error("NO User obj");
  //   })
  //   .onUploadComplete(async ({ metadata, file }) => {
  //     // This code RUNS ON YOUR SERVER after upload
  //     console.log("Upload complete for userId:", metadata.auth.userId);

  //     console.log("file url", file.url);
  //   }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;

async function createNewDocument(userid: string, file: UploadedFile, token: string) {
  const content = await parseBaseRequest<{ text: string }>("/parse-pdf", token, {
    method: "POST",
    body: JSON.stringify({
      file_key: file.key,
    }),
  });

  if (!content?.text) return;

  const doc = await prisma.document.create({
    data: {
      title: file.name,
      storage_url: file.url,
      storage_key: file.key,
      file_name: file.name,
      file_size: file.size,
      user_id: userid,
      flashcard_set: {
        create: {},
      },
      content: content.text,
    },
  });
}
