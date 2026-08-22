import { Link } from "react-router";
import { useT } from "@/i18n";
import { useBasket } from "@/providers/basket";

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

function Badges({ r }: { r: Row }) {
  const t = useT();
  return (
    <div className="flex flex-wrap gap-1.5">
      {r.venomous && (
        <span className="border border-[#06162d] px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
          {t("t.venomous")}
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
  );
}

function Price({ r }: { r: Row }) {
  const t = useT();
  return r.showPrice && r.priceUsd ? (
    <span className="font-serif-display font-bold">${r.priceUsd}</span>
  ) : (
    <span className="text-xs uppercase tracking-wider text-neutral-400">{t("d.onRequest")}</span>
  );
}

function Check({ r }: { r: Row }) {
  const { has, toggle } = useBasket();
  return (
    <input
      type="checkbox"
      checked={has(r.id)}
      onChange={() =>
        toggle({
          id: r.id,
          latinName: r.latinName,
          chineseName: r.chineseName,
          morph: r.morph,
          size: r.size,
          priceUsd: r.priceUsd,
          showPrice: r.showPrice,
        })
      }
      className="h-4 w-4 accent-[#c9a227]"
      title="加入询盘 / Add to inquiry"
    />
  );
}

export default function SpeciesTable({ rows }: { rows: Row[] }) {
  const t = useT();
  return (
    <>
      {/* 桌面端：表格 */}
      <div className="hidden overflow-x-auto border border-neutral-200 md:block">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#06162d] text-left text-[11px] uppercase tracking-[0.15em] text-white">
              <th className="px-3 py-3 font-medium">{t("t.pick")}</th>
              <th className="px-4 py-3 font-medium">{t("t.species")}</th>
              <th className="px-4 py-3 font-medium">{t("t.morph")}</th>
              <th className="px-4 py-3 font-medium">{t("t.size")}</th>
              <th className="px-4 py-3 font-medium">{t("t.status")}</th>
              <th className="px-4 py-3 text-right font-medium">{t("t.price")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-t border-neutral-200 transition-colors hover:bg-[#f8f6ee]">
                <td className="px-3 py-3 text-center"><Check r={r} /></td>
                <td className="px-4 py-3">
                  <Link to={`/species/${r.id}`} className="group flex items-center gap-3">
                    {r.imageUrl && (
                      <img src={r.imageUrl} alt="" className="h-10 w-10 border border-neutral-200 object-cover" />
                    )}
                    <span>
                      <span className="latin-name text-[15px] group-hover:text-[#c9a227]">{r.latinName}</span>
                      {r.chineseName && <span className="ml-2 text-xs text-neutral-400">{r.chineseName}</span>}
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-3 text-neutral-600">{r.morph ?? "—"}</td>
                <td className="px-4 py-3 text-neutral-600">{r.size ?? "—"}</td>
                <td className="px-4 py-3"><Badges r={r} /></td>
                <td className="px-4 py-3 text-right"><Price r={r} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 移动端：卡片 */}
      <div className="space-y-3 md:hidden">
        {rows.map((r) => (
          <div key={r.id} className="border border-neutral-200 p-4">
            <div className="flex items-start gap-3">
              <div className="pt-1"><Check r={r} /></div>
              <Link to={`/species/${r.id}`} className="flex min-w-0 flex-1 items-center gap-3">
                {r.imageUrl && (
                  <img src={r.imageUrl} alt="" className="h-14 w-14 shrink-0 border border-neutral-200 object-cover" />
                )}
                <div className="min-w-0">
                  <div className="latin-name text-[15px] font-semibold">{r.latinName}</div>
                  {r.chineseName && <div className="text-xs text-neutral-400">{r.chineseName}</div>}
                  <div className="mt-0.5 text-xs text-neutral-500">
                    {[r.morph, r.size].filter(Boolean).join(" · ") || "—"}
                  </div>
                </div>
              </Link>
              <div className="shrink-0 text-right"><Price r={r} /></div>
            </div>
            <div className="mt-2 pl-7"><Badges r={r} /></div>
          </div>
        ))}
      </div>
    </>
  );
}
