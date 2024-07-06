import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const appwriteEnv = createEnv({
  server: {
    // DATABASE_URL: z.string().url(),
    PROJECT_ID: z.string(),
    API_KEY: z.string(),
    DATABASE_ID: z.string(),
    PATIENT_COLLECTION_ID: z.string(),
    DOCTOR_COLLECTION_ID: z.string(),
    APPOINTMENT_COLLECTION_ID: z.string(),
    NEXT_PUBLIC_BUCKET_ID: z.string()
  },
  runtimeEnv: process.env,
});