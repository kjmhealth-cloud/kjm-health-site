import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  weight: ["500", "600", "700", "800"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Health Insurance Broker — 26+ States | KJM Health",
  description:
    "Get a free, personalized health insurance quote from Kyle Miller — a licensed independent broker in 26+ states. Marketplace and private plans compared. No spam, no call centers.",
  openGraph: {
    title: "KJM Health — One Broker. 26+ States. The Right Plan.",
    description:
      "Licensed independent health insurance broker comparing Marketplace and private plans across 26+ states. Free quotes, zero spam.",
    type: "website",
    url: "https://kylecoverage.com",
  },
  alternates: {
    canonical: "https://kylecoverage.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${montserrat.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
