"use server";

import path from "path";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const JWT_SECRET = process.env.JWT_SECRET;


export default async function authAction(token: string) {
    if (!token) {
        return { success: false, error: "token are required." };
    }
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        console.log(verified)
        return { success: true, error: "Invalid credentials." };

    } catch (error) {
        return { success: false, error: "Invalid credentials." };
    }
}