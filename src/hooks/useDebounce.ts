import { useRef, useEffect, useCallback } from "react";

function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number): T {
    const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        // Cleanup timer on unmount;
        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
            }
        }
    }, []);

    return useCallback((...args: Parameters<T>) => {
        if (timer.current) {
            clearTimeout(timer.current);
        }

        timer.current = setTimeout(() => {
            callback(...args);
        }, delay);
    }, [callback, delay]) as T;
}