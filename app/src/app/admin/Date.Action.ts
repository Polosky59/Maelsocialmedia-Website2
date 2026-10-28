"use server";

import { db } from "@/db";
import { meetings } from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";


export async function addDateAction(date: string, heure: string) {
  try {
    const uuid = crypto.randomUUID();

    const result = await db
      .insert(meetings)
      .values({
        date,
        heure,
        link_confirme: uuid,
        confirme: 0,
      })
      .returning({ id: meetings.id });

    return { success: true, id: result[0]?.id };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error: "Erreur lors de l'enregistrement." };
  }
}


export async function getDate(month?: string, year?: string) {
  try {
    const now = new Date();

    const targetMonth = month ? Number(month) : now.getMonth() + 1;
    const targetYear = year ? Number(year) : now.getFullYear();

    const start = new Date(targetYear, targetMonth - 1, 1);
    const end = new Date(targetYear, targetMonth, 1);

    const result = await db
      .select({
        heure: meetings.heure,
        date: meetings.date,
        name: meetings.name,
        email: meetings.email,
        phone: meetings.phone,
        confirme: meetings.confirme,
      })
      .from(meetings)
      .where(
        and(
          sql`${meetings.date} >= ${start}`,
          sql`${meetings.date} < ${end}`
        )
      );

    return { success: true, result };
  } catch (error) {
    console.error("Database error:", error);
    return {
      success: false,
      error: "Erreur lors de la récupération des données.",
    };
  }
}

export async function DellDateAction(date: string, heure: string) {
  try {
    const result = await db
      .delete(meetings)
      .where(
        and(
          eq(meetings.date, date),
          eq(meetings.heure, heure)
        )
      )
      .returning({ id: meetings.id });

    return { success: true, deleted: result.length };
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error: "Erreur lors de la suppression." };
  }
}