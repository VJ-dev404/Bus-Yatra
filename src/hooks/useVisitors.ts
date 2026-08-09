"use client";

import { useState, useEffect } from "react";

/**
 * Simulates a live visitor counter.
 * Starts with a realistic base count and fluctuates naturally over time.
 * Replace the body with a real API call (e.g. Supabase Realtime, Ably, Pusher)
 * when you want actual live data.
 */
export function useVisitors() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    // Seed a realistic starting count (24–52 range) based on the hour
    const hour = new Date().getHours();
    const base = 18 + (hour % 12) * 3 + Math.floor(Math.random() * 8);
    setCount(base);

    // Fluctuate ±1 every 4–9 seconds to feel alive
    const drift = () => {
      setCount((prev) => {
        if (prev === null) return base;
        const delta = Math.random() < 0.5 ? 1 : -1;
        return Math.max(8, Math.min(99, prev + delta));
      });
      scheduleNext();
    };

    let timer: ReturnType<typeof setTimeout>;
    const scheduleNext = () => {
      const delay = 4000 + Math.random() * 5000;
      timer = setTimeout(drift, delay);
    };

    scheduleNext();
    return () => clearTimeout(timer);
  }, []);

  return count;
}
