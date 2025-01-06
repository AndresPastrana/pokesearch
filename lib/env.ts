// env.ts (the module that validates environment variables)

import { z } from "zod";

const api_url_fallback = "https://pokeapi.co/api/v2/";

const envSchema = z.object({
  NEXT_PUBLIC_POKE_API_URL: z.string().url().default(api_url_fallback),
});

const envVars = {
  NEXT_PUBLIC_POKE_API_URL:
    process.env.NEXT_PUBLIC_POKE_API_URL || api_url_fallback,
};

const parsedEnv = envSchema.safeParse(envVars);

if (parsedEnv.error) {
  const errorDetails = parsedEnv.error.format();
  throw new Error(
    `Environment variables validation failed: ${JSON.stringify(
      errorDetails,
      null,
      2
    )}`
  );
}

export const env_data = Object.freeze({ ...parsedEnv.data });
