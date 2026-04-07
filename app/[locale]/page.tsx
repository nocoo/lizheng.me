import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";

const HomeClient = dynamic(
  () => import("@/components/home-client").then((mod) => mod.HomeClient),
  { ssr: false }
);

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
