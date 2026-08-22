import { Link, useParams } from "react-router";
import { trpc } from "@/providers/trpc";

import { useLang, useT } from "@/i18n";

export default function SpeciesDetail() {
  const t = useT();
  const { lang } = useLang();
  const { id } = useParams<{ id: string }>();
  const item = trpc.species.byId.useQuery({ id: Number(id) }, { enabled: !!id });
  const cats = trpc.categories.list.useQuery();

  if (item.isLoading)
    return <div className="mx-auto max-w-6xl px-4 py-20 text-center text-neutral-400">{t("home.loading")}</div>;
  if (!item.data)
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 text-center text-neutral-400">
        {t("d.notFound")} <Link to="/species" className="underline">{t("d.back")}</Link>
      </div>
    );

  const s = item.data;
  const meta = cats.data?.find((c) => c.slug === s.category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="text-xs uppercase tracking-wider text-neutral-400">
        <Link to="/species" className="hover:text-[#06162d]">{t("nav.species")}</Link>
        {" / "}
        <Link to={`/species?category=${s.category}`} className="hover:text-[#06162d]">
          {meta ? (lang === "en" ? meta.labelEn : meta.labelCn) : ""}
        </Link>
      </div>

      <div className="mt-6 grid gap-10 md:grid-cols-5">
        <div className="md:col-span-3">
          {s.imageUrl && (
            <img src={s.imageUrl} alt={s.latinName} className="mb-6 max-h-80 w-full border border-neutral-200 object-contain" />
          )}
          <h1 className="latin-name font-serif-display text-4xl font-bold">{s.latinName}</h1>
          <div className="mt-1 text-lg text-neutral-500">
            {s.chineseName} {s.morph ? `· ${s.morph}` : ""}
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {s.venomous && (
              <span className="border-2 border-[#06162d] px-3 py-1 text-xs font-bold uppercase tracking-wider">
                {t("d.venomBadge")}
              </span>
            )}
            {s.citesAppendix && (
              <span className="bg-[#06162d] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#c9a227]">
                CITES Appendix {s.citesAppendix}
              </span>
            )}
          </div>

          <dl className="mt-8 grid grid-cols-2 gap-px border border-neutral-200 bg-neutral-200 text-sm">
            {[
              [t("d.size"), s.size ?? "—"],
              [t("d.avail"), s.stock > 0 ? `${t("t.instock")} (${s.stock})` : t("t.preorder")],
              [t("d.origin"), t("d.originV")],
              [t("d.category"), meta ? (lang === "en" ? meta.labelEn : meta.labelCn) : s.category],
            ].map(([k, v]) => (
              <div key={k} className="bg-white p-4">
                <dt className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">{k}</dt>
                <dd className="mt-1 font-medium">{v}</dd>
              </div>
            ))}
          </dl>

          {(s.venomous || s.citesAppendix) && (
            <div className="mt-6 border-l-4 border-[#c9a227] bg-[#f8f6ee] p-5 text-sm leading-7 text-neutral-600">
              {t("d.permitBox")}{" "}
              <Link to="/compliance" className="font-semibold underline">
                {t("d.permitLink")}
              </Link>
              .
            </div>
          )}
        </div>

        <aside className="md:col-span-2">
          <div className="border border-neutral-200 p-6">
            <div className="text-[10px] uppercase tracking-[0.2em] text-neutral-400">{t("d.priceUsd")}</div>
            {s.showPrice && s.priceUsd ? (
              <div className="mt-2 font-serif-display text-3xl font-bold">${s.priceUsd}</div>
            ) : (
              <div className="mt-2 font-serif-display text-xl font-bold text-[#c9a227]">
                {t("d.onRequest")}
              </div>
            )}
            <p className="mt-2 text-xs text-neutral-400">
              {t("d.priceSub")}
            </p>
            <Link
              to={`/inquiry?species=${s.id}`}
              className="mt-6 block bg-[#06162d] py-3 text-center text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#0d2342]"
            >
              {s.showPrice && s.priceUsd ? t("d.placeInquiry") : t("d.requestQuote")}
            </Link>
            <a
              href={`https://wa.me/8613107437859?text=${encodeURIComponent(
                `Inquiry: ${s.latinName} ${s.morph ?? ""} (${s.size ?? ""})`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="mt-3 block border border-neutral-300 py-3 text-center text-sm font-semibold uppercase tracking-wider hover:border-[#06162d]"
            >
              WhatsApp Us
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
