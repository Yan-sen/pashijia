import { eq } from "drizzle-orm";
import { getDb } from "./connection";
import { settings } from "../../db/schema";

export async function getAllSettings() {
  const db = getDb();
  const rows = await db.select().from(settings);
  const map: Record<string, string> = {};
  for (const r of rows) map[r.key] = r.value ?? "";
  return map;
}

export async function upsertSetting(key: string, value: string) {
  const db = getDb();
  const existing = await db.select().from(settings).where(eq(settings.key, key));
  if (existing.length) {
    await db.update(settings).set({ value }).where(eq(settings.key, key));
  } else {
    await db.insert(settings).values({ key, value });
  }
}
