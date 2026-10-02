"use server";

import path from "path";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not defined.");
}

const createToken = (payload: object, options: jwt.SignOptions = {}): string => {
  return jwt.sign(
    { userId: "123", email: "test@mail.com" },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );
};

export default async function loginAction(name: string, pwd: string) {
  const trimmedName = name.trim();
  const trimmedPwd = pwd.trim();

  if (!trimmedName || !trimmedPwd) {
    return { success: false, error: "Username and password are required." };
  }

  const isAdminUser = trimmedName === process.env.ADMIN_USER;
  const isAdminPassword = trimmedPwd === process.env.ADMIN_PASSWORD;

  if (isAdminUser && isAdminPassword) {
    const token = createToken({});
    return { success: true, token };
  }

  return { success: false, error: "Invalid credentials." };
}