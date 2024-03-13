import { GetNameInfoResponse } from ".";
import { isNumber, isString } from "../typeGuards";

export function isGetNameInfoResponse(
    unknownType: unknown
): unknownType is GetNameInfoResponse {
    const getNameInfoResponse = unknownType as GetNameInfoResponse;
    return (
        isNumber(getNameInfoResponse.count) &&
        isNumber(getNameInfoResponse.age) &&
        isString(getNameInfoResponse.name)
    );
}
