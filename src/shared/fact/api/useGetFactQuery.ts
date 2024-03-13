import { useQuery } from "@tanstack/react-query";
import api from ".";

function useGetFactQuery() {
    const result = useQuery({
        queryKey: ["fact"],
        queryFn: api.getFact,
        refetchOnWindowFocus: false,
        retry: false,
    });

    return result;
}

export default useGetFactQuery;
