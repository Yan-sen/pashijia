import {
  mysqlTable,
  serial,
  varchar,
  text,
  int,
  boolean,
  timestamp,
  bigint,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

export const species = mysqlTable("species", {
  id: serial("id").primaryKey(),
  category: varchar("category", { length: 100 }).notNull(),
  groupName: varchar("group_name", { length: 255 }).notNull(), // e.g. "Ptyas mucosus" group / hognose
  chineseName: varchar("chinese_name", { length: 255 }),
  latinName: varchar("latin_name", { length: 255 }).notNull(),
  morph: varchar("morph", { length: 255 }), // gene / morph
  size: varchar("size", { length: 100 }), // Baby / Adult / 15cm ...
  priceUsd: varchar("price_usd", { length: 100 }), // "150" or "3000/pair"
  showPrice: boolean("show_price").notNull().default(true),
  venomous: boolean("venomous").notNull().default(false),
  citesAppendix: varchar("cites_appendix", { length: 20 }), // "I"/"II"/"III"/null
  stock: int("stock").notNull().default(0),
  featured: boolean("featured").notNull().default(false),
  imageUrl: varchar("image_url", { length: 500 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const categories = mysqlTable("categories", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 100 }).notNull().unique(),
  labelEn: varchar("label_en", { length: 200 }).notNull(),
  labelCn: varchar("label_cn", { length: 200 }).notNull(),
  blurbEn: text("blurb_en"),
  blurbCn: text("blurb_cn"),
  sortOrder: int("sort_order").notNull().default(0),
});

export const settings = mysqlTable("settings", {
  id: serial("id").primaryKey(),
  key: varchar("key", { length: 100 }).notNull().unique(),
  value: text("value"),
});

export const inquiries = mysqlTable("inquiries", {
  id: serial("id").primaryKey(),
  speciesId: bigint("species_id", { mode: "number", unsigned: true }),
  speciesLabel: varchar("species_label", { length: 300 }),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  country: varchar("country", { length: 120 }).notNull(),
  buyerType: varchar("buyer_type", { length: 60 }), // wholesaler/breeder/institution/individual
  quantity: varchar("quantity", { length: 100 }),
  permitInfo: text("permit_info"), // import permit / venomous license info
  message: text("message"),
  status: mysqlEnum("status", ["new", "quoted", "confirmed", "paid", "shipped", "delivered", "closed"])
    .notNull()
    .default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const inquiryItems = mysqlTable("inquiry_items", {
  id: serial("id").primaryKey(),
  inquiryId: bigint("inquiry_id", { mode: "number", unsigned: true }).notNull(),
  speciesId: bigint("species_id", { mode: "number", unsigned: true }),
  label: varchar("label", { length: 400 }).notNull(), // 物种快照：学名·品系·规格
  quantity: varchar("quantity", { length: 100 }),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
