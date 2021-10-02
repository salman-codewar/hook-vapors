const SESSION_KEY = "HOOK_VAPORS_SESSION";
const ACCESS_TOKEN_KEY = "HOOK_VAPORS_TOKEN";
const sessionHook = () => {
    const isSession = () => {
        const data =
            typeof window !== "undefined"
                ? localStorage.getItem(SESSION_KEY)
                : null;
        return data ? true : false;
    };

    const getSession = () => {
        const data =
            typeof window !== "undefined"
                ? localStorage.getItem(SESSION_KEY)
                : null;
        return data ? JSON.parse(data) : null;
    };

    const setSession = (session: any) => {
        typeof window !== "undefined" &&
            session &&
            localStorage.setItem(SESSION_KEY, JSON.stringify(session));
        return session;
    };

    const deleteSession = () => {
        typeof window !== "undefined" && localStorage.removeItem(SESSION_KEY);
        return;
    };

    const getToken = () => {
        const data =
            typeof window !== "undefined"
                ? localStorage.getItem(ACCESS_TOKEN_KEY)
                : null;
        return data ? data : null;
    };

    const setToken = (token: string) => {
        typeof window !== "undefined" &&
            token &&
            localStorage.setItem(ACCESS_TOKEN_KEY, token);
        return token;
    };

    const deleteToken = () => {
        typeof window !== "undefined" &&
            localStorage.removeItem(ACCESS_TOKEN_KEY);
        return;
    };

    return {
        getToken,
        setToken,
        isSession,
        getSession,
        setSession,
        deleteToken,
        deleteSession,
    };
};

export default sessionHook;
