import { trpc } from "@/providers/trpc";
import SpeciesTable from "@/components/SpeciesTable";
import { useT } from "@/i18n";

export default function Availability() {
  const t = useT();
  const list = trpc.species.list.useQuery({});
  const inStock = (list.data ?? []).filter((r) => r.stock > 0);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="font-serif-display text-3xl font-bold">{t("a.title")}</h1>
      <p className="mt-2 text-sm text-neutral-500">{t("a.note")}</p>
      <div className="mt-8">
        {list.data ? (
          <SpeciesTable rows={inStock} />
        ) : (
          <div className="border border-neutral-200 p-10 text-center text-sm text-neutral-400">{t("home.loading")}</div>
        )}
      </div>
    </div>
  );
}
