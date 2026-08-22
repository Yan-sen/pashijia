import { asc, eq } from "drizzle-orm";
import { getDb } from "./connection";
import { categories, species } from "../../db/schema";

export async function listCategories() {
  const db = getDb();
  return db.select().from(categories).orderBy(asc(categories.sortOrder), asc(categories.id));
}

export async function upsertCategory(data: {
  id?: number;
  slug: string;
  labelEn: string;
  labelCn: string;
  blurbEn?: string;
  blurbCn?: string;
  sortOrder?: number;
}) {
  const db = getDb();
  if (data.id) {
    const { id, ...rest } = data;
    await db.update(categories).set(rest).where(eq(categories.id, id));
    return { id };
  }
  const res = await db.insert(categories).values(data);
  return { id: Number(res[0].insertId) };
}

export async function deleteCategory(id: number) {
  const db = getDb();
  const cat = await db.select().from(categories).where(eq(categories.id, id));
  if (cat[0]) {
    // reassign species in this category to the first remaining category
    const remaining = await db.select().from(categories);
    const fallback = remaining.find((c) => c.id !== id);
    if (fallback) {
      await db
        .update(species)
        .set({ category: fallback.slug })
        .where(eq(species.category, cat[0].slug));
    }
  }
  await db.delete(categories).where(eq(categories.id, id));
}

export async function seedCategoriesIfEmpty() {
  const db = getDb();
  const existing = await db.select().from(categories);
  if (existing.length) return;
  await db.insert(categories).values([
    { slug: "chinese_snake", labelEn: "Chinese Snakes", labelCn: "国产蛇类", blurbEn: "Native Chinese colubrids and rat snakes — primary colors through high-end morphs.", blurbCn: "中国本土游蛇与锦蛇——从原色到高端品系。", sortOrder: 1 },
    { slug: "venomous", labelEn: "Venomous", labelCn: "毒蛇类", blurbEn: "Venomous species for licensed institutions and permitted keepers. Buyer qualification review required.", blurbCn: "面向持证机构与许可饲养者的毒蛇类，报价前需通过买家资质审核。", sortOrder: 2 },
    { slug: "lizard", labelEn: "Lizards", labelCn: "蜥蜴类", blurbEn: "Chinese tree dragons, skinks and bearded dragons.", blurbCn: "中国树蜥、石龙子与鬃狮蜥。", sortOrder: 3 },
    { slug: "pet_snake", labelEn: "Pet Snakes", labelCn: "宠物蛇", blurbEn: "International pet staples — hognose, corn snakes, kingsnakes in proven morphs.", blurbCn: "国际宠物主力品种——猪鼻蛇、玉米蛇、王蛇成熟品系。", sortOrder: 4 },
    { slug: "gecko", labelEn: "Geckos", labelCn: "守宫类", blurbEn: "Leopard geckos, fat-tails and knob-tails from our breeding lines.", blurbCn: "豹纹守宫、肥尾守宫与瘤尾守宫自有繁育线。", sortOrder: 5 },
    { slug: "other", labelEn: "Amphibians & Others", labelCn: "两栖及其他", blurbEn: "Tree frogs and other export-ready species.", blurbCn: "树蛙及其他可出口物种。", sortOrder: 6 },
  ]);
}
