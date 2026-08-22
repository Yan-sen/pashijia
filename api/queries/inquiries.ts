import { desc, eq } from "drizzle-orm";
import { getDb } from "./connection";
import { inquiries } from "../../db/schema";

export async function createInquiry(data: typeof inquiries.$inferInsert) {
  const db = getDb();
  const res = await db.insert(inquiries).values(data);
  return { id: Number(res[0].insertId) };
}

export async function listInquiries() {
  const db = getDb();
  return db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
}

export async function updateInquiryStatus(id: number, status: string) {
  const db = getDb();
  await db.update(inquiries).set({ status: status as never }).where(eq(inquiries.id, id));
}
