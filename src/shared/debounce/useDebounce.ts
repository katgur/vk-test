import { useCallback } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FunctionWithAnyArgs = (...args: any[]) => void;

export function debounce(
    this: ThisParameterType<FunctionWithAnyArgs>,
    fn: FunctionWithAnyArgs,
    ms = 700
): FunctionWithAnyArgs {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<FunctionWithAnyArgs>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), ms);
    };
}

function useDebounce(fn: FunctionWithAnyArgs, ms = 700) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const callback = useCallback(debounce(fn, ms), []);
    return callback;
}

export default useDebounce;
