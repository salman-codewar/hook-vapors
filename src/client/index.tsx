import axios, { AxiosInstance } from "axios";

var Singleton = (function () {
    var axiosInstance: AxiosInstance | null = null;

    return {
        getInstance: function () {
            if (!axiosInstance) {
                axiosInstance = axios.create();
            }
            return axiosInstance;
        },
    };
})();

const getClient = () => {
    return Singleton.getInstance();
};

export default getClient;
