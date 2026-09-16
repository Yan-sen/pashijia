import { Link, NavLink, Outlet, useLocation } from "react-router";
import logo from "@/assets/logo.png";
import { BRAND } from "@/config";
import { T, useLang, useT, type DictKey } from "@/i18n";
import { trpc } from "@/providers/trpc";
import FloatBar from "@/components/FloatBar";
import { useEffect } from "react";

const NAV: { to: string; k: DictKey }[] = [
  { to: "/species", k: "nav.species" },
  { to: "/availability", k: "nav.availability" },
  { to: "/shipping", k: "nav.shipping" },
  { to: "/compliance", k: "nav.compliance" },
  { to: "/about", k: "nav.about" },
  { to: "/inquiry", k: "nav.inquiry" },
];

export const FOOTER_KEYS = [
  "footer_phone",
  "footer_email",
  "footer_address",
  "footer_a1",
  "footer_a2",
  "footer_a3",
  "footer_a4",
  "social_facebook",
  "social_instagram",
] as const;

export function useSiteSettings() {
  const q = trpc.settings.all.useQuery(undefined, { staleTime: 60_000 });
  const m = q.data ?? {};
  return (key: (typeof FOOTER_KEYS)[number], fallback: string) => m[key] || fallback;
}

function FooterText() {
  const t = useT();
  const st = useSiteSettings();
  const phone = st("footer_phone", BRAND.phone);
  const email = st("footer_email", BRAND.email);
  const address = st("footer_address", BRAND.address);
  return (
    <>
      <div className="text-sm leading-7 text-neutral-300">
        <div className="mb-2 text-xs uppercase tracking-[0.2em] text-[#c9a227]">{t("f.contact")}</div>
        <div>Tel / WhatsApp: {phone}</div>
        <div>Email: {email}</div>
        <div className="mt-2 text-neutral-400">{address}</div>
      </div>
      <div className="text-sm leading-7 text-neutral-300">
        <div className="mb-2 text-xs uppercase tracking-[0.2em] text-[#c9a227]">{t("f.assurance")}</div>
        <div>{st("footer_a1", t("f.a1"))}</div>
        <div>{st("footer_a2", t("f.a2"))}</div>
        <div>{st("footer_a3", t("f.a3"))}</div>
        <div className="mt-2 text-neutral-400">{st("footer_a4", t("f.a4"))}</div>
      </div>
    </>
  );
}

// 每页独立标题（SEO）
function PageTitle() {
  const loc = useLocation();
  const t = useT();
  useEffect(() => {
    const map: [RegExp, string][] = [
      [/^\/species\/\d+/, `PASHIJIA — ${t("nav.species")}`],
      [/^\/species/, `PASHIJIA — ${t("cat.title")}`],
      [/^\/availability/, `PASHIJIA — ${t("a.title")}`],
      [/^\/shipping/, `PASHIJIA — ${t("s.title")}`],
      [/^\/compliance/, `PASHIJIA — ${t("c.title")}`],
      [/^\/about/, `PASHIJIA — ${t("ab.title")}`],
      [/^\/inquiry/, `PASHIJIA — ${t("i.title")}`],
      [/^\/admin/, "PASHIJIA — 管理后台"],
    ];
    const hit = map.find(([re]) => re.test(loc.pathname));
    document.title = hit?.[1] ?? "PASHIJIA — Reptile Export China | CITES Captive-Bred Reptiles Wholesale · 爬世家";
  }, [loc.pathname, t]);
  return null;
}

// R10: 统计/自定义 head 代码注入（后台 settings.head_code 配置）
function HeadCodeInjector() {
  const q = trpc.settings.all.useQuery(undefined, { staleTime: 60_000 });
  useEffect(() => {
    const code = q.data?.head_code;
    if (!code || document.getElementById("psj-head-code")) return;
    const holder = document.createElement("div");
    holder.id = "psj-head-code";
    holder.style.display = "none";
    document.body.appendChild(holder);
    const range = document.createRange();
    range.selectNode(holder);
    holder.appendChild(range.createContextualFragment(code));
    // 让 <script> 标签真正执行
    holder.querySelectorAll("script").forEach((old) => {
      const s = document.createElement("script");
      for (const a of Array.from(old.attributes)) s.setAttribute(a.name, a.value);
      s.textContent = old.textContent;
      old.replaceWith(s);
    });
  }, [q.data]);
  return null;
}

