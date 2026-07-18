import type { Metadata } from "next";
import { Geist, Geist_Mono, Syne, Instrument_Serif } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Adrián Gaona — Software & AI Systems",
  description:
    "Computer science engineer building web platforms and AI systems that turn busywork into momentum. Software for business productivity, shipped with discipline.",
  keywords:
    "Software Engineer, AI Systems, Web Development, Business Automation, Next.js, Python, Nuevo León, Mexico",
  authors: [{ name: "Jesús Adrián López Gaona" }],
  creator: "Jesús Adrián López Gaona",
  openGraph: {
    title: "Adrián Gaona — Software & AI Systems",
    description:
      "Web platforms and AI systems that turn busywork into momentum.",
    url: "https://adriangaona.dev",
    siteName: "Adrián Gaona",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adrián Gaona — Software & AI Systems",
    description:
      "Web platforms and AI systems that turn busywork into momentum.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        {children}
      </body>
    </html>
  );
}
