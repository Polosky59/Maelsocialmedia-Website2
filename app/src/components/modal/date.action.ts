"use server"

import { db } from "@/db"
import { meetings } from "@/db/schema"
import { and, eq, isNull, sql } from "drizzle-orm"

// composant serveur dans components ?

export async function getDate(month?: string, year?: string) {
     try {
          const now = new Date()

          const targetMonth = month ? Number(month) : now.getMonth() + 1
          const targetYear = year ? Number(year) : now.getFullYear()
          const start = new Date(targetYear, targetMonth - 1, 1)
          const end = new Date(targetYear, targetMonth, 1)

          // component DB à mettre dans /api
          const result = await db
               .select({
                    heure: meetings.heure,
                    date: meetings.date,
               })
               .from(meetings)
               .where(
                    and(
                         sql`${meetings.date} >= ${start}`,
                         sql`${meetings.date} < ${end}`,
                         eq(meetings.confirme, 0),
                         isNull(meetings.name),
                    ),
               )

          return { success: true, result }
     } catch (error) {
          console.error("Database error:", error)
          return {
               success: false,
               error: "Erreur lors de la récupération des données.",
          }
     }
}
