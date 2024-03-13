import { useCallback } from "react";
import debounce, { FunctionWithAnyArgs } from ".";

function useDebounce(fn: FunctionWithAnyArgs, ms = 700) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const callback = useCallback(debounce(fn, ms), []);
    return callback;
}

export default useDebounce;
