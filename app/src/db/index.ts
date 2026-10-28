import path from "path"
import dotenv from "dotenv"
import { drizzle } from "drizzle-orm/neon-http"
import { neon } from "@neondatabase/serverless"

dotenv.config({ path: path.resolve(process.cwd(), ".env") })

const sql = neon(process.env.DATABASE_URL!)

export const db = drizzle(sql)
