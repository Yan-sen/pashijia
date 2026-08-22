import { useState } from "react";
import { Link, useLocation } from "react-router";
import { useBasket } from "@/providers/basket";
import { useT } from "@/i18n";
import { BRAND } from "@/config";

export default function FloatBar() {
  const t = useT();
  const { items, remove } = useBasket();
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  const waText = encodeURIComponent(
    `Hi PASHIJIA, I'm browsing ${window.location.origin}${loc.pathname} and interested in your reptiles.`
  );

  return (
    <>
      {/* 询盘篮展开面板 */}
      {open && items.length > 0 && (
        <div className="fixed bottom-20 right-4 z-50 w-80 max-w-[calc(100vw-2rem)] border border-neutral-300 bg-white shadow-xl">
          <div className="border-b border-neutral-200 bg-[#06162d] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white">
            {t("b.title")} ({items.length})
          </div>
          <div className="max-h-64 overflow-y-auto">
            {items.map((i) => (
              <div key={i.id} className="flex items-center justify-between gap-2 border-b border-neutral-100 px-4 py-2 text-sm">
                <div className="min-w-0">
                  <span className="latin-name font-semibold">{i.latinName}</span>
                  <span className="ml-1 text-xs text-neutral-400">
                    {[i.morph, i.size].filter(Boolean).join(" · ")}
                  </span>
                </div>
                <button onClick={() => remove(i.id)} className="shrink-0 text-xs text-red-600 underline">
                  {t("b.remove")}
                </button>
              </div>
            ))}
          </div>
          <Link
            to="/inquiry"
            onClick={() => setOpen(false)}
            className="block bg-[#c9a227] px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-[#06162d] hover:bg-[#d8b64a]"
          >
            {t("b.submit")} →
          </Link>
        </div>
      )}

      {/* 浮动按钮组 */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
        {items.length > 0 && (
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 border border-[#06162d] bg-[#06162d] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg hover:bg-[#0d2342]"
          >
            🛒 {t("b.title")} · {items.length}
          </button>
        )}
        <a
          href={`https://wa.me/${BRAND.whatsapp.replace(/\D/g, "")}?text=${waText}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 bg-[#25D366] px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white shadow-lg hover:bg-[#1eb857]"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.26 8.26 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.17.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z"/></svg>
          {t("wa.label")}
        </a>
      </div>
    </>
  );
}
