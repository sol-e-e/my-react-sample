import { useRef, useEffect } from "react";
import { useIsElementInViewport } from "./useIsElementInViewport";

export function useLazyImageLoader(): [React.RefCallback<HTMLDivElement>, boolean] {
    const isLoaded = useRef(false);
    const [ref, isVisible] = useIsElementInViewport();

    useEffect(() => {
        if (isVisible) {
          isLoaded.current = true;
        }
    }, [isVisible]);

    return [ref, isLoaded.current];
};