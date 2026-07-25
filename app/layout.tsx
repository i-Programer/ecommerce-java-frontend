// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

// Font optimization with variable
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Metadata untuk SEO
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "Admin Dashboard",
    template: "%s | Admin Dashboard",
  },
  description: "Modern admin dashboard built with Next.js 16 and shadcn/ui",
  keywords: ["admin", "dashboard", "nextjs", "react", "shadcn"],
  authors: [{ name: "Your Company" }],
  creator: "Your Company",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: process.env.NEXT_PUBLIC_APP_URL,
    title: "Admin Dashboard",
    description: "Modern admin dashboard built with Next.js 16",
    siteName: "Admin Dashboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Admin Dashboard",
    description: "Modern admin dashboard built with Next.js 16",
  },
  robots: {
    index: false,
    follow: false,
  },
};

// Viewport configuration (separate from metadata in Next.js 16)
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(
        "min-h-screen bg-background font-sans antialiased",
        inter.variable
      )}>
        {children}
      </body>
    </html>
  );
}