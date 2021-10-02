import getClient from "../../client";
import { ResponseProps } from "../types";
import { BASE_URL, DEFAULT_RESPONSE, HEADERS } from "../../constants";
import { useCallback, useEffect, useRef, useState } from "react";

const useQuery = (endpoint: any) => {
    const isCurrent = useRef(true);

    const [_endpoint] = useState(endpoint);
    const [responses, setResponses] = useState<ResponseProps>(DEFAULT_RESPONSE);

    useEffect(() => {
        return () => {
            isCurrent.current = false;
        };
    }, []);

    const runQuery = useCallback(async () => {
        setResponses(() => ({ ...responses, loading: true }));
        return await getClient()
            .get(`${BASE_URL}/${_endpoint}`, {
                headers: {
                    ...HEADERS,
                    //TODO: Modify authorization header here
                },
            })
            .then(res => {
                setResponses((prev: ResponseProps) => ({
                    ...prev,
                    response: res,
                    loading: false,
                }));
            })
            .catch(err =>
                setResponses((prev: ResponseProps) => ({
                    ...prev,
                    error: err?.response?.data?.data,
                    loading: false,
                }))
            );
    }, []);

    useEffect(() => {
        runQuery();
    }, [runQuery]);

    return { ...responses, refetch: runQuery };
};

export default useQuery;
