import { Link } from "react-router";
import { useT } from "@/i18n";

type Row = {
  id: number;
  category: string;
  latinName: string;
  chineseName: string | null;
  morph: string | null;
  size: string | null;
  priceUsd: string | null;
  showPrice: boolean;
  venomous: boolean;
  citesAppendix: string | null;
  stock: number;
  imageUrl: string | null;
};

export default function SpeciesTable({ rows }: { rows: Row[] }) {
  const t = useT();
  return (
    <div className="overflow-x-auto border border-neutral-200">
      <table className="w-full min-w-[760px] border-collapse text-sm">
        <thead>
          <tr className="bg-[#06162d] text-left text-[11px] uppercase tracking-[0.15em] text-white">
            <th className="px-4 py-3 font-medium">{t("t.species")}</th>
            <th className="px-4 py-3 font-medium">{t("t.morph")}</th>
            <th className="px-4 py-3 font-medium">{t("t.size")}</th>
            <th className="px-4 py-3 font-medium">{t("t.status")}</th>
            <th className="px-4 py-3 text-right font-medium">{t("t.price")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr
              key={r.id}
              className="border-t border-neutral-200 transition-colors hover:bg-[#f8f6ee]"
            >
              <td className="px-4 py-3">
                <Link to={`/species/${r.id}`} className="group flex items-center gap-3">
                  {r.imageUrl && (
                    <img src={r.imageUrl} alt="" className="h-10 w-10 border border-neutral-200 object-cover" />
                  )}
                  <span>
                  <span className="latin-name text-[15px] group-hover:text-[#c9a227]">
                    {r.latinName}
                  </span>
                  {r.chineseName && (
                    <span className="ml-2 text-xs text-neutral-400">{r.chineseName}</span>
                  )}
                  </span>
                </Link>
              </td>
              <td className="px-4 py-3 text-neutral-600">{r.morph ?? "—"}</td>
              <td className="px-4 py-3 text-neutral-600">{r.size ?? "—"}</td>
              <td className="px-4 py-3">
                <div className="flex flex-wrap gap-1.5">
                  {r.venomous && (
                    <span className="border border-[#06162d] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      Venomous
                    </span>
                  )}
                  {r.citesAppendix && (
                    <span className="bg-[#06162d] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#c9a227]">
                      CITES {r.citesAppendix}
                    </span>
                  )}
                  <span
                    className={`px-1.5 py-0.5 text-[10px] uppercase tracking-wider ${
                      r.stock > 0 ? "bg-neutral-100 text-neutral-600" : "bg-neutral-100 text-neutral-400 line-through"
                    }`}
                  >
                    {r.stock > 0 ? `${t("t.instock")} · ${r.stock}` : t("t.preorder")}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3 text-right">
                {r.showPrice && r.priceUsd ? (
                  <span className="font-serif-display font-bold">${r.priceUsd}</span>
                ) : (
                  <Link
                    to={`/inquiry?species=${r.id}`}
                    className="text-xs font-semibold uppercase tracking-wider text-[#c9a227] hover:underline"
                  >
                    {t("t.quote")}
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
