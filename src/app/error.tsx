"use client";

import { useEffect } from "react";

/**
 * Route-level error boundary. Without this, an unhandled render error shows
 * the unstyled Next.js default page — which, on a site a buyer is using to
 * evaluate a supplier, reads as a broken business rather than a broken page.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[widezone] unhandled error", error);
  }, [error]);

  return (
    <div className="catalog-theme flex min-h-svh items-center justify-center bg-[var(--catalog-cream)] px-5 py-20 text-[var(--catalog-forest)]">
      <div className="w-full max-w-lg text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--catalog-green)]">
          出错了 · Something went wrong
        </span>

        <h1 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl">
          此页面暂时无法加载
        </h1>
        <p className="mt-2 font-serif text-2xl font-bold leading-tight text-[var(--catalog-green)] sm:text-3xl">
          This page could not be loaded
        </p>

        <p className="mt-6 text-sm leading-7 text-[var(--catalog-muted)]">
          请重试。如果问题持续，欢迎直接联系销售团队，我们会尽快协助您。
        </p>
        <p className="mt-2 text-sm leading-7 text-[var(--catalog-muted)]">
          Please try again. If the problem continues, contact our sales team directly and we
          will help you right away.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <button
            className="rounded-full bg-[var(--catalog-lime)] px-6 py-3 text-xs font-bold text-[var(--catalog-forest)]"
            onClick={reset}
            type="button"
          >
            重试 · Try again
          </button>
          <a
            className="rounded-full border border-[var(--catalog-border)] bg-white px-6 py-3 text-xs font-bold transition-colors hover:bg-[var(--catalog-mint)]"
            href="/contact"
          >
            联系销售 · Contact sales
          </a>
        </div>

        {error.digest ? (
          <p className="mt-8 text-[10px] uppercase tracking-[0.18em] text-[var(--catalog-muted)]">
            Reference: {error.digest}
          </p>
        ) : null}
      </div>
    </div>
  );
}
