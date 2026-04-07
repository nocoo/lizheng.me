import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const jsonLdEn = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Zheng Li",
  alternateName: "李征",
  jobTitle: "Developer",
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
  description:
    "20 years coding, 15 at Microsoft. Web, mobile, and data. Now exploring AI-native transformation for teams at scale.",
  knowsAbout: [
    "Software Engineering",
    "Web Development",
    "Mobile Development",
    "Data Engineering",
    "AI Transformation",
  ],
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
  jobTitle: "程序员",
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
  description: "写了20年代码，15年微软。Web、移动、数据。正在探索大型团队的AI原生转型。",
  knowsAbout: ["软件工程", "Web开发", "移动开发", "数据工程", "AI转型"],
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
    title: isZh ? "李征 - 程序员 @ Microsoft" : "Zheng Li - Developer @ Microsoft",
    description: isZh
      ? "李征，程序员 @ Microsoft，20年编程经验，15年微软。专注Web、移动和数据开发，正在探索大型团队的AI原生转型。"
      : "Zheng Li, Developer at Microsoft. 20 years coding, 15 at Microsoft. Web, mobile, and data. Now exploring AI-native transformation for teams at scale.",
    keywords: isZh
      ? [
          "李征",
          "程序员",
          "微软",
          "AI",
          "Web开发",
          "移动开发",
          "数据工程",
          "AI转型",
          "同济大学",
          "北京",
        ]
      : [
          "Zheng Li",
          "Developer",
          "Microsoft",
          "AI",
          "Web Development",
          "Mobile Development",
          "Data Engineering",
          "AI Transformation",
          "Tongji University",
          "Beijing",
        ],
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
        en: "https://lizheng.me/en",
        zh: "https://lizheng.me/zh",
        "x-default": "https://lizheng.me/en",
      },
    },
    openGraph: {
      type: "profile",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      alternateLocale: locale === "zh" ? "en_US" : "zh_CN",
      url: `https://lizheng.me/${locale}`,
      title: isZh ? "李征 - 程序员 @ Microsoft" : "Zheng Li - Developer @ Microsoft",
      description: isZh
        ? "写了20年代码，15年微软。Web、移动、数据。正在探索大型团队的AI原生转型。"
        : "20 years coding, 15 at Microsoft. Web, mobile, and data. Now exploring AI-native transformation for teams at scale.",
      siteName: "Zheng Li",
      firstName: "Zheng",
      lastName: "Li",
      username: "zhengli",
      images: [
        {
          url: "https://lizheng.me/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: isZh ? "李征 - 微软开发者" : "Zheng Li - Developer @ Microsoft",
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
      title: isZh ? "李征 - 程序员 @ Microsoft" : "Zheng Li - Developer @ Microsoft",
      description: isZh
        ? "写了20年代码，15年微软。Web、移动、数据。正在探索大型团队的AI原生转型。"
        : "20 years coding, 15 at Microsoft. Web, mobile, and data. Now exploring AI-native transformation for teams at scale.",
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
      "mobile-web-app-capable": "yes",
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
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/favicon.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preload" href="/images/profile.webp" as="image" type="image/webp" fetchPriority="high" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased">
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
