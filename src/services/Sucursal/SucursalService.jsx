import methods from "../Service";
import useHttpParamsJsonCreate from "hooks/useHttpParamsJsonCreate";
const useParamsJson = (param) => { return useHttpParamsJsonCreate(param); }
const Sucursal = {
    async Get() { return await methods.Get("Sucursal/Get" ); },
    async Post(data) { return await methods.Post("Sucursal/Post", data) },
    async Put(qs, data) { return await methods.Put("Sucursal/Put" + useParamsJson(qs), data) },
    async Delete(qs) { return await methods.Delete("Sucursal/Delete" + useParamsJson(qs)) }
};

export default Sucursal;