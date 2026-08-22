import { Link, NavLink, Outlet } from "react-router";
import logo from "@/assets/logo.png";
import { BRAND } from "@/config";
import { T, useLang, useT, type DictKey } from "@/i18n";
import { trpc } from "@/providers/trpc";

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

function LangToggle() {
  const { lang, toggle } = useLang();
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

      <footer className="mt-20 border-t-2 border-[#06162d] bg-[#06162d] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
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
          </div>
          <FooterText />
        </div>
        <div className="border-t border-white/10 py-4 text-center text-xs text-neutral-500">
          © {new Date().getFullYear()} {BRAND.nameFull}. <T k="f.rights" />
        </div>
      </footer>
    </div>
  );
}
