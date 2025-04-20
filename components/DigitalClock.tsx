"use client";
import React, { useEffect, useState } from "react";

export default function DigitalClock() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        month: "short",
        hour12: true, // 👈 This makes it 12-hour format with AM/PM
      });
      setTime(formattedTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-xl lg:text-2xl font-extrabold text-primary bg-background p-5 rounded-lg w-full overflow-hidden">
      {time}
    </div>
  );
}
