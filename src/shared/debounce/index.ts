// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type FunctionWithAnyArgs = (...args: any[]) => void;

function debounce(
    this: ThisParameterType<FunctionWithAnyArgs>,
    fn: FunctionWithAnyArgs,
    ms = 700
): FunctionWithAnyArgs {
    let timeout: number;
    return (...args: Parameters<FunctionWithAnyArgs>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(this, args), ms);
    };
}

export default debounce;
