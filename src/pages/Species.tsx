import { useState } from "react";
import { useSearchParams } from "react-router";
import { trpc } from "@/providers/trpc";
import SpeciesTable from "@/components/SpeciesTable";
import { useLang, useT } from "@/i18n";

export default function Species() {
  const t = useT();
  const { lang } = useLang();
  const [params, setParams] = useSearchParams();
  const category = params.get("category") ?? undefined;
  const [search, setSearch] = useState("");
  const [q, setQ] = useState("");
  const list = trpc.species.list.useQuery({ category, search: q || undefined });
  const counts = trpc.species.categoryCounts.useQuery();
  const cats = trpc.categories.list.useQuery();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-serif-display text-3xl font-bold">{t("cat.title")}</h1>
      <p className="mt-2 text-sm text-neutral-500">{t("cat.note")}</p>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        <button
          onClick={() => setParams({})}
          className={`border px-3 py-1.5 text-xs uppercase tracking-wider ${
            !category ? "border-[#06162d] bg-[#06162d] text-white" : "border-neutral-300 text-neutral-500 hover:border-[#06162d]"
          }`}
        >
          All
        </button>
        {(cats.data ?? []).map((c) => (
          <button
            key={c.slug}
            onClick={() => setParams({ category: c.slug })}
            className={`border px-3 py-1.5 text-xs uppercase tracking-wider ${
              category === c.slug
                ? "border-[#06162d] bg-[#06162d] text-white"
                : "border-neutral-300 text-neutral-500 hover:border-[#06162d]"
            }`}
          >
            {lang === "en" ? c.labelEn : c.labelCn}
            {counts.data?.[c.slug] ? ` (${counts.data[c.slug]})` : ""}
          </button>
        ))}
        <form
          className="ml-auto flex"
          onSubmit={(e) => {
            e.preventDefault();
            setQ(search.trim());
          }}
        >
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("cat.search")}
            className="w-48 border border-neutral-300 px-3 py-1.5 text-sm outline-none focus:border-[#c9a227]"
          />
          <button className="border border-l-0 border-neutral-300 px-3 py-1.5 text-xs uppercase tracking-wider hover:bg-neutral-100">
            Go
          </button>
        </form>
      </div>

      <div className="mt-6">
        {list.data ? (
          list.data.length ? (
            <SpeciesTable rows={list.data} />
          ) : (
            <div className="border border-neutral-200 p-10 text-center text-sm text-neutral-400">
              {t("cat.none")}
            </div>
          )
        ) : (
          <div className="border border-neutral-200 p-10 text-center text-sm text-neutral-400">
            {t("home.loading")}
          </div>
        )}
      </div>
    </div>
  );
}
