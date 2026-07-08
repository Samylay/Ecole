import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { DbUser, createSession, deleteSession, getSessionUser } from "./db";

// scrypt via node:crypto — no external hashing dependency needed for the MVP.
export function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(password, salt, 64);
  const expected = Buffer.from(hash, "hex");
  return candidate.length === expected.length && timingSafeEqual(candidate, expected);
}

const COOKIE_NAME = "layaida_session";

export async function startSession(userId: number): Promise<void> {
  const token = randomBytes(32).toString("hex");
  createSession(userId, token);
  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production" && process.env.LAYAIDA_INSECURE_COOKIE !== "1",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function getCurrentUser(): Promise<DbUser | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return getSessionUser(token) ?? null;
}

export async function endSession(): Promise<void> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (token) deleteSession(token);
  store.delete(COOKIE_NAME);
}

export function publicUser(user: DbUser) {
  return { name: user.name, email: user.email, role: user.role };
}
