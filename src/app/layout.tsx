import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jesús Adrián López Gaona - Full-Stack Engineer & AI Developer",
  description: "Computer Science student and multidisciplinary engineer with 5+ years building full-stack applications, AI-powered automation, and secure enterprise systems.",
  keywords: "Full-Stack Developer, AI Engineer, Python, React, Django, Machine Learning, Nuevo León, Mexico",
  authors: [{ name: "Jesús Adrián López Gaona" }],
  creator: "Jesús Adrián López Gaona",
  openGraph: {
    title: "Jesús Adrián López Gaona - Full-Stack Engineer & AI Developer",
    description: "Computer Science student and multidisciplinary engineer with 5+ years building full-stack applications, AI-powered automation, and secure enterprise systems.",
    url: "https://adriangaona.dev",
    siteName: "Jesús Adrián López Gaona Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jesús Adrián López Gaona - Full-Stack Engineer & AI Developer",
    description: "Computer Science student and multidisciplinary engineer with 5+ years building full-stack applications, AI-powered automation, and secure enterprise systems.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}