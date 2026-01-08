import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { notFound } from "next/navigation";
import HomeView from "./home-view";

type Props = {
  params: Promise<{ locale: string }>;
};

function calculateAge(): number {
  const birthDate = new Date(2009, 2, 5); // March 5, 2009 (month is 0-indexed)
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

function calculateGrade(): number {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const SEPTEMBER = 8; // 0-indexed, so September = 8
  if (currentMonth >= SEPTEMBER) {
    // September or later
    return currentYear - 2022;
  } else {
    return currentYear - 2023;
  }
}

export default async function Home({ params }: Props) {
  const { locale } = await params;

  if (!hasLocale(locale)) {
    notFound();
  }

  const dictionary = await getDictionary(locale as Locale);

  const age = calculateAge();
  const polishGrade = calculateGrade();
  // US grade system: Polish 1st grade = US 9th grade (high school)
  const grade = locale === "en" ? polishGrade + 8 : polishGrade;
  const introText = dictionary.home.intro
    .replace("{age}", String(age))
    .replace("{grade}", String(grade));

  return <HomeView introText={introText} dictionary={dictionary.home} />;
}
