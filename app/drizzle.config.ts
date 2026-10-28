import { config as loadEnv } from "dotenv"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "drizzle-kit"

const configDir = dirname(fileURLToPath(import.meta.url))

loadEnv({ path: resolve(configDir, ".env") })

export default defineConfig({
     schema: resolve(configDir, "./src/db/schema.ts"),
     out: resolve(configDir, "./drizzle"),
     dialect: "postgresql",
     dbCredentials: {
          url: process.env.DATABASE_URL!,
     },
})
