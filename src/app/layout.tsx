import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Greater Gaming Society | San Antonio, Texas",
    template: "%s | Greater Gaming Society",
  },
  description:
    "A community for game developers, players, and creatives in San Antonio, Texas. Discover meetups, events, and ways to connect with the Greater Gaming Society.",
  applicationName: "Greater Gaming Society",
  keywords: [
    "Greater Gaming Society",
    "San Antonio gaming",
    "San Antonio game developers",
    "Texas game community",
    "Global Game Jam San Antonio",
    "game development meetup",
  ],
  category: "community",
  openGraph: {
    title: "Greater Gaming Society | San Antonio, Texas",
    description:
      "A community for game developers, players, and creatives in San Antonio, Texas. Discover meetups, events, and ways to connect with the Greater Gaming Society.",
    siteName: "Greater Gaming Society",
    type: "website",
    images: [
      {
        url: "/reference/community-pictures/ggs-geekdom-ribbon.jpg",
        width: 1440,
        height: 960,
        alt: "Greater Gaming Society ribbon-cutting event at Geekdom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Greater Gaming Society | San Antonio, Texas",
    description:
      "A community for game developers, players, and creatives in San Antonio, Texas.",
    images: ["/reference/community-pictures/ggs-geekdom-ribbon.jpg"],
  },
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
