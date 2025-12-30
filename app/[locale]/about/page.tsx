import { getDictionary, hasLocale, type Locale } from "../../dictionaries";
import { notFound } from "next/navigation";
import AboutView from "./about-view";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function About({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale as Locale);

  return <AboutView dictionary={dictionary} />;
}
