import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "页面未找到 / Page not found",
  robots: { index: false, follow: true },
};

const links = [
  { href: "/catalog", zh: "产品目录", en: "Product catalog" },
  { href: "/about", zh: "关于我们", en: "About us" },
  { href: "/contact", zh: "销售咨询", en: "Contact sales" },
];

export default function NotFound() {
  return (
    <div className="catalog-theme flex min-h-svh items-center justify-center bg-[var(--catalog-cream)] px-5 py-20 text-[var(--catalog-forest)]">
      <div className="w-full max-w-lg text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--catalog-green)]">
          404
        </span>

        <h1 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl">
          页面未找到
        </h1>
        <p className="mt-2 font-serif text-2xl font-bold leading-tight text-[var(--catalog-green)] sm:text-3xl">
          Page not found
        </p>

        <p className="mt-6 text-sm leading-7 text-[var(--catalog-muted)]">
          此页面可能已移动或不存在。您可以从以下位置继续浏览。
        </p>
        <p className="mt-2 text-sm leading-7 text-[var(--catalog-muted)]">
          This page may have moved or no longer exists. Continue from one of the links below.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          {links.map(({ href, zh, en }) => (
            <Link
              className="rounded-full border border-[var(--catalog-border)] bg-white px-5 py-3 text-xs font-bold transition-colors hover:bg-[var(--catalog-mint)]"
              href={href}
              key={href}
            >
              {zh} · {en}
            </Link>
          ))}
        </div>

        <Link
          className="mt-8 inline-block rounded-full bg-[var(--catalog-lime)] px-6 py-3 text-xs font-bold text-[var(--catalog-forest)]"
          href="/"
        >
          返回首页 · Back to home
        </Link>
      </div>
    </div>
  );
}
