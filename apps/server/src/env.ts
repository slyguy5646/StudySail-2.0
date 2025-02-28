import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "",
  server: {
    CLERK_SECRET_KEY: z.string(),
  },
  client: {},

  runtimeEnv: process.env,
});