function SocialLinks() {
  const st = useSiteSettings();
  const fb = st("social_facebook", "");
  const ig = st("social_instagram", "");
  if (!fb && !ig) return null;
  return (
    <div className="mt-4 flex items-center gap-3">
      {fb && (
        <a href={fb} target="_blank" rel="noreferrer" title="Facebook"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-neutral-300 hover:border-[#c9a227] hover:text-[#c9a227]">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.5-3.89 3.78-3.89 1.09 0 2.24.2 2.24.2v2.46H15.2c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12z"/></svg>
        </a>
      )}
      {ig && (
        <a href={ig} target="_blank" rel="noreferrer" title="Instagram"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-neutral-300 hover:border-[#c9a227] hover:text-[#c9a227]">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85 0-3.2.01-3.58.07-4.85C2.38 3.92 4.04 2.38 7.15 2.23 8.42 2.18 8.8 2.16 12 2.16zm0 3.68a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
        </a>
      )}
    </div>
  );
}

function LangToggle() {  const { lang, toggle } = useLang();
  return (
    <button
      onClick={toggle}
      className="border border-neutral-300 px-3 py-1 text-xs font-semibold tracking-wider hover:border-[#c9a227]"
      title="Switch language / 切换语言"
    >
      {lang === "en" ? "中文" : "EN"}
    </button>
  );
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-white text-[#06162d]">
      {/* top hairline */}
      <div className="h-1 w-full bg-[#06162d]" />
      <header className="border-b border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="flex items-center gap-3">
            <img src={logo} alt="PASHIJIA logo" className="h-12 w-12 object-contain" />
            <div className="leading-tight">
              <div className="font-serif-display text-lg font-bold tracking-[0.18em]">
                {BRAND.nameEn}
              </div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                Reptile Export · China
              </div>
            </div>
          </Link>
          <nav className="hidden items-center gap-6 text-[13px] uppercase tracking-[0.14em] md:flex">
            {NAV.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) =>
                  isActive
                    ? "border-b-2 border-[#c9a227] pb-0.5 font-semibold"
                    : "text-neutral-500 hover:text-[#06162d]"
                }
              >
                <T k={n.k} />
              </NavLink>
            ))}
            <LangToggle />
            <Link
              to="/inquiry"
              className="border border-[#06162d] px-4 py-1.5 font-semibold hover:bg-[#06162d] hover:text-white"
            >
              <T k="nav.quote" />
            </Link>
          </nav>
          <div className="flex items-center gap-2 md:hidden">
            <LangToggle />
            <Link to="/inquiry" className="border border-[#06162d] px-3 py-1 text-xs font-semibold uppercase tracking-wider">
              <T k="nav.quote" />
            </Link>
          </div>
        </div>
        <nav className="flex gap-4 overflow-x-auto px-4 pb-2 text-xs uppercase tracking-wider text-neutral-500 md:hidden">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} className="whitespace-nowrap">
              <T k={n.k} />
            </NavLink>
          ))}
        </nav>
      </header>

      <main>
        <Outlet />
      </main>

      <FloatBar />
      <HeadCodeInjector />
      <PageTitle />

      <footer className="mt-20 border-t-2 border-[#06162d] bg-[#06162d] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-3">
              <img src={logo} alt="" className="h-14 w-14 rounded-full bg-white object-contain p-1" />
              <div>
                <div className="font-serif-display text-lg font-bold tracking-[0.18em]">{BRAND.nameEn}</div>
                <div className="text-xs text-neutral-400">{BRAND.nameCn}</div>
              </div>
            </div>
            <p className="mt-4 font-serif-display text-sm italic text-[#c9a227]">
              {BRAND.sloganCn}
            </p>
            <p className="mt-1 text-xs text-neutral-400">{BRAND.slogan}.</p>
            <SocialLinks />
          </div>
          <FooterText />
          <div className="text-sm leading-7 text-neutral-300">
            <div className="mb-2 text-xs uppercase tracking-[0.2em] text-[#c9a227]">Resources</div>
            <Link to="/reptile-export-china" className="block hover:text-[#c9a227]">Reptile Export from China</Link>
            <Link to="/cites-reptile-export" className="block hover:text-[#c9a227]">CITES Export Guide</Link>
            <Link to="/chinese-native-reptiles" className="block hover:text-[#c9a227]">Chinese Native Reptiles</Link>
            <Link to="/wholesale-reptiles" className="block hover:text-[#c9a227]">Wholesale Reptiles</Link>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} {BRAND.nameFull}. <T k="f.rights" />
        </div>
      </footer>
    </div>
  );
}
