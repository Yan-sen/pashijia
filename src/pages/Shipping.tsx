import { useT } from "@/i18n";

export default function Shipping() {
  const t = useT();
  const H = ({ k }: { k: Parameters<ReturnType<typeof useT>>[0] }) => (
    <h2 className="mb-3 font-serif-display text-xl font-bold text-[#06162d]">{t(k)}</h2>
  );
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-serif-display text-3xl font-bold">{t("s.title")}</h1>
      <p className="mt-2 text-sm text-neutral-500">{t("s.sub")}</p>
      <div className="mt-8 space-y-10 text-sm leading-7 text-neutral-600">
        <section>
          <H k="s.how" />
          <ul className="list-disc space-y-2 pl-5">
            <li>{t("s.how1")}</li>
            <li>{t("s.how2")}</li>
            <li>{t("s.how3")}</li>
            <li>{t("s.how4")}</li>
          </ul>
        </section>
        <section>
          <H k="s.season" />
          <p>{t("s.seasonP")}</p>
        </section>
        <section>
          <H k="s.lag" />
          <p>{t("s.lagP")}</p>
        </section>
        <section>
          <H k="s.timeline" />
          <ol className="list-decimal space-y-2 pl-5">
            <li>{t("s.t1")}</li>
            <li>{t("s.t2")}</li>
            <li>{t("s.t3")}</li>
            <li>{t("s.t4")}</li>
            <li>{t("s.t5")}</li>
          </ol>
        </section>
      </div>
    </div>
  );
}
