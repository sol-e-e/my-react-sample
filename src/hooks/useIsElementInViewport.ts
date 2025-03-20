import { useCallback, useEffect, useState } from "react";

export function useIsElementInViewport(): [React.RefCallback<HTMLDivElement>, boolean] {
    const [isVisible, setIsVisible] = useState(false);
    const [element, setElement] = useState<HTMLDivElement | null>(null);

    const ref = useCallback((node: HTMLDivElement | null) => {
        if (node !== null) setElement(node);
    }, []);

    useEffect(() => {
        if (!element) return;

        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            setIsVisible(entry.isIntersecting);
        })

        observer.observe(element);

        return () => observer.disconnect();
    }, [ref]);

    return [ref, isVisible];
};