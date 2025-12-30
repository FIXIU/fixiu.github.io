import type { Metadata } from "next";
import "../globals.css";
import localFont from "next/font/local";
import Cursor from "../components/cursor/cursor";
import Header from "../components/header";
import Footer from "../components/footer";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { notFound } from "next/navigation";

const satoshi = localFont({
  src: [
    {
      path: "../../public/fonts/satoshi/Satoshi-Variable.woff2",
      weight: "300 900",
      style: "normal",
    },
    {
      path: "../../public/fonts/satoshi/Satoshi-VariableItalic.woff2",
      weight: "300 900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const rx100 = localFont({
  src: [
    {
      path: "../../public/fonts/rx100/RX100-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-rx100",
  display: "swap",
});

const stardom = localFont({
  src: [
    {
      path: "../../public/fonts/stardom/Stardom-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-stardom",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Filip Kowalczyk",
  description: "Portfolio Filipa Kowalczyka - Developer",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/images/icon-light.svg",
        href: "/images/icon-light.svg",
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/images/icon-dark.svg",
        href: "/images/icon-dark.svg",
      },
    ],
  },
};

// Generate static params for all locales
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pl" }];
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!hasLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale as Locale);

  return (
    <html lang={locale}>
      <body
        className={`${satoshi.variable} ${rx100.variable} ${stardom.variable} antialiased`}
      >
        <Cursor />
        <Header navigation={dictionary.navigation} locale={locale} />
        {children}
        <Footer locale={locale} />
      </body>
    </html>
  );
}
