import { QueryClient } from "react-query";
const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      retry: false,
    },
    queries: {
      retry: false,
    },
  },
});

//CHAGE THIS TO YOUR OWN API
const AXIOS_URL =
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_AXIOS_BASE_URL
    : "http://localhost:5000/api/";
export { AXIOS_URL, queryClient };
