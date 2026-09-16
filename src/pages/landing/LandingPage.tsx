import { useEffect } from "react";
import { Link } from "react-router";
import { useLang } from "@/i18n";
import { BRAND } from "@/config";

export type LandingSection = { h2: string; body: string[] };
export type LandingFaq = { q: string; a: string };

export type LandingProps = {
  slug: string;
  title: string; // <title> & h1 核心关键词
  description: string; // meta description
  h1: string;
  intro: string;
  sections: LandingSection[];
  faqs: LandingFaq[];
};

export default function LandingPage({ p }: { p: LandingProps }) {
  const { lang } = useLang();

  useEffect(() => {
    document.title = p.title;
    let m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", p.description);
  }, [p]);

  const wa = `https://wa.me/${BRAND.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Hi PASHIJIA, I'm interested in wholesale reptiles (${p.slug}).`
  )}`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="font-serif-display text-3xl font-bold leading-tight md:text-4xl">{p.h1}</h1>
      <p className="mt-4 text-[15px] leading-8 text-neutral-600">{p.intro}</p>

      {p.sections.map((s) => (
        <section key={s.h2} className="mt-10">
          <h2 className="font-serif-display text-2xl font-bold">{s.h2}</h2>
          {s.body.map((para, i) => (
            <p key={i} className="mt-3 text-[15px] leading-8 text-neutral-600">{para}</p>
          ))}
        </section>
      ))}

      <section className="mt-10">
        <h2 className="font-serif-display text-2xl font-bold">FAQ</h2>
        <div className="mt-4 divide-y divide-neutral-200 border border-neutral-200">
          {p.faqs.map((f) => (
            <div key={f.q} className="p-5">
              <div className="font-semibold">{f.q}</div>
              <div className="mt-2 text-sm leading-7 text-neutral-600">{f.a}</div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12 border border-[#06162d] bg-[#06162d] p-8 text-center text-white">
        <div className="font-serif-display text-xl font-bold">
          {lang === "en" ? "Ready to import?" : "准备进口？"}
        </div>
        <p className="mt-2 text-sm text-neutral-300">
          {lang === "en"
            ? "Send us your target species and quantity — quotation within one business day."
            : "把目标物种和数量发给我们——一个工作日内报价。"}
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Link to="/inquiry" className="bg-[#c9a227] px-6 py-3 text-sm font-semibold uppercase tracking-wider text-[#06162d] hover:bg-[#d8b64a]">
            {lang === "en" ? "Request Wholesale Quote" : "获取批发报价"}
          </Link>
          <a href={wa} target="_blank" rel="noreferrer" className="border border-white px-6 py-3 text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-[#06162d]">
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
