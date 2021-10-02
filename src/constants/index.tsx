const BASE_URL = process.env.REACT_APP_GET_URL || "";
const POST_BASE_URL = process.env.REACT_APP_POST_URL || "";

const HEADERS = {
    accept: "application/json",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
    "X-Requested-With": "XMLHttpRequest",
};

const DEFAULT_RESPONSE = {
    error: null,
    loading: false,
    response: null,
};

const DEBOUNCE_TIMEOUT = 2000;

export { BASE_URL, HEADERS, DEFAULT_RESPONSE, POST_BASE_URL, DEBOUNCE_TIMEOUT };
