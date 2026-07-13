import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = "https://globalgrowth.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "GlobalGrowth | AI-Powered Foreign Trade Growth Platform",
    template: "%s | GlobalGrowth",
  },
  description:
    "GlobalGrowth helps factories, trading companies and wholesalers expand overseas with Facebook Ads lead generation, WhatsApp sales conversion, overseas customer acquisition, logistics, international payments and foreign trade training.",
  applicationName: "GlobalGrowth",
  generator: "Next.js",
  keywords: [
    "外贸增长",
    "Facebook广告",
    "WhatsApp销售",
    "海外客户开发",
    "跨境物流",
    "国际支付",
    "外贸培训",
    "Foreign Trade",
    "Facebook Ads",
    "WhatsApp Sales",
    "Overseas Customer Acquisition",
    "Lead Generation",
    "Cross-border Logistics",
    "International Payment",
    "B2B Growth",
    "SaaS",
    "AI Market Analyzer",
  ],
  authors: [{ name: "GlobalGrowth" }],
  creator: "GlobalGrowth",
  publisher: "GlobalGrowth",
  category: "business",
  alternates: {
    canonical: "/",
    languages: {
      "zh-CN": "/",
      en: "/",
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
    url: siteUrl,
    siteName: "GlobalGrowth",
    title: "GlobalGrowth | AI-Powered Foreign Trade Growth Platform",
    description:
      "Facebook Ads lead generation, WhatsApp sales conversion, overseas customer acquisition, logistics, payments and training — all in one AI-driven global growth platform.",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "GlobalGrowth - AI-Powered Foreign Trade Growth Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GlobalGrowth | AI-Powered Foreign Trade Growth Platform",
    description:
      "Facebook Ads, WhatsApp Sales, Overseas Acquisition, Logistics, Payments & Training — all powered by AI.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.svg"],
    apple: [{ url: "/favicon.svg" }],
  },
  manifest: "/site.webmanifest",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
    { media: "(prefers-color-scheme: light)", color: "#0a0a0f" },
  ],
  colorScheme: "dark",
};

// JSON-LD 结构化数据
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "GlobalGrowth",
  url: siteUrl,
  logo: `${siteUrl}/logo.svg`,
  description:
    "AI-powered foreign trade growth platform providing Facebook Ads, WhatsApp sales, overseas customer acquisition, logistics, payments and training services.",
  sameAs: [
    "https://www.facebook.com/globalgrowth",
    "https://www.twitter.com/globalgrowth",
    "https://www.linkedin.com/company/globalgrowth",
    "https://www.instagram.com/globalgrowth",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+86-400-888-8888",
    contactType: "customer service",
    areaServed: ["CN", "US", "EU", "SEA", "ME", "SA"],
    availableLanguage: ["Chinese", "English"],
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Building 10, Shenzhen Bay Tech Park",
    addressLocality: "Shenzhen",
    addressRegion: "Guangdong",
    addressCountry: "CN",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "GlobalGrowth",
  url: siteUrl,
  potentialAction: {
    "@type": "SearchAction",
    target: `${siteUrl}/?q={search_term_string}`,
    "query-input": "required name=search_term_string",
  },
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: "Foreign Trade Growth Services",
  provider: {
    "@type": "Organization",
    name: "GlobalGrowth",
  },
  areaServed: "Global",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Core Services",
    itemListElement: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Facebook Ads Lead Generation" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "WhatsApp Sales Conversion" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Overseas Customer Acquisition" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Logistics & Fulfillment" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "International Payment Solutions" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Foreign Trade Training" } },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(serviceSchema),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
