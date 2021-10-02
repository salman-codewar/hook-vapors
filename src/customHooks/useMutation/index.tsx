import getClient from "../../client";
import { useEffect, useRef, useState } from "react";
import { CallProps, ResponseProps } from "../types";
import { DEFAULT_RESPONSE, HEADERS } from "../../constants";
import { useSession } from "..";

const useMutation = (): [Function, ResponseProps] => {
    const isCurrent = useRef(true);
    const { getToken } = useSession();
    const [responses, setResponses] = useState<ResponseProps>(DEFAULT_RESPONSE);

    useEffect(() => {
        return () => {
            isCurrent.current = false;
        };
    }, []);

    const apiCall = async ({ endpoint, params = {}, body = {} }: CallProps) => {
        setResponses(() => ({ ...responses, loading: true }));
        return await getClient()
            .post(`${endpoint}`, body, {
                params: params,
                headers: {
                    ...HEADERS,
                    authorization: `Bearer ${getToken()}`,
                },
            })
            .then(res => {
                setResponses((prev: ResponseProps) => ({
                    ...prev,
                    response: res,
                    loading: false,
                }));
            })
            .catch(err => {
                setResponses((prev: ResponseProps) => ({
                    ...prev,
                    error: err?.response?.data?.data,
                    loading: false,
                }));
            });
    };

    return [apiCall, responses];
};

export default useMutation;
