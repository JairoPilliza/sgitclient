
const { useNavigate, createSearchParams } = require("react-router-dom");

const useNavigateParamsCreate = () => {
    const {search }  = useLocation();
    return (pathname, params) =>
        navigate({ pathname, search: `?${createSearchParams(params)}` });
};

export default useNavigateParamsCreate;