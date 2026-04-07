import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { HomeClient } from "@/components/home-client";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <HomeClient
      locale={locale}
      translations={{
        role: t("role"),
        tagline: t("tagline"),
      }}
    />
  );
}
