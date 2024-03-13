import { useQuery } from "@tanstack/react-query";
import api from ".";
import { useState } from "react";

function useGetNameInfoQuery() {
    const [name, setName] = useState<string>("john");
    const result = useQuery({
        queryKey: ["nameInfo", name],
        queryFn: async ({ signal }) => {
            return await api.getNameInfo(name, signal);
        },
        refetchOnWindowFocus: false,
        retry: false,
    });

    return { result, name, setName };
}

export default useGetNameInfoQuery;
