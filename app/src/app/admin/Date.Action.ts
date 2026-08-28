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

export async function getDate(month:string, year:string) {
    try {
        const db = await openDb();

        // Valeurs par défaut sur la date actuelle si non renseignées
        const now = new Date();
        const targetMonth = month ? String(month).padStart(2, '0') : String(now.getMonth() + 1).padStart(2, '0');
        const targetYear = year ? String(year) : String(now.getFullYear());

        const result = await db.all(
            "SELECT heure, date, name, email, phone, confirme FROM meting WHERE strftime('%m', date) = ? AND strftime('%Y', date) = ?",
            [targetMonth, targetYear]
        );

        return { success: true, result };
    } catch (error) {
        console.error("Database error:", error);
        return { success: false, error: "Erreur lors de la récupération des données." };
    }
}