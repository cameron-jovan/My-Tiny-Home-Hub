import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

export const metadata = {
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

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
        <meta name="theme-color" content="#1B4073" />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
