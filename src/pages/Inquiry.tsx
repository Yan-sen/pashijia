import { useState } from "react";
import { useSearchParams, Link } from "react-router";
import { trpc } from "@/providers/trpc";
import { useT } from "@/i18n";

const inputCls =
  "w-full border border-neutral-300 px-3 py-2 text-sm outline-none focus:border-[#c9a227]";

export default function Inquiry() {
  const t = useT();
  const [params] = useSearchParams();
  const speciesId = params.get("species") ? Number(params.get("species")) : undefined;
  const item = trpc.species.byId.useQuery(
    { id: speciesId! },
    { enabled: speciesId !== undefined }
  );
  const create = trpc.inquiries.create.useMutation();
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    country: "",
    buyerType: "wholesaler",
    quantity: "",
    permitInfo: "",
    message: "",
  });

  const needsPermit = !!item.data && (item.data.venomous || !!item.data.citesAppendix);

  const set = (k: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    create.mutate(
      {
        speciesId,
        speciesLabel: item.data
          ? `${item.data.latinName} · ${item.data.morph ?? ""} · ${item.data.size ?? ""}`
          : undefined,
        ...form,
      },
      { onSuccess: () => setDone(true) }
    );
  };

  if (done)
    return (
      <div className="mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="font-serif-display text-3xl font-bold">{t("i.done")}</h1>
        <p className="mt-4 text-sm leading-7 text-neutral-500">
          {t("i.doneMsg")}
        </p>
        <Link to="/species" className="mt-8 inline-block border border-[#06162d] px-6 py-2.5 text-sm font-semibold uppercase tracking-wider hover:bg-[#06162d] hover:text-white">
          {t("i.continue")}
        </Link>
      </div>
    );

  return (
    <div className="mx-auto max-w-xl px-4 py-10">
      <h1 className="font-serif-display text-3xl font-bold">{t("i.title")}</h1>

      {item.data && (
        <div className="mt-4 border border-neutral-200 bg-[#f8f6ee] p-4 text-sm">
          <span className="latin-name font-bold">{item.data.latinName}</span>
          <span className="ml-2 text-neutral-500">
            {item.data.chineseName} · {item.data.morph ?? "—"} · {item.data.size ?? "—"}
          </span>
          {needsPermit && (
            <p className="mt-2 text-xs text-neutral-500">
              {t("i.permitNote")}
            </p>
          )}
        </div>
      )}

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-neutral-500">{t("i.name")}</label>
          <input required className={inputCls} value={form.name} onChange={set("name")} />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-neutral-500">{t("i.email")}</label>
          <input required type="email" className={inputCls} value={form.email} onChange={set("email")} />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wider text-neutral-500">{t("i.country")}</label>
            <input required className={inputCls} value={form.country} onChange={set("country")} placeholder={t("i.countryPh")} />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wider text-neutral-500">{t("i.buyerType")}</label>
            <select className={inputCls} value={form.buyerType} onChange={set("buyerType")}>
              <option value="wholesaler">{t("i.bt1")}</option>
              <option value="breeder">{t("i.bt2")}</option>
              <option value="institution">{t("i.bt3")}</option>
              <option value="individual">{t("i.bt4")}</option>
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-neutral-500">{t("i.qty")}</label>
          <input className={inputCls} value={form.quantity} onChange={set("quantity")} placeholder={t("i.qtyPh")} />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-neutral-500">
            {t("i.permit")} {needsPermit ? "*" : t("i.ifApp")}
          </label>
          <textarea
            required={needsPermit}
            className={inputCls}
            rows={3}
            value={form.permitInfo}
            onChange={set("permitInfo")}
            placeholder={t("i.permitPh")}
          />
        </div>
        <div>
          <label className="mb-1 block text-xs uppercase tracking-wider text-neutral-500">{t("i.msg")}</label>
          <textarea className={inputCls} rows={4} value={form.message} onChange={set("message")} />
        </div>
        <button
          disabled={create.isPending}
          className="w-full bg-[#06162d] py-3 text-sm font-semibold uppercase tracking-wider text-white hover:bg-[#0d2342] disabled:opacity-50"
        >
          {create.isPending ? t("i.sending") : t("i.submit")}
        </button>
        {create.isError && (
          <p className="text-sm text-red-600">{t("i.fail")}</p>
        )}
      </form>
    </div>
  );
}
