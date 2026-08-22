import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery } from "./middleware";
import {
  deleteCategory,
  listCategories,
  seedCategoriesIfEmpty,
  upsertCategory,
} from "./queries/categories";
import { createSpecies, deleteSpecies } from "./queries/species";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "";

function assertAdmin(password?: string) {
  if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Wrong password" });
  }
}
import {
  categoryCounts,
  getSpeciesById,
  listSpecies,
  updateSpecies,
} from "./queries/species";

const speciesInput = z.object({
  category: z.string(),
  groupName: z.string(),
  chineseName: z.string().nullable().optional(),
  latinName: z.string(),
  morph: z.string().nullable().optional(),
  size: z.string().nullable().optional(),
  priceUsd: z.string().nullable().optional(),
  showPrice: z.boolean().optional(),
  venomous: z.boolean().optional(),
  citesAppendix: z.string().nullable().optional(),
  stock: z.number().optional(),
  featured: z.boolean().optional(),
  imageUrl: z.string().nullable().optional(),
});
import { createInquiry, listInquiries, updateInquiryStatus } from "./queries/inquiries";
import { getAllSettings, upsertSetting } from "./queries/settings";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),

  species: createRouter({
    list: publicQuery
      .input(
        z.object({
          category: z.string().optional(),
          search: z.string().optional(),
          featuredOnly: z.boolean().optional(),
        })
      )
      .query(({ input }) => listSpecies(input)),
    byId: publicQuery
      .input(z.object({ id: z.number() }))
      .query(({ input }) => getSpeciesById(input.id)),
    categoryCounts: publicQuery.query(() => categoryCounts()),
    update: publicQuery
      .input(z.object({ password: z.string(), id: z.number(), data: speciesInput.partial() }))
      .mutation(({ input }) => {
        assertAdmin(input.password);
        return updateSpecies(input.id, input.data);
      }),
    create: publicQuery
      .input(z.object({ password: z.string(), data: speciesInput }))
      .mutation(({ input }) => {
        assertAdmin(input.password);
        return createSpecies(input.data);
      }),
    remove: publicQuery
      .input(z.object({ password: z.string(), id: z.number() }))
      .mutation(({ input }) => {
        assertAdmin(input.password);
        return deleteSpecies(input.id);
      }),
    uploadImage: publicQuery
      .input(
        z.object({
          password: z.string(),
          id: z.number(),
          filename: z.string(),
          dataBase64: z.string(), // base64 payload without data: prefix
        })
      )
      .mutation(async ({ input }) => {
        assertAdmin(input.password);
        const fs = await import("node:fs");
        const path = await import("node:path");
        const ext = path.extname(input.filename).toLowerCase() || ".jpg";
        const safe = `species-${input.id}-${Date.now()}${ext}`;
        const buf = Buffer.from(input.dataBase64, "base64");
        for (const dir of ["public/uploads", "dist/public/uploads"]) {
          fs.mkdirSync(path.resolve(process.cwd(), dir), { recursive: true });
          fs.writeFileSync(path.resolve(process.cwd(), dir, safe), buf);
        }
        const url = `/uploads/${safe}`;
        const db = (await import("./queries/connection")).getDb();
        const { species } = await import("../db/schema");
        const { eq } = await import("drizzle-orm");
        await db.update(species).set({ imageUrl: url }).where(eq(species.id, input.id));
        return { url };
      }),
  }),

  inquiries: createRouter({
    create: publicQuery
      .input(
        z.object({
          speciesId: z.number().optional(),
          speciesLabel: z.string().optional(),
          name: z.string().min(1),
          email: z.string().email(),
          country: z.string().min(1),
          buyerType: z.string().optional(),
          quantity: z.string().optional(),
          permitInfo: z.string().optional(),
          message: z.string().optional(),
        })
      )
      .mutation(({ input }) => createInquiry(input)),
    list: publicQuery
      .input(z.object({ password: z.string() }))
      .query(({ input }) => {
        assertAdmin(input.password);
        return listInquiries();
      }),
    updateStatus: publicQuery
      .input(z.object({ password: z.string(), id: z.number(), status: z.string() }))
      .mutation(({ input }) => {
        assertAdmin(input.password);
        return updateInquiryStatus(input.id, input.status);
      }),
  }),

  settings: createRouter({
    all: publicQuery.query(() => getAllSettings()),
    set: publicQuery
      .input(z.object({ password: z.string(), key: z.string(), value: z.string() }))
      .mutation(({ input }) => {
        assertAdmin(input.password);
        return upsertSetting(input.key, input.value);
      }),
  }),

  categories: createRouter({
    list: publicQuery.query(async () => {
      await seedCategoriesIfEmpty();
      return listCategories();
    }),
    upsert: publicQuery
      .input(
        z.object({
          password: z.string(),
          id: z.number().optional(),
          slug: z.string().min(1),
          labelEn: z.string().min(1),
          labelCn: z.string().min(1),
          blurbEn: z.string().optional(),
          blurbCn: z.string().optional(),
          sortOrder: z.number().optional(),
        })
      )
      .mutation(({ input }) => {
        assertAdmin(input.password);
        const { password: _pw, ...data } = input;
        return upsertCategory(data);
      }),
    remove: publicQuery
      .input(z.object({ password: z.string(), id: z.number() }))
      .mutation(({ input }) => {
        assertAdmin(input.password);
        return deleteCategory(input.id);
      }),
  }),
});

export type AppRouter = typeof appRouter;
