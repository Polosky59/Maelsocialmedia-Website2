"use server";

import jwt from "jsonwebtoken";

type TokenPayload = {
  userId: string;
  email: string;
};

export default async function authAction(token: string) {
  if (!token) {
    return { success: false, error: "Token requis." };
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as TokenPayload;

    if (!decoded.userId) {
      return { success: false, error: "Token invalide." };
    }

    return {
      success: true,
      user: decoded,
    };
  } catch (error) {
    return { success: false, error: "Token invalide ou expiré." };
  }
}