import { isGetFactResponse } from "../../../shared/fact/typeGuards";

const url = "https://catfact.ninja/fact";

async function getFact() {
    const response = await fetch(url);
    const json = await response.json();
    if (!response.ok) {
        throw new Error(json.message);
    }
    if (!isGetFactResponse(json)) {
        throw new Error("Wrong data from server");
    }
    return json;
}

export default {
    getFact,
}