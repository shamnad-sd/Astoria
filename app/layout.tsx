import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Astoria Convention Centre | Luxury Convention Destination in Kannur",
  description: "Experience world-class luxury at Astoria Convention Centre in Kannur. Designed for grand weddings, corporate conventions, private celebrations, and cultural events.",
  keywords: [
    "Astoria Convention Centre",
    "Kannur Convention Centre",
    "Luxury Wedding Venue Kannur",
    "Event Destination Kerala",
    "Auditorium Kannur",
    "Grand Celebrations",
  ],
  authors: [{ name: "Astoria Convention Centre" }],
  openGraph: {
    title: "Astoria Convention Centre | Where Architecture Meets Celebration",
    description: "A luxury convention destination in Kannur for weddings, events and unforgettable moments.",
    url: "https://astoriaconventioncentre.com",
    siteName: "Astoria Convention Centre",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Astoria Convention Centre | Kannur",
    description: "Where Architecture Meets Celebration. Premium convention destination in Kannur.",
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
    <html lang="en" className="dark scroll-smooth">
      <body className="bg-background text-primary antialiased selection:bg-accent selection:text-background">
        {children}
      </body>
    </html>
  );
}
