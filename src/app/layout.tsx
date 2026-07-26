import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

export const metadata: Metadata = {
  title: "Mamun Wifi | Premium ISP & Network Services",
  description:
    "Mamun Wifi provides high-speed, reliable, and secure broadband internet connections for homes, offices, and institutions.",
  keywords: [
    "Mamun Wifi",
    "ISP",
    "Internet Service Provider",
    "Broadband connection",
    "High-speed Wi-Fi",
    "Network Specialist",
  ],
  authors: [{ name: "Mamun Wifi" }],
  openGraph: {
    title: "Mamun Wifi | Premium ISP & Network Services",
    description:
      "Providing fast, stable, and highly secure internet connections.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Google+Sans:wght@400;500;700&family=Montserrat:wght@300;400;500;600&family=Outfit:wght@300;400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap"
        />
      </head>
      <body className="antialiased bg-white text-gray-900 selection:bg-[#2563eb] selection:text-white font-['Google_Sans',sans-serif]">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
