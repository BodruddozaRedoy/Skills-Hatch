
import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import ClientNavbar from '@/components/ClientNavbar';
import ContextProvider from "@/providers/ContextProvider";
import KindeProviders from "@/providers/KindeProviders";
import GlobalRouteLoader from "@/components/GlobalRouteLoader";
import { Suspense } from "react";
import LoadingScreen from "@/components/LoadingScreen";
import GlobalPageLoader from "@/components/GlobalRouteLoader";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "400"
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Skill Hatch",
  description: "A Learning Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${geistMono.variable} antialiased bg-muted`}
      >
        <KindeProviders>
          <ContextProvider>
            <GlobalPageLoader />
            <Suspense fallback={<LoadingScreen />}>
              <ClientNavbar />
              {children}
            </Suspense>
          </ContextProvider>
        </KindeProviders>
      </body>
    </html>
  );
}
