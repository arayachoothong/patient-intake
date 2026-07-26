import type { Metadata } from "next";
import { PublicEnvScript } from "next-runtime-env";
import { IBM_Plex_Sans, Source_Sans_3 } from "next/font/google";
import { QueryProvider } from "@/lib/http/QueryProvider";
import "./globals.css";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const ibmPlex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex",
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
    <html lang="en" className={`${sourceSans.variable} ${ibmPlex.variable}`}>
      <head>
        <PublicEnvScript />
      </head>
      <body className="font-sans">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
