import { defineConfig } from "drizzle-kit";
import { resolve } from "path";

export default defineConfig({
  schema: "./database/schema/*",
  out: "./database/migrations",
  driver: "better-sqlite",
  dbCredentials: {
    url: resolve(__dirname, "./database/data.db"),
  },
});
