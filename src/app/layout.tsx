import React, { ReactNode } from "react";
import { Metadata } from "next";
import { AuthProvider } from "@/context/AuthContext";
import ComingSoonModal from "@/components/ComingSoonModal";
import ChatWidget from "@/components/ChatWidget";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Tiny Home Hub | Browse, Learn & Buy Tiny Homes",
  description: "The world's most curated marketplace for tiny homes, ADUs, and alternative housing. Browse listings, financing guides, and expert concierge services. Less Home, More Living.",
  keywords: "tiny homes, tiny houses, ADU, accessory dwelling unit, tiny home marketplace, tiny living, off-grid homes",
  openGraph: {
    title: "My Tiny Home Hub | Less Home, More Living",
    description: "Browse, learn, and buy with confidence. The premier marketplace for tiny homes and ADUs.",
    type: "website",
    url: "https://mytinyhomehub.com",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png" />
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <meta name="msapplication-TileColor" content="#1B4073" />
        <meta name="theme-color" content="#1B4073" />
      </head>
      <body>
        <AuthProvider>
          <ComingSoonModal />
          {children}
          <ChatWidget />
        </AuthProvider>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-JT53K4C5WG"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-JT53K4C5WG');
          `}
        </Script>
      </body>
    </html>
  );
}
