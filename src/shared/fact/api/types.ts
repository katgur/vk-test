import { isNumber, isString } from "../../typeGuards";

interface GetFactResponse {
    fact: string;
    length: number;
}

export function isGetFactResponse(
    unknownType: unknown
): unknownType is GetFactResponse {
    const getFactResponse = unknownType as GetFactResponse;
    return isString(getFactResponse.fact) && isNumber(getFactResponse.length);
}
