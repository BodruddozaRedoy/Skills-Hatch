"use client";
import { useKindeUser } from "@/hooks/useKindeUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useKindeUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading || !isAuthenticated) {
    return <LoadingScreen/>
  }

  return <>{children}</>;
} 