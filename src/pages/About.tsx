import logo from "@/assets/logo.png";
import { BRAND } from "@/config";
import { useT } from "@/i18n";

export default function About() {
  const t = useT();
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div className="flex items-center gap-5">
        <img src={logo} alt="PASHIJIA emblem" className="h-24 w-24 rounded-full border border-neutral-200 object-contain p-2" />
        <div>
          <h1 className="font-serif-display text-3xl font-bold">{t("ab.title")}</h1>
          <p className="mt-1 text-sm text-neutral-500">{BRAND.nameFull} · {BRAND.nameCn}</p>
        </div>
      </div>
      <div className="mt-8 space-y-6 text-sm leading-7 text-neutral-600">
        <p className="font-serif-display text-lg italic text-[#06162d]">
          {BRAND.sloganCn} — {BRAND.slogan}.
        </p>
        <p>{t("ab.p1")}</p>
        <p>{t("ab.p2")}</p>
        <div className="grid grid-cols-2 gap-px border border-neutral-200 bg-neutral-200 md:grid-cols-4">
          {(
            [
              ["ab.s1", "ab.s1s"],
              ["ab.s2", "ab.s2s"],
              ["ab.s3", "ab.s3s"],
              ["ab.s4", "ab.s4s"],
            ] as const
          ).map(([a, b]) => (
            <div key={a} className="bg-white p-5 text-center">
              <div className="font-serif-display text-lg font-bold">{t(a)}</div>
              <div className="mt-1 text-xs text-neutral-500">{t(b)}</div>
            </div>
          ))}
        </div>
        <div>
          <h2 className="mb-3 font-serif-display text-xl font-bold text-[#06162d]">{t("ab.contact")}</h2>
          <p>Tel / WhatsApp: {BRAND.phone}</p>
          <p>Email: {BRAND.email}</p>
          <p>{BRAND.address}</p>
        </div>
      </div>
    </div>
  );
}
