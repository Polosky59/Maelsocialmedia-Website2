"use server";

import { openDb } from "../../db/db";

export async function submit(
    date: string,
    heure: string,
    username: string,
    email: string,
    phone: string
) {
    try {
        const db = await openDb();

        await db.run(
            `UPDATE meting
             SET name = ?, email = ?, phone = ?
             WHERE date = ? AND heure = ?`,
            [username, email, phone, date, heure]
        );

        return { success: true };
    } catch (error) {
        console.error("Database error:", error);
        return {
            success: false,
            error: "Erreur lors de la mise à jour des données.",
        };
    }
}