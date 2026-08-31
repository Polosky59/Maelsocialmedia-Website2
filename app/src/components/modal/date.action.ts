"use server";

import { openDb } from "../../db/db";

export async function getDate(month: string, year: string) {
    try {
        const db = await openDb();

        const now = new Date();
        const targetMonth = month ? String(month).padStart(2, '0') : String(now.getMonth() + 1).padStart(2, '0');
        const targetYear = year ? String(year) : String(now.getFullYear());

        const result = await db.all(
            "SELECT heure, date FROM meting WHERE strftime('%m', date) = ? AND strftime('%Y', date) = ? and confirme = 0",
            [targetMonth, targetYear]
        );

        return { success: true, result };
    } catch (error) {
        console.error("Database error:", error);
        return { success: false, error: "Erreur lors de la récupération des données." };
    }
}