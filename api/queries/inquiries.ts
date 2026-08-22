import { desc, eq, inArray } from "drizzle-orm";
import { getDb } from "./connection";
import { inquiries, inquiryItems } from "../../db/schema";

export type InquiryItemInput = {
  speciesId?: number;
  label: string;
  quantity?: string;
};

export async function createInquiry(
  data: typeof inquiries.$inferInsert,
  items: InquiryItemInput[] = []
) {
  const db = getDb();
  const res = await db.insert(inquiries).values(data);
  const id = Number(res[0].insertId);
  if (items.length) {
    await db.insert(inquiryItems).values(
      items.map((it) => ({
        inquiryId: id,
        speciesId: it.speciesId ?? null,
        label: it.label,
        quantity: it.quantity ?? null,
      }))
    );
  }
  return { id };
}

export async function listInquiries() {
  const db = getDb();
  const rows = await db.select().from(inquiries).orderBy(desc(inquiries.createdAt));
  if (!rows.length) return [];
  const items = await db
    .select()
    .from(inquiryItems)
    .where(inArray(inquiryItems.inquiryId, rows.map((r) => r.id)));
  const byInquiry = new Map<number, typeof items>();
  for (const it of items) {
    const arr = byInquiry.get(it.inquiryId) ?? [];
    arr.push(it);
    byInquiry.set(it.inquiryId, arr);
  }
  return rows.map((r) => ({ ...r, items: byInquiry.get(r.id) ?? [] }));
}

export async function updateInquiryStatus(id: number, status: string) {
  const db = getDb();
  await db.update(inquiries).set({ status: status as never }).where(eq(inquiries.id, id));
}
