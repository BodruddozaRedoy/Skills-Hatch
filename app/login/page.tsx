"use client";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { useKindeUser } from "@/hooks/useKindeUser";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { isAuthenticated, isLoading } = useKindeUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace("/dashboard/student");
    }
  }, [isAuthenticated, isLoading, router]);

  return (
    <div className="min-h-screen w-screen z-[999999] absolute top-0 left-0 backdrop-blur-2xl flex flex-col items-center justify-center">
      <div className="bg-background p-10 rounded-lg shadow-lg flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6">Login to Skill Hatch</h1>
        <RegisterLink>
          <button className="px-6 py-3 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary/90 transition cursor-pointer">Login / Register</button>
        </RegisterLink>
      </div>
    </div>
  );
} 