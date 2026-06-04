import { CheckCircle2, ClipboardList, Trash2, X } from "lucide-react";
import { RfqForm } from "./rfq-form";
import type { RfqItem } from "./types";
import { copy, type CatalogLocale } from "./i18n";

export function RfqTray({
  items,
  open,
  submitted,
  onOpenChange,
  onQuantityChange,
  onRemove,
  onSuccess,
  locale,
}: {
  items: RfqItem[];
  open: boolean;
  submitted: string;
  onOpenChange: (open: boolean) => void;
  onQuantityChange: (nameEn: string, quantity: string) => void;
  onRemove: (nameEn: string) => void;
  onSuccess: (developmentMode: boolean) => void;
  locale: CatalogLocale;
}) {
  const text = copy[locale];
  if (!items.length && !submitted) return null;

  return (
    <>
      <button
        className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-[var(--catalog-forest)] px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_40px_rgba(8,55,38,0.3)] transition-transform hover:-translate-y-1"
        onClick={() => onOpenChange(true)}
        type="button"
      >
        <ClipboardList className="size-4 text-[var(--catalog-lime)]" />
        {text.rfqButton}
        <span className="rounded-full bg-[var(--catalog-lime)] px-2 py-0.5 text-xs text-[var(--catalog-forest)]">{items.length}</span>
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 bg-black/35" onClick={() => onOpenChange(false)}>
          <aside
            className="absolute inset-y-0 right-0 w-full max-w-lg overflow-y-auto bg-[var(--catalog-cream)] p-5 shadow-2xl sm:p-7"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[var(--catalog-green)]">{text.rfqEyebrow}</span>
                <h2 className="mt-1 font-serif text-2xl font-bold text-[var(--catalog-forest)]">{text.rfqTitle}</h2>
              </div>
              <button aria-label="Close RFQ" onClick={() => onOpenChange(false)} type="button"><X className="size-5" /></button>
            </div>
            {submitted ? (
              <div className="rounded-2xl border border-[var(--catalog-border)] bg-white p-8 text-center">
                <CheckCircle2 className="mx-auto size-10 text-[var(--catalog-green)]" />
                <h3 className="mt-4 font-serif text-xl font-bold">{text.submittedTitle}</h3>
                <p className="mt-2 text-sm text-[var(--catalog-muted)]">{submitted}</p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div className="rounded-2xl border border-[var(--catalog-border)] bg-white p-4" key={item.name_en}>
                      <div className="flex items-start justify-between gap-3">
                        <div><strong className="font-serif text-sm">{locale === "zh" ? item.name_zh : item.name_en}</strong></div>
                        <button aria-label={`Remove ${item.name_en}`} onClick={() => onRemove(item.name_en)} type="button"><Trash2 className="size-4 text-[var(--catalog-green)]" /></button>
                      </div>
                      <input
                        className="catalog-rfq-input mt-3"
                        onChange={(event) => onQuantityChange(item.name_en, event.target.value)}
                        placeholder={text.quantity}
                        required
                        value={item.quantity}
                      />
                    </div>
                  ))}
                </div>
                <RfqForm items={items} locale={locale} onSuccess={onSuccess} />
              </>
            )}
          </aside>
        </div>
      ) : null}
    </>
  );
}
