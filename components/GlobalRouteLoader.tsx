// components/GlobalPageLoader.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import LoadingScreen from "./LoadingScreen";

export default function GlobalPageLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500); // adjust based on your animation speed

    return () => {
      clearTimeout(timeout);
    };
  }, [pathname]);

  if (!loading) return null;

  return (
    <div className="fixed w-full h-full inset-0 z-[9999999999] flex items-center justify-center backdrop-blur-xl">
      <p className="text-xl animate-pulse"><LoadingScreen/></p>
    </div>
  );
}
