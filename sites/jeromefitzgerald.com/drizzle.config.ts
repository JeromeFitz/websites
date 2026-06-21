import type { Config } from "drizzle-kit";
import { envServer } from "next-config/env.server";

export default {
  dbCredentials: {
    url: envServer.POSTGRES_URL!,
  },
  dialect: "postgresql",
  out: "./src/lib/drizzle/init/migrations",
  schema: "./src/lib/drizzle/schemas/index.ts",
} satisfies Config;
