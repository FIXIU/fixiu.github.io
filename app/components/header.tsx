"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

type NavigationDictionary = {
  home: string;
  about: string;
  contact: string;
};

export type HeaderProps = {
  navigation: NavigationDictionary;
  locale: string;
};

const getNavigationItems = (nav: NavigationDictionary, locale: string) => [
  { label: nav.home, href: `/${locale}` },
  { label: nav.about, href: `/${locale}/about` },
  { label: nav.contact, href: `/${locale}/contact` },
];

function NavButton({ label, href }: { label: string; href: string }) {
  const letters = label.split("");

  return (
    <a
      href={href}
      className="group relative overflow-hidden block py-1 text-sm text-zinc-700 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-50 uppercase tracking-wide font-bold text-md/3.5 sm:text-lg/4 antialiased"
    >
      <span className="sr-only">{label}</span>
      <span
        className="relative block overflow-hidden h-[0.9em]"
        aria-hidden="true"
      >
        {/* Top letters (visible by default, scale up to hide on hover) */}
        <span className="flex">
          {letters.map((letter, index) => (
            <span
              key={`top-${index}`}
              className="inline-block origin-bottom transition-transform duration-250 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-0"
              style={{
                transitionDelay: `${index * 30}ms`,
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </span>
        {/* Bottom letters (hidden by default, scale up to show on hover) */}
        <span className="absolute left-0 top-0 flex">
          {letters.map((letter, index) => (
            <span
              key={`bottom-${index}`}
              className="inline-block dark:text-zinc-50 origin-top scale-y-0 transition-all duration-250 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100 group-hover:text-lime-400"
              style={{
                transitionDelay: `${index * 30}ms`,
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </span>
          ))}
        </span>
      </span>
    </a>
  );
}

export default function Header({ navigation, locale }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navigationItems = getNavigationItems(navigation, locale);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <header className="w-full border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-black">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 z-[60]">
          <div className="flex flex-row items-center gap-6">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-3 z-[60]"
              aria-label="Go to homepage"
              onClick={() => setIsOpen(false)}
            >
              <div className="z-60">
                <Image
                  src="/images/icon-light.svg"
                  alt="Logo"
                  width={30}
                  height={30}
                  className="dark:hidden block"
                />
                <Image
                  src="/images/icon-dark.svg"
                  alt="Logo"
                  width={30}
                  height={30}
                  className="hidden dark:block"
                />
              </div>
            </Link>
            <div className="text-center w-[11em]">
              <Link
                href="mailto:filipkowalczyk@tuta.io"
                className="ease-out duration-200 underline decoration-transparent transition-all underline-offset-2 decoration-wavy decoration-1 hover:decoration-lime-400 font-medium hover:font-semibold"
                aria-label="Send email"
              >
                filipkowalczyk@tuta.io
              </Link>
            </div>
          </div>

          <nav className="hidden items-center md:flex" aria-label="Primary">
            <ul className="flex items-center gap-8">
              {navigationItems.map((item) => (
                <li key={item.label}>
                  <NavButton label={item.label} href={item.href} />
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className={`inline-flex items-center justify-center rounded p-2 text-zinc-700 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-50 md:hidden z-[60] ${
              isOpen ? "fixed right-4 top-4" : "relative"
            }`}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex h-5 w-6 flex-col justify-between">
              <span
                className={`block h-[2px] w-full bg-current transition-transform duration-200 origin-center ${
                  isOpen ? "translate-y-[9px] rotate-45" : ""
                }`}
              />
              <span>
                <span
                  className={`block h-[2px] w-full bg-current transition-opacity duration-200 ${
                    isOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
              </span>
              <span
                className={`block h-[2px] w-full bg-current transition-transform duration-200 origin-center ${
                  isOpen ? "-translate-y-[9px] -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>

        <div id="mobile-menu" aria-hidden={!isOpen} className="md:hidden">
          <div
            className={`fixed right-0 top-0 z-50 h-dvh w-screen bg-zinc-50 dark:bg-black transition-transform duration-300 ease-out ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <nav
              className="px-6 pb-6 pt-24 h-screen"
              aria-label="Mobile primary"
            >
              <ul className="flex flex-col gap-4">
                {navigationItems.map((item, index) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className={`block text-2xl font-bold text-zinc-700 hover:text-zinc-900 dark:text-zinc-200 dark:hover:text-zinc-50 transition-all duration-300 ease-out uppercase ${
                        isOpen
                          ? "translate-x-0 opacity-100"
                          : "translate-x-24 opacity-0"
                      }`}
                      style={{
                        transitionDelay: isOpen
                          ? `${(index + 1) * 30 + 200}ms`
                          : "0ms",
                      }}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}
