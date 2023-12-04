import { useCallback, useEffect, useRef } from 'react';

// Функция debounce
function useDebounce<T extends (...args: any[]) => void>(callback: T, delay: number): T {
    const argsRef = useRef<any[]>();
    const timeoutRef = useRef<number | null>(null);

    function cleanup() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    }
    const debouncedCallback = useCallback((...args: any[]) => {
        argsRef.current = args;
        cleanup();

        timeoutRef.current = window.setTimeout(() => {
            if (argsRef.current) {
                callback(...argsRef.current);
            }
        }, delay);
    }, [callback, delay]);

    useEffect(() => {
        return cleanup;
    }, []);
    return debouncedCallback as T;
    
}

export default useDebounce;
