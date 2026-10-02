import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Syne, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { contact } from "./lib/data";
import { SITE_URL } from "./lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

const title = "Jesús Adrián López Gaona | Software Engineer & AI Systems";
const description =
  "Software engineer in Nuevo León, Mexico, building full-stack web platforms, AI systems, and business automation with Next.js, React, Python, and Django.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Adrián Gaona Portfolio",
  title: {
    default: title,
    template: "%s | Adrián Gaona",
  },
  description,
  keywords: [
    "Jesús Adrián López Gaona",
    "Software Engineer",
    "Full-Stack Developer",
    "AI Systems",
    "Business Automation",
    "Next.js",
    "React",
    "Python",
    "Django",
    "Nuevo León",
    "Mexico",
  ],
  authors: [{ name: "Jesús Adrián López Gaona" }],
  creator: "Jesús Adrián López Gaona",
  publisher: "Jesús Adrián López Gaona",
  category: "technology",
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title,
    description,
    url: SITE_URL,
    siteName: "Adrián Gaona",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#071015",
  colorScheme: "dark",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Jesús Adrián López Gaona",
  alternateName: "Adrián Gaona",
  url: SITE_URL,
  image: `${SITE_URL}/images/pfp.webp`,
  email: `mailto:${contact.email}`,
  jobTitle: "Software Engineer",
  description,
  address: {
    "@type": "PostalAddress",
    addressRegion: "Nuevo León",
    addressCountry: "MX",
  },
  // Lets search engines tie the profiles to this site as one person.
  sameAs: contact.socials.map((social) => social.href),
  knowsAbout: [
    "Software engineering",
    "Full-stack web development",
    "Artificial intelligence systems",
    "Business process automation",
    "Next.js",
    "React",
    "Python",
    "Django",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${syne.variable} ${instrument.variable} grain antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personSchema).replace(/</g, "\\u003c"),
          }}
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
