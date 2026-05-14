import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: "Shivam Creates — Premium Digital Creative Agency",
    template: "%s | Shivam Creates",
  },
  description:
    "Premium digital creative agency delivering Awwwards-caliber web design, app development, branding, video editing, and digital marketing for ambitious brands across India and globally.",
  keywords: [
    "web design agency India",
    "freelance web developer",
    "digital creative agency",
    "Next.js developer India",
    "branding agency startups",
    "premium website design",
    "app development India",
    "video editing services",
  ],
  authors: [{ name: "Shivam Creates", url: "https://shivamcreates.com" }],
  creator: "Shivam Creates",
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Shivam Creates",
    title: "Shivam Creates — Premium Digital Creative Agency",
    description:
      "Modern digital solutions for fast-growing brands. Web development, branding, video editing & more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shivam Creates — Premium Digital Creative Agency",
    description:
      "Modern digital solutions for fast-growing brands.",
    creator: "@shivamcreates",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        {children}
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
