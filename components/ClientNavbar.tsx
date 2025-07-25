"use client";
import Navbar from "@/components/layouts/Navbar/Navbar";
import { usePathname } from "next/navigation";

export default function ClientNavbar() {
  const pathname = usePathname();
  if (pathname === "/login") return null;
  return "";
} 