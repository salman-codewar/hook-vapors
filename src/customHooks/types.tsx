import { AxiosResponse } from "axios";

export type ResponseProps = {
    loading: boolean;
    error: any | null;
    response: AxiosResponse<any> | void | null;
};

export type CallProps = {
    body?: Object;
    params?: Object;
    endpoint: string;
};

export type Size = {
    width: number | undefined;
    height: number | undefined;
};
