"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type FooterProps = {
  locale: string;
};

export default function Footer({ locale }: FooterProps) {
  const pathname = usePathname();

  // Get the path without the locale prefix
  const pathWithoutLocale = pathname.replace(/^\/(en|pl)/, "") || "/";

  return (
    <footer className="w-full border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} Filip Kowalczyk
        </p>

        <div className="flex items-center gap-2 text-sm">
          <Link
            href={`/pl${pathWithoutLocale}`}
            className={`uppercase font-medium transition-colors ${
              locale === "pl"
                ? "text-lime-500 dark:text-lime-400"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
            onClick={() => {
              // Set cookie to remember user preference
              document.cookie = `NEXT_LOCALE=pl;path=/;max-age=31536000`;
            }}
          >
            PL
          </Link>
          <span className="text-zinc-300 dark:text-zinc-600">|</span>
          <Link
            href={`/en${pathWithoutLocale}`}
            className={`uppercase font-medium transition-colors ${
              locale === "en"
                ? "text-lime-500 dark:text-lime-400"
                : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
            onClick={() => {
              // Set cookie to remember user preference
              document.cookie = `NEXT_LOCALE=en;path=/;max-age=31536000`;
            }}
          >
            EN
          </Link>
        </div>
      </div>
    </footer>
  );
}
