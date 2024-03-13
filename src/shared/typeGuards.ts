export function isString(unknownType: unknown): unknownType is string {
    return typeof unknownType === "string" || unknownType instanceof String;
}

export function isNumber(unknownType: unknown): unknownType is number {
    return typeof unknownType === "number" || unknownType instanceof Number;
}