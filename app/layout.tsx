import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar/Navbar";
import Sidebar from "@/components/layouts/LeftSidebar/LeftSidebar";
import LeftSidebar from "@/components/layouts/LeftSidebar/LeftSidebar";
import RightSidebar from "@/components/layouts/RightSidebar/RightSidebar";
import ContextProvider from "@/providers/ContextProvider";

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
        <nav className="fixed w-full z-[99999]">
          <Navbar />
        </nav>
        <ContextProvider>
          {children}
        </ContextProvider>
        <footer></footer>
      </body>
    </html>
  );
}
