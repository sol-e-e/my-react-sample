import { useRef, useEffect, useCallback } from "react";

/**
 * Preserves a reference to the given callback function as an argument while the component is mounted.
 * Wraps the given callback in React's Ref to preserve the reference.
 * @param callback want to be preserved
 */

export function usePreservedCallback<Callback extends (...args: any[]) => any>(callback: Callback) {
    const callbackRef = useRef<Callback>(callback);
  
    useEffect(() => {
      callbackRef.current = callback;
    }, [callback]);
  
    return useCallback((...args: any[]) => {
      return callbackRef.current(...args);
    }, []) as Callback;
  }