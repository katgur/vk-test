import { isGetNameInfoResponse } from "../../../shared/name/typeGuards";

const url = "https://api.agify.io";

async function getNameInfo(name: string, signal: AbortSignal) {
    const response = await fetch(`${url}?name=${name}`, {
        signal,
    });
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    if (!isGetNameInfoResponse(json)) {
        throw new Error("Wrong data from server");
    }
    return json;
}

export default {
    getNameInfo,
};
