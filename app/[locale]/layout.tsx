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

const jsonLdEn = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Zheng Li",
  alternateName: "李征",
  jobTitle: "Principal Software Engineering Manager",
  worksFor: {
    "@type": "Organization",
    name: "Microsoft",
    url: "https://microsoft.com",
  },
  url: "https://lizheng.me",
  sameAs: [
    "https://www.linkedin.com/in/nocoo/",
    "https://x.com/zhengli",
    "https://github.com/nocoo",
    "https://lizheng.blog",
  ],
  image: "https://lizheng.me/images/profile.jpg",
  description: "15 years building web & mobile software. Now rebuilding myself for the AI era.",
  knowsAbout: ["Software Engineering", "Mobile Development", "Web Development", "AI", "Engineering Leadership"],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Tongji University",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Beijing",
    addressCountry: "CN",
  },
};

const jsonLdZh = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "李征",
  alternateName: "Zheng Li",
  jobTitle: "微软首席软件工程经理",
  worksFor: {
    "@type": "Organization",
    name: "微软",
    url: "https://microsoft.com",
  },
  url: "https://lizheng.me/zh",
  sameAs: [
    "https://www.linkedin.com/in/nocoo/",
    "https://x.com/zhengli",
    "https://github.com/nocoo",
    "https://lizheng.blog",
  ],
  image: "https://lizheng.me/images/profile.jpg",
  description: "15年Web和移动软件开发经验，正在为AI时代重塑自己。",
  knowsAbout: ["软件工程", "移动开发", "Web开发", "人工智能", "工程管理"],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "同济大学",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "北京",
    addressCountry: "CN",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isZh = locale === "zh";

  return {
    title: isZh ? "李征 - 微软首席软件工程经理" : "Zheng Li - Principal Software Engineering Manager @ Microsoft",
    description: isZh
      ? "李征，微软首席软件工程经理，15年Web和移动软件开发经验，专注AI转型和工程领导力。同济大学计算机硕士。"
      : "Zheng Li, Principal Software Engineering Manager at Microsoft. 15 years building web & mobile software, leading AI transformation. M.Eng from Tongji University.",
    keywords: isZh
      ? ["李征", "软件工程师", "微软", "AI", "移动开发", "Web开发", "工程管理", "Copilot", "同济大学", "北京"]
      : ["Zheng Li", "Software Engineer", "Microsoft", "AI", "Mobile Development", "Web Development", "Engineering Manager", "Copilot", "Tongji University", "Beijing"],
    authors: [{ name: "Zheng Li", url: "https://lizheng.me" }],
    creator: "Zheng Li",
    publisher: "Zheng Li",
    metadataBase: new URL("https://lizheng.me"),
    applicationName: "Zheng Li",
    generator: "vinext",
    referrer: "origin-when-cross-origin",
    category: "technology",
    classification: "Personal Website",
    alternates: {
      canonical: `https://lizheng.me/${locale}`,
      languages: {
        "en": "https://lizheng.me/en",
        "zh": "https://lizheng.me/zh",
        "x-default": "https://lizheng.me/en",
      },
    },
    openGraph: {
      type: "profile",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? "en_US" : "zh_CN",
      url: `https://lizheng.me/${locale}`,
      title: isZh ? "李征 - 微软首席软件工程经理" : "Zheng Li - Principal Software Engineering Manager @ Microsoft",
      description: isZh
        ? "15年Web和移动软件开发经验，正在为AI时代重塑自己。"
        : "15 years building web & mobile software. Now rebuilding myself for the AI era.",
      siteName: "Zheng Li",
      firstName: "Zheng",
      lastName: "Li",
      username: "zhengli",
      images: [
        {
          url: "https://lizheng.me/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: isZh ? "李征 - 微软首席软件工程经理" : "Zheng Li - Principal Software Engineering Manager @ Microsoft",
          type: "image/jpeg",
        },
        {
          url: "https://lizheng.me/images/profile.jpg",
          width: 400,
          height: 400,
          alt: "Zheng Li",
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@zhengli",
      creator: "@zhengli",
      title: isZh ? "李征 - 微软首席软件工程经理" : "Zheng Li - Principal Software Engineering Manager @ Microsoft",
      description: isZh
        ? "15年Web和移动软件开发经验，正在为AI时代重塑自己。"
        : "15 years building web & mobile software. Now rebuilding myself for the AI era.",
      images: {
        url: "https://lizheng.me/images/og-image.jpg",
        alt: isZh ? "李征" : "Zheng Li",
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: false,
      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      // Add when available:
      // google: "your-google-verification-code",
      // yandex: "your-yandex-verification-code",
      // bing: "your-bing-verification-code",
    },
    other: {
      "msapplication-TileColor": "#000000",
      "apple-mobile-web-app-capable": "yes",
      "apple-mobile-web-app-status-bar-style": "black-translucent",
      "apple-mobile-web-app-title": "Zheng Li",
      "format-detection": "telephone=no",
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
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light dark",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "zh" }];
}

export default async function RootLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();
  const jsonLd = locale === "zh" ? jsonLdZh : jsonLdEn;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/images/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
