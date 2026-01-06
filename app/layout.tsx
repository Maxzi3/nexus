import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import ChatBot from "@/components/chatbot";
import TelegramIcon from "@/components/telegram-icon";

const nunitoSans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexusglobal-logistics.vercel.app/"),
  title: "Nexus Global Logistics – Reliable Shipping & Tracking",
  description:
    "Nexus Global Logistics provides fast, secure, and trackable shipping solutions worldwide. Track shipments, manage deliveries, and optimize logistics effortlessly.",
  keywords: [
    "logistics",
    "shipping",
    "parcel tracking",
    "freight",
    "warehouse",
    "delivery services",
    "global logistics",
  ],
  authors: [
    {
      name: "Nexus Global Logistics",
      url: "hhttps://nexusglobal-logistics.vercel.app",
    },
  ],
  openGraph: {
    title: "Nexus Global Logistics – Reliable Shipping & Tracking",
    description:
      "Fast, secure, and trackable shipping solutions worldwide. Track shipments, manage deliveries, and optimize logistics effortlessly.",
    url: "https://nexusglobal-logistics.vercel.app/",
    siteName: "Nexus Global Logistics",
    images: [
      {
        url: "/logo-image.jpg",
        width: 1200,
        height: 630,
        alt: "Nexus Global Logistics",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Global Logistics – Reliable Shipping & Tracking",
    description: "Fast, secure, and trackable shipping solutions worldwide.",
    images: ["/logo-image.jpg"],
    site: "@NexusLogistics",
    creator: "@NexusLogistics",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.className} antialiased`}>
        {children} <ChatBot /> <TelegramIcon /> <Toaster position="top-right" />
      </body>
    </html>
  );
}
