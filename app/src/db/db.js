import sqlite3 from "sqlite3";
import { open } from "sqlite";

// On exporte une fonction qui ouvre la connexion
export async function openDb() {
    const db = await open({
        filename: "./ma_base.db",
        driver: sqlite3.Database,
    });

    await db.exec(`
        CREATE TABLE IF NOT EXISTS meting (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            heure TEXT,
            name TEXT,
            email TEXT,
            phone TEXT,
            confirme INTEGER DEFAULT 0,
            link_confirme TEXT UNIQUE
        )
    `);

    return db;
}