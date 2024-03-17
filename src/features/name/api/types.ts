import { isNumber, isString } from "@shared/typeGuards";

interface GetNameInfoResponse {
    count: number;
    name: string;
    age: number;
}

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
