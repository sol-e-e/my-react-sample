import { useRef, useEffect, useCallback } from "react";

function useThrottle<T extends (...args: any[]) => void>(callback: T, delay: number): T {
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
        if (!timer.current) {
            callback(...args);
            timer.current = setTimeout(() => {
                timer.current = null;
            }, delay);
        }
    }, [callback, delay]) as T;
}