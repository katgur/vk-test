import { GetFactResponse } from "../entities/fact";

function isString(unknownType: unknown): unknownType is string {
    return typeof unknownType === "string" || unknownType instanceof String;
}

function isNumber(unknownType: unknown): unknownType is number {
    return typeof unknownType === "number" || unknownType instanceof Number;
}

export function isGetFactResponse(unknownType: unknown): unknownType is GetFactResponse {
    const getFactResponse = unknownType as GetFactResponse;
    return isString(getFactResponse.fact) && isNumber(getFactResponse.length);
}