"use server";

import { openDb } from "../../db/db";
const randomUUID = require("crypto")

export async function addDateAction(date: string, heure: string) {
    try {
        const uuid = crypto.randomUUID();
        const db = await openDb();
        const result = await db.run(
            "INSERT INTO meting (date, heure,link_confirme) VALUES (?, ?,?)",
            [date, heure, uuid]
        );
        return { success: true, id: result.lastID };
    } catch (error) {
        console.error("Database error:", error);
        return { success: false, error: "Erreur lors de l'enregistrement." };
    }
}

export async function getDate() {
    try {
        const db = await openDb();
        const result = await db.all(
            "SELECT heure,date,name ,email,phone,confirme FROM meting WHERE strftime('%m', date) = strftime('%m', 'now') AND strftime('%Y', date) = strftime('%Y', 'now')"
        );

        return { success: true, result };
    } catch (error) {
        console.error("Database error:", error);
        return { success: false, error: "Erreur lors de la récupération des données." };
    }
}