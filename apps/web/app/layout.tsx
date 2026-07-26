import type { Metadata } from "next";
import { PublicEnvScript } from "next-runtime-env";
import { Fraunces, Source_Sans_3 } from "next/font/google";
import { QueryProvider } from "@/lib/http/QueryProvider";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Patient Intake",
  description: "Real-time patient intake check-in and staff monitoring",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${fraunces.variable}`}>
      <head>
        <PublicEnvScript />
      </head>
      <body className="font-sans">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
