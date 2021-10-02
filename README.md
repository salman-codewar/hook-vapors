# Hook Vapors 🪝💧

This repository contain the most used custom hooks.
## Axios Client
Repo  includes Axios client based on Singleton Pattern.
Check: `src/client.index.tsx` 
## Hooks
 - useQuery
 - useLazyQuery
 - useMutationQuery
 - useDebounce
 - useSession
 - useWindowSize
## Examples
**useQuery**

    const { response, loading, error, refetch } = useQuery(QUERY_ENDPOINT);

**useLazyQuery**

    const [trigger, { response, loading, error }] = useLazyQuery();
Trigger call:

    trigger({ endpoint:  QUERY_ENDPOINT, params: PARAMS_OBJECT, body: BODY_OBJECT });

Required args: `endpoint`
Optional args: `params, body`

**useMutation**

    const [trigger, {response, loading, error}] = useMutation();
    
 Trigger call:

    trigger({ endpoint:  MUTATION_ENDPOINT, params: PARAMS_OBJECT, body: BODY_OBJECT });

Required args: `endpoint`
Optional args: `params, body`

**useSession**

    const { setToken, getToken } = useSession();
Available methods: 
 - getToken
 - setToken
 - deleteToken
 - getSession
 - setSession
 - isSession
 - deleteSession
 
**useWindowSize**

    const { width, height } = useWindowSize();

**useDebounce**

    const  debounceVal = useDebounce(searchValue, DEBOUNCE_TIMEOUT);

## Try Repository
Clone: `https://github.com/trimulabs/rescue-hooks.git`
After cloning run below command:

    yarn && yarn start
