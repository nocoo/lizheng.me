import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh";

  return {
    title: isZh ? "李征 - 微软首席软件工程经理" : "Zheng Li - Principal Software Engineering Manager @ Microsoft",
    description: isZh
      ? "15年Web和移动软件开发经验，正在为AI时代重塑自己。"
      : "15 years building web & mobile software. Now rebuilding myself for the AI era.",
    keywords: isZh
      ? ["李征", "软件工程", "微软", "AI", "移动开发", "Web开发"]
      : ["Zheng Li", "Software Engineering", "Microsoft", "AI", "Mobile Development", "Web Development"],
    authors: [{ name: "Zheng Li", url: "https://lizheng.me" }],
    creator: "Zheng Li",
    metadataBase: new URL("https://lizheng.me"),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        zh: "/zh",
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      url: `https://lizheng.me/${locale}`,
      title: isZh ? "李征 - 微软首席软件工程经理" : "Zheng Li - Principal Software Engineering Manager @ Microsoft",
      description: isZh
        ? "15年Web和移动软件开发经验，正在为AI时代重塑自己。"
        : "15 years building web & mobile software. Now rebuilding myself for the AI era.",
      siteName: "Zheng Li",
      images: [
        {
          url: "/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "Zheng Li",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: isZh ? "李征" : "Zheng Li",
      description: isZh
        ? "15年Web和移动软件开发经验，正在为AI时代重塑自己。"
        : "15 years building web & mobile software. Now rebuilding myself for the AI era.",
      creator: "@zhengli",
      images: ["/images/og-image.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "zh" }];
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
