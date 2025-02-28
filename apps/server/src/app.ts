import "dotenv/config"; // To read CLERK_API_KEY


import { parsePdfTextFromUrl } from "./utils/ParsePDFTextFromURL";
import { ClerkExpressWithAuth, LooseAuthProp } from "@clerk/clerk-sdk-node";

import { parseRequestSchema } from "./schemas";

import { createServer } from "./server";

declare global {
  namespace Express {
    interface Request extends LooseAuthProp {}
  }
}

export const app = createServer();
const port = process.env.PORT || 3001;
//ClerkExpressRequireAuth({}),
app.post("/parse-pdf", ClerkExpressWithAuth({}), async (req, res) => {
  if (!req.auth.userId) return res.status(401).json({ error: "Unauthorized!" });
  const validation = parseRequestSchema.safeParse(req.body);

  if (!validation.success) return res.status(422).json({ error: "Invalid body format" });
  const { file_key } = validation.data;
  const text = await parsePdfTextFromUrl(`https://utfs.io/f/${file_key}`);
  res.status(200).json({ text });
});

app.listen(port, async () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
