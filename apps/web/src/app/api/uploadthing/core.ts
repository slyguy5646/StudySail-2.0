import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getAuth } from "@clerk/nextjs/server";
import { UploadedFile } from "@/types/types";
import { prisma } from "@/db";

const f = createUploadthing();


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  freeUploader: f({ pdf: { maxFileSize: "128MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const auth = getAuth(req);

      // If you throw, the user will not be able to upload
      if (!auth.userId) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { auth };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.auth.userId);

      console.log("file url", file.url);
      createNewDocument(metadata.auth.userId, file);
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

async function createNewDocument(userid: string, file: UploadedFile) {


  await prisma.document.create({
    data: {
      title: file.name,
      storage_url: file.url,
      storage_key: file.key,
      file_name: file.name,
      file_size: file.size,
      user_id: userid,
      flashcard_set: {
        create: {}
      },
      content: ""
    },
  });
}
