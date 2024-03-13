import { GetFactResponse } from ".";
import { isNumber, isString } from "../typeGuards";

export function isGetFactResponse(
    unknownType: unknown
): unknownType is GetFactResponse {
    const getFactResponse = unknownType as GetFactResponse;
    return isString(getFactResponse.fact) && isNumber(getFactResponse.length);
}
