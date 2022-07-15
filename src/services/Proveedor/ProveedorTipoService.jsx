import methods from "../Service";
import useHttpParamsJsonCreate from "hooks/useHttpParamsJsonCreate";
const useParamsJson = (param) => { return useHttpParamsJsonCreate(param); }
const ProveedorTipo = {

    async Get() {  return await methods.Get("ProveedorTipo/Get" ); },
    async Post(data) { return await methods.Post("ProveedorTipo/Post", data) },
    async Put(qs, data) { return await methods.Put("ProveedorTipo/Put" + useParamsJson(qs), data) },
    async Delete(qs) { return await methods.Delete("ProveedorTipo/Delete" + useParamsJson(qs)) }
};

export default ProveedorTipo;