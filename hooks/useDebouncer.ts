'use client'
import { useState, useEffect } from "react";

/**
 * Custom hook for debouncing a value
 * @param value - The value you want to debounce
 * @param delay - Delay time in milliseconds
 * @returns The debounced value
 */
export function useDebouncer<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup timeout if value changes before delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
