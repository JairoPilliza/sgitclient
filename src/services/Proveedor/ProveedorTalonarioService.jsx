import methods from "../Service";
import useHttpParamsJsonCreate from "hooks/useHttpParamsJsonCreate";
const useParamsJson = (param) => { return useHttpParamsJsonCreate(param); }
const ProveedorTalonario = {
    async Get(qs) { return await methods.Get("ProveedorTalonario/Get" + useParamsJson(qs) ); },
    async Post(data) { return await methods.Post("ProveedorTalonario/Post", data) },
    async Put(qs, data) { return await methods.Put("ProveedorTalonario/Put" + useParamsJson(qs), data) },
    async Delete(qs) { return await methods.Delete("ProveedorTalonario/Delete" + useParamsJson(qs)) }
};

export default ProveedorTalonario;