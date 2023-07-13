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

import { parseRequestSchema } from "@study-sail/types";

import type { RequireAuthProp, WebhookEvent } from "@clerk/clerk-sdk-node";
import { createServer } from "./server";

declare global {
  namespace Express {
    interface Request extends StrictAuthProp {}
  }
}

export const app = createServer();
const port = 3000;

app.get("/parse-pdf", ClerkExpressRequireAuth({}), async (req, res) => {
  const validation = parseRequestSchema.safeParse(req.body);

  if (!validation.success)
    return res.status(429).json({ error: "Invalid body format" });
  res.status(200).json({ hello: "message world" });
});

app.listen(port, async () => {
  //   console.log(
  //     "CONSOLE LOG FILE",
  //     await parsePdfTextFromUrl(
  //       "https://utfs.io/f/6fe4a614-d7a9-42ec-9f05-357999d5cdd6_10.04%20Trigonometric%20Functions%20with%20Periodic%20Phenomena.pdf"
  //     )
  //   );
  return console.log(`Express is listening at http://localhost:${port}`);
});
