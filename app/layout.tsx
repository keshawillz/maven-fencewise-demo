import type { Metadata } from "next";
import "./globals.css";

// Change these once your positioning is set (week 1).
export const metadata: Metadata = {
  title: "[Your product name]",
  description: "For [audience] who [need], [product] is a [category] that [benefit].",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
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
