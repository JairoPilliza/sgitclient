import { useLocation } from "react-router";

const useNavigateParamsSearch = () => {
    const { search } = useLocation();
    return JSON.parse('{"' + decodeURI(search.substring(1)).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
};

export default useNavigateParamsSearch;