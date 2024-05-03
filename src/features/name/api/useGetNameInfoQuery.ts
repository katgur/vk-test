import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import api from ".";

function useGetNameInfoQuery() {
    const queryClient = useQueryClient();
    const [name, setName] = useState<string>("john");
    const result = useQuery({
        queryKey: ["nameInfo", name],
        queryFn: async ({ signal }) => {
            return await api.getNameInfo(name, signal);
        },
        refetchOnWindowFocus: false,
        retry: false,
    });

    return {
        result,
        name,
        setName,
        cancel: () => queryClient.cancelQueries({ queryKey: ["nameInfo"] }),
    };
}

export default useGetNameInfoQuery;
