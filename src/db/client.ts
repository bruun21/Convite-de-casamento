import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

export const queryClient = postgres(connectionString, {
  max: 5,
  prepare: false,
});

export const db = drizzle(queryClient, { schema });
