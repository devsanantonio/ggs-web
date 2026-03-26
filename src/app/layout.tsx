import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Greater Gaming Society of San Antonio",
  description:
    "A community site for the Greater Gaming Society of San Antonio, Texas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
