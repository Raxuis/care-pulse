import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    // DATABASE_URL: z.string().url(),
    PROJECT_ID: z.string(),
    API_KEY: z.string(),
    DATABASE_ID: z.string(),
    PATIENT_COLLECTION_ID: z.string(),
    DOCTOR_COLLECTION_ID: z.string(),
    APPOINTMENT_COLLECTION_ID: z.string(),
    BUCKET_ID: z.string(),
    PUBLIC_ENDPOINT: z.string()
  },
  client: {
  },
  // If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
  // For Next.js >= 13.4.4, you only need to destructure client variables:
  experimental__runtimeEnv: {
    //   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
  }
});