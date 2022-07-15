const useHttpParamsJsonCreate = (param) => {
    const parametro = JSON.stringify(param);
    return `?json=${parametro}`;
}
export default useHttpParamsJsonCreate;
