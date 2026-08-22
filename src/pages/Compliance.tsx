import { useT } from "@/i18n";

export default function Compliance() {
  const t = useT();
  const H = ({ k }: { k: Parameters<ReturnType<typeof useT>>[0] }) => (
    <h2 className="mb-3 font-serif-display text-xl font-bold text-[#06162d]">{t(k)}</h2>
  );
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-serif-display text-3xl font-bold">{t("c.title")}</h1>
      <p className="mt-2 text-sm text-neutral-500">{t("c.sub")}</p>
      <div className="mt-8 space-y-10 text-sm leading-7 text-neutral-600">
        <section>
          <H k="c.cites" />
          <p>{t("c.citesP")}</p>
        </section>
        <section>
          <H k="c.ven" />
          <ul className="list-disc space-y-2 pl-5">
            <li>{t("c.ven1")}</li>
            <li>{t("c.ven2")}</li>
            <li>{t("c.ven3")}</li>
            <li>{t("c.ven4")}</li>
          </ul>
        </section>
        <section>
          <H k="c.buyer" />
          <ul className="list-disc space-y-2 pl-5">
            <li>{t("c.b1")}</li>
            <li>{t("c.b2")}</li>
            <li>{t("c.b3")}</li>
          </ul>
        </section>
        <section>
          <H k="c.docs" />
          <ul className="list-disc space-y-2 pl-5">
            <li>{t("c.d1")}</li>
            <li>{t("c.d2")}</li>
            <li>{t("c.d3")}</li>
            <li>{t("c.d4")}</li>
          </ul>
        </section>
        <section className="border-l-4 border-[#c9a227] bg-[#f8f6ee] p-5">
          <p className="font-semibold text-[#06162d]">{t("c.cta")}</p>
        </section>
      </div>
    </div>
  );
}
