import { and, desc, eq, like, or } from "drizzle-orm";
import { getDb } from "./connection";
import { species } from "../../db/schema";

export async function listSpecies(input: {
  category?: string;
  search?: string;
  featuredOnly?: boolean;
}) {
  const db = getDb();
  const conds = [];
  if (input.category) conds.push(eq(species.category, input.category as never));
  if (input.featuredOnly) conds.push(eq(species.featured, true));
  if (input.search) {
    const q = `%${input.search}%`;
    conds.push(
      or(
        like(species.latinName, q),
        like(species.chineseName, q),
        like(species.morph, q),
        like(species.groupName, q)
      )
    );
  }
  return db
    .select()
    .from(species)
    .where(conds.length ? and(...conds) : undefined)
    .orderBy(species.groupName, species.id);
}

export async function getSpeciesById(id: number) {
  const db = getDb();
  const rows = await db.select().from(species).where(eq(species.id, id));
  return rows[0] ?? null;
}

export async function categoryCounts() {
  const db = getDb();
  const all = await db.select({ category: species.category, id: species.id }).from(species);
  const counts: Record<string, number> = {};
  for (const r of all) counts[r.category] = (counts[r.category] ?? 0) + 1;
  return counts;
}

export async function updateSpecies(
  id: number,
  data: Partial<Omit<typeof species.$inferInsert, "id" | "createdAt">>
) {
  const db = getDb();
  await db.update(species).set(data).where(eq(species.id, id));
  return getSpeciesById(id);
}

export async function createSpecies(data: Omit<typeof species.$inferInsert, "id" | "createdAt">) {
  const db = getDb();
  const res = await db.insert(species).values(data);
  return { id: Number(res[0].insertId) };
}

export async function deleteSpecies(id: number) {
  const db = getDb();
  await db.delete(species).where(eq(species.id, id));
}

export { desc };
