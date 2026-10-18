import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fencewise: a fence price in 60 seconds",
  description:
    "For homeowners who need a fence price before they call anyone, Fencewise is a 60-second estimator that gives a real ballpark number and a next step.",
};

// The two typefaces from DESIGN.md. next/font is built into Next.js, so no new package.
// Barlow is for body text; Barlow Condensed is for headlines, prices and buttons.
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-barlow",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-barlow-condensed",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${barlow.variable} ${barlowCondensed.variable}`}>
      {/*
        suppressHydrationWarning: browser extensions like Grammarly and password
        managers add their own attributes to <body> before React loads, which
        otherwise shows a red "1 Issue" warning in development. Harmless, so ignored.
      */}
      <body className="antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
