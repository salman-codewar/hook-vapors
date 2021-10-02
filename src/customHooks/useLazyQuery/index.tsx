import { useEffect, useRef, useState } from "react";
import getClient from "../../client";
import { BASE_URL, DEFAULT_RESPONSE, HEADERS } from "../../constants";
import { CallProps, ResponseProps } from "../types";

const useLazyQuery = (): [Function, ResponseProps] => {
    const isCurrent = useRef(true);
    const [responses, setResponses] = useState<ResponseProps>(DEFAULT_RESPONSE);

    useEffect(() => {
        return () => {
            isCurrent.current = false;
        };
    }, []);

    const apiCall = async ({ endpoint, params = {}, body = {} }: CallProps) => {
        setResponses(() => ({ ...responses, loading: true }));
        return await getClient()
            .get(`${BASE_URL}/${endpoint}`, {
                data: body,
                params: params,
                headers: {
                    ...HEADERS,
                    //TODO: Modify authorization header here
                },
            })
            .then(res =>
                setResponses((prev: ResponseProps) => ({
                    ...prev,
                    response: res,
                    loading: false,
                }))
            )
            .catch(err =>
                setResponses((prev: ResponseProps) => ({
                    ...prev,
                    error: err?.response?.data?.data,
                    loading: false,
                }))
            );
    };

    return [apiCall, responses];
};

export default useLazyQuery;
