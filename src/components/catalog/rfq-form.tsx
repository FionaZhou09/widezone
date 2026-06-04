import { useState, type FormEvent } from "react";
import { LoaderCircle } from "lucide-react";
import { submitRfq } from "@/lib/api/rfq";
import type { RfqItem } from "./types";
import { copy, type CatalogLocale } from "./i18n";

export function RfqForm({
  items,
  onSuccess,
  locale,
}: {
  items: RfqItem[];
  onSuccess: (developmentMode: boolean) => void;
  locale: CatalogLocale;
}) {
  const text = copy[locale];
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const form = new FormData(event.currentTarget);

    try {
      const result = await submitRfq({
        businessName: String(form.get("businessName") || ""),
        contactName: String(form.get("contactName") || ""),
        email: String(form.get("email") || ""),
        phone: String(form.get("phone") || ""),
        location: String(form.get("location") || ""),
        notes: String(form.get("notes") || ""),
        items: items.map((item) => ({
          nameEn: item.name_en,
          nameZh: item.name_zh,
          unit: item.unit,
          quantity: item.quantity,
        })),
      });
      onSuccess(Boolean(result.developmentMode));
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : "Unable to submit RFQ");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="space-y-3 border-t border-[var(--catalog-border)] pt-4" onSubmit={handleSubmit}>
      <h3 className="font-serif text-lg font-bold">{text.contactDetails}</h3>
      <div className="grid grid-cols-2 gap-2">
        <input className="catalog-rfq-input" name="businessName" placeholder={text.business} required />
        <input className="catalog-rfq-input" name="contactName" placeholder={text.contact} required />
        <input className="catalog-rfq-input" name="email" placeholder={text.email} required type="email" />
        <input className="catalog-rfq-input" name="phone" placeholder={text.phone} required />
      </div>
      <input className="catalog-rfq-input" name="location" placeholder={text.location} required />
      <textarea className="catalog-rfq-input min-h-20 resize-y" name="notes" placeholder={text.notes} />
      {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}
      <button
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--catalog-green)] px-4 py-3 text-xs font-bold tracking-wide text-white transition-colors hover:bg-[var(--catalog-forest)] disabled:opacity-60"
        disabled={submitting}
        type="submit"
      >
        {submitting ? <LoaderCircle className="size-4 animate-spin" /> : null}
        {text.submit}
      </button>
      <p className="text-center text-[10px] text-[var(--catalog-muted)]">
        {text.submitNote}
      </p>
    </form>
  );
}
