import { useLocation } from "react-router";

const useNavigateParamsSearch = () => {
    const { search } = useLocation();
    if (!!!search) {
        return undefined;
    }
    return JSON.parse('{"' + decodeURI(search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
};

export default useNavigateParamsSearch;