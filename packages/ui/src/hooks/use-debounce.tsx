'use client';

import { useRef, useCallback } from 'react';

export interface Cancelable {
  clear(): void;
}

export function useDebounce<T extends (...args: any[]) => void>(func: T, wait: number = 166): T & Cancelable {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFunc = useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        func(...args);
      }, wait);
    },
    [func, wait]
  );

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  (debouncedFunc as T & Cancelable).clear = clear;

  return debouncedFunc as T & Cancelable;
}
