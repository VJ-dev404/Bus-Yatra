"use client";

import { useState, useEffect } from "react";

/** Returns current Indian Standard Time formatted as e.g. "2:14 pm" */
export function useClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      // Use Intl API — always correct regardless of user's local timezone
      const str = new Date().toLocaleTimeString("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
      // Normalise to lowercase "am"/"pm" (some browsers output "AM"/"PM")
      setTime(str.replace("AM", "am").replace("PM", "pm"));
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}
