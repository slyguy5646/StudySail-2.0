import "dotenv/config"; // To read CLERK_API_KEY

import express from "express";
import { parsePdfTextFromUrl } from "./utils/ParsePDFTextFromURL";
import {
  ClerkExpressWithAuth,
  LooseAuthProp,
  clerkClient,
  setClerkApiKey,
  ClerkExpressRequireAuth,
  WithAuthProp,
  StrictAuthProp,
} from "@clerk/clerk-sdk-node";

import { parseRequestSchema } from "./schemas";

import type { RequireAuthProp, WebhookEvent } from "@clerk/clerk-sdk-node";

import { createServer } from "./server";

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

export const app = createServer();
const port = 3001;
//ClerkExpressRequireAuth({}),
app.post("/parse-pdf", async (req, res) => {
  const validation = parseRequestSchema.safeParse(req.body);

  if (!validation.success) return res.status(422).json({ error: "Invalid body format" });
  const { file_key } = validation.data;
  console.log(req.body);
  console.log(`https://utfs.io/f/${file_key}`);
  const text = await parsePdfTextFromUrl(`https://utfs.io/f/${file_key}`);
  console.log("TEXT", text);
  res.status(200).json({ text });
});

app.listen(port, async () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
