import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const serverEnv = createEnv({
  server: {
    NEXT_PUBLIC_ENDPOINT: z.string()
  },
  runtimeEnv: process.env,
});