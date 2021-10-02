import React, { useEffect, useState } from "react";
import {
    useDebounce,
    useLazyQuery,
    useMutation,
    useQuery,
    useSession,
} from "./customHooks";
import { DEBOUNCE_TIMEOUT, POST_BASE_URL } from "./constants";

const QUERY_ENDPOINT = `10/math`;
const LOADING = () => <p style={{ margin: "0px" }}>Loading...</p>;

const App = () => {
    const { setToken } = useSession();
    const [search, setSearch] = useState("");
    const debounceRes = useDebounce(search, DEBOUNCE_TIMEOUT);
    const [lazyInput, setLazyInput] = useState("");
    const [mutationInput, setMutationInput] = useState({
        name: "",
        email: "",
        gender: "Male",
        status: "active",
    });
    const { response: queryRes, loading: queryLoading } =
        useQuery(QUERY_ENDPOINT);

    const [
        lazyQueryCall,
        { response: lazyQueryRes, loading: lazyQueryLoading },
    ] = useLazyQuery();

    const [
        mutationCall,
        {
            response: mutationRes,
            loading: mutationLoading,
            error: mutationError,
        },
    ] = useMutation();

    useEffect(() => {
        setToken(process.env.REACT_APP_TOKEN || "");
    }, []);

    const onLazySubmit = () => {
        lazyQueryCall({ endpoint: `${lazyInput}/math` });
    };

    const onMutationSubmit = () => {
        mutationCall({ endpoint: `${POST_BASE_URL}`, body: mutationInput });
    };

    return (
        <div>
            <h2>Hook Vapors</h2>
            {/* Use Query Form*/}
            <div
                style={{
                    display: "flex",
                    margin: "8px 18px",
                    flexDirection: "column",
                }}
            >
                <h3 style={{ margin: "8px 0px", textAlign: "start" }}>
                    UseQuery Hook
                </h3>
                <div style={{ display: "flex", flexDirection: "row" }}>
                    <h4 style={{ margin: "0px 18px" }}>Response:</h4>
                    {queryLoading ? <LOADING /> : queryRes?.data || ""}
                </div>
            </div>
            {/* Use Lazy Query Form*/}
            <div
                style={{
                    display: "flex",
                    margin: "8px 18px",
                    flexDirection: "column",
                }}
            >
                <h3 style={{ margin: "8px 0px", textAlign: "start" }}>
                    UseLazyQuery Hook
                </h3>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "0px 18px",
                    }}
                >
                    <input
                        value={lazyInput}
                        onChange={e => setLazyInput(e.target.value)}
                    />
                    <button
                        style={{ margin: "0px 8px" }}
                        onClick={onLazySubmit}
                    >
                        Submit
                    </button>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "8px 18px",
                    }}
                >
                    <h4 style={{ margin: "0px 8px 0px 0px" }}>Response:</h4>

                    {lazyQueryLoading ? (
                        <LOADING />
                    ) : (
                        lazyQueryRes?.data?.text || ""
                    )}
                </div>
            </div>
            {/* Use Mutation Form*/}
            <div
                style={{
                    display: "flex",
                    margin: "8px 18px",
                    flexDirection: "column",
                }}
            >
                <h3 style={{ margin: "8px 0px", textAlign: "start" }}>
                    UseMutation Hook
                </h3>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "0px 18px",
                    }}
                >
                    <input
                        placeholder={"Name"}
                        value={mutationInput.name}
                        onChange={e =>
                            setMutationInput({
                                ...mutationInput,
                                name: e.target.value,
                            })
                        }
                    />
                    <input
                        placeholder={"Email"}
                        value={mutationInput.email}
                        style={{ margin: "0px 8px" }}
                        onChange={e =>
                            setMutationInput({
                                ...mutationInput,
                                email: e.target.value,
                            })
                        }
                    />
                    <button
                        style={{ margin: "0px 8px" }}
                        onClick={onMutationSubmit}
                    >
                        Submit
                    </button>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "8px 18px",
                    }}
                >
                    <h4 style={{ margin: "0px 8px 0px 0px" }}>Response:</h4>
                    <>
                        {mutationLoading ? (
                            <LOADING />
                        ) : mutationRes ? (
                            <p style={{ margin: "0px" }}>
                                <b>{mutationRes?.data?.data?.name}</b>user
                                created successfuully
                            </p>
                        ) : mutationError && mutationError.length > 0 ? (
                            <p
                                style={{ margin: "0px" }}
                            >{`${mutationError[0].field} ${mutationError[0].message}`}</p>
                        ) : (
                            ""
                        )}
                    </>
                </div>
            </div>
            {/*Use Debounce Form */}{" "}
            <div
                style={{
                    display: "flex",
                    margin: "8px 18px",
                    flexDirection: "column",
                }}
            >
                <h3 style={{ margin: "8px 0px", textAlign: "start" }}>
                    UseDebounce Hook
                </h3>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "0px 18px",
                    }}
                >
                    <input
                        placeholder={"Search"}
                        value={search}
                        onChange={e => {
                            setSearch(e.target.value);
                            // const value = useDebounce(e.target.value, 5000);
                            // console.log(value);
                        }}
                    />
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        margin: "8px 18px",
                    }}
                >
                    <h4 style={{ margin: "0px 8px 0px 0px" }}>Search for:</h4>
                    <p style={{ margin: "0px" }}>{debounceRes}</p>
                </div>
            </div>
        </div>
    );
};

export default App;
